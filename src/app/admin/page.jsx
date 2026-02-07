"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FolderIcon from "@mui/icons-material/Folder";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ImageIcon from "@mui/icons-material/Image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";

// --- Yardimci fonksiyonlar ---

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createEmptyProject = () => ({
  id: createId(),
  title: "",
  location: "",
  year: "",
  type: "",
  parcelArea: "",
  buildingArea: "",
  images: [],
  isCompleted: false,
});

const normalizeProjects = (projects) =>
  (Array.isArray(projects) ? projects : []).map((project) => ({
    ...createEmptyProject(),
    ...project,
    id: project.id || createId(),
    images: Array.isArray(project.images) ? project.images : [],
    isCompleted: Boolean(project.isCompleted),
  }));

// --- Font secenekleri ---

const FONT_OPTIONS = [
  { key: "playfair", label: "Playfair Display", css: "var(--font-playfair), 'Playfair Display', serif" },
  { key: "cormorant", label: "Cormorant Garamond", css: "var(--font-cormorant), 'Cormorant Garamond', serif" },
  { key: "lora", label: "Lora", css: "var(--font-lora), 'Lora', serif" },
  { key: "merriweather", label: "Merriweather", css: "var(--font-merriweather), 'Merriweather', serif" },
  { key: "roboto", label: "Roboto (Sans-serif)", css: "var(--font-body), 'Roboto', sans-serif" },
];

// --- Stil sabitleri ---

const fieldSx = {
  marginBottom: 2,
  "& .MuiInputBase-input": { color: "#111" },
  "& .MuiInputLabel-root": { color: "#666" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
  "& .MuiInputLabel-root.Mui-focused": { color: "var(--color-primary-dark)" },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--color-primary-dark)" },
};

const sectionPaperSx = {
  padding: { xs: 2, sm: 3 },
  borderRadius: 2,
  border: "1px solid #eee",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

// --- Ana Bileşen ---

const AdminPage = () => {
  const router = useRouter();

  // Mevcut state
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Yeni UX state
  const [activeTab, setActiveTab] = useState(0);
  const [expandedProject, setExpandedProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // --- Auth: Token dogrulama ---
  useEffect(() => {
    const token = window.localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    fetch("/api/auth", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          setIsAuthorized(true);
        } else {
          window.localStorage.removeItem("admin_token");
          router.replace("/admin/login");
        }
      })
      .catch(() => {
        window.localStorage.removeItem("admin_token");
        router.replace("/admin/login");
      });
  }, [router]);

  // --- Icerik yukle ---
  useEffect(() => {
    if (!isAuthorized) return;
    let isMounted = true;

    const loadContent = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        if (!isMounted) return;

        setContent({
          settings: {
            headingFont: data?.settings?.headingFont || "playfair",
          },
          home: {
            heroImage: data?.home?.heroImage || "",
            title: data?.home?.title || "",
            description: data?.home?.description || "",
          },
          about: {
            title: data?.about?.title || "",
            description: data?.about?.description || "",
            image: data?.about?.image || "",
          },
          projects: normalizeProjects(data?.projects),
        });
      } catch {
        if (isMounted) {
          showSnackbar("İçerik yüklenemedi.", "error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadContent();
    return () => { isMounted = false; };
  }, [isAuthorized]);

  const hasContent = useMemo(() => Boolean(content), [content]);

  // --- Snackbar ---
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // --- Update fonksiyonlari ---
  const updateSettingsField = (field, value) => {
    setContent((prev) => ({ ...prev, settings: { ...prev.settings, [field]: value } }));
  };

  const updateHomeField = (field, value) => {
    setContent((prev) => ({ ...prev, home: { ...prev.home, [field]: value } }));
  };

  const updateAboutField = (field, value) => {
    setContent((prev) => ({ ...prev, about: { ...prev.about, [field]: value } }));
  };

  const updateProjectField = (listKey, index, field, value) => {
    setContent((prev) => {
      const list = [...prev[listKey]];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [listKey]: list };
    });
  };

  const updateProjectImages = (listKey, index, value) => {
    const images = value.split("\n").map((item) => item.trim()).filter(Boolean);
    updateProjectField(listKey, index, "images", images);
  };

  const addProject = (listKey) => {
    setContent((prev) => ({
      ...prev,
      [listKey]: [...prev[listKey], createEmptyProject()],
    }));
    // Yeni eklenen projeyi ac
    setTimeout(() => {
      setExpandedProject(content?.projects?.length || 0);
    }, 100);
  };

  const removeProject = (listKey, index) => {
    setContent((prev) => ({
      ...prev,
      [listKey]: prev[listKey].filter((_, i) => i !== index),
    }));
    setExpandedProject(null);
  };

  const removeProjectImage = (projectIndex, imageIndex) => {
    setContent((prev) => {
      const projects = [...prev.projects];
      const images = [...projects[projectIndex].images];
      images.splice(imageIndex, 1);
      projects[projectIndex] = { ...projects[projectIndex], images };
      return { ...prev, projects };
    });
  };

  // Gorsel sirasini degistir (sola/saga tasi)
  const moveProjectImage = (projectIndex, fromIdx, toIdx) => {
    setContent((prev) => {
      const projects = [...prev.projects];
      const images = [...projects[projectIndex].images];
      if (toIdx < 0 || toIdx >= images.length) return prev;
      const [moved] = images.splice(fromIdx, 1);
      images.splice(toIdx, 0, moved);
      projects[projectIndex] = { ...projects[projectIndex], images };
      return { ...prev, projects };
    });
  };

  // Gorseli kapak fotografi yap (ilk siraya tasi)
  const setCoverImage = (projectIndex, imageIndex) => {
    if (imageIndex === 0) return; // zaten kapak
    moveProjectImage(projectIndex, imageIndex, 0);
  };

  // --- Yardimci: Auth header ---
  const getAuthHeaders = () => {
    const token = window.localStorage.getItem("admin_token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // --- Kaydet ---
  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);

    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(content),
      });

      if (response.status === 401) {
        showSnackbar("Oturum süresi doldu. Tekrar giriş yapın.", "error");
        window.localStorage.removeItem("admin_token");
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) throw new Error("Save failed");
      showSnackbar("Değişiklikler başarıyla kaydedildi.");
    } catch {
      showSnackbar("Kaydetme sırasında hata oluştu.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // --- Gorsel yukle ---
  const uploadImage = async (file) => {
    if (!file) return null;
    setIsUploading(true);

    try {
      const token = window.localStorage.getItem("admin_token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (response.status === 401) {
        showSnackbar("Oturum süresi doldu. Tekrar giriş yapın.", "error");
        window.localStorage.removeItem("admin_token");
        router.replace("/admin/login");
        return null;
      }

      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      return data?.url || null;
    } catch {
      showSnackbar("Görsel yüklenemedi.", "error");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleHeroUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    const url = await uploadImage(file);
    if (url) updateHomeField("heroImage", url);
  };

  const handleAboutUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    const url = await uploadImage(file);
    if (url) updateAboutField("image", url);
  };

  const handleProjectUpload = async (listKey, index, event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;

    const uploadedUrls = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) uploadedUrls.push(url);
    }

    if (uploadedUrls.length) {
      const images = [...content[listKey][index].images, ...uploadedUrls];
      updateProjectField(listKey, index, "images", images);
    }
  };

  // --- Silme onay ---
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "project") {
      removeProject("projects", deleteTarget.projectIndex);
      showSnackbar("Proje silindi.");
    } else if (deleteTarget.type === "image") {
      removeProjectImage(deleteTarget.projectIndex, deleteTarget.imageIndex);
      showSnackbar("Görsel silindi.");
    }

    setDeleteTarget(null);
  };

  // --- Filtreleme ---
  const filteredProjects = useMemo(() => {
    if (!content?.projects) return [];
    const term = searchTerm.trim().toLowerCase();
    return content.projects.filter((project) => {
      const matchesTerm = term
        ? `${project.title} ${project.location} ${project.year} ${project.type}`.toLowerCase().includes(term)
        : true;
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "completed"
            ? project.isCompleted
            : !project.isCompleted;
      return matchesTerm && matchesStatus;
    });
  }, [content?.projects, searchTerm, statusFilter]);

  // ============================================================
  //  TAB RENDER FONKSIYONLARI
  // ============================================================

  // --- Site Ayarlari ---
  const renderSettingsTab = () => (
    <Paper sx={sectionPaperSx}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
        Başlık Fontu
      </Typography>
      <Select
        value={content.settings?.headingFont || "playfair"}
        onChange={(e) => updateSettingsField("headingFont", e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
        renderValue={(selected) => {
          const font = FONT_OPTIONS.find((f) => f.key === selected);
          return (
            <span style={{ fontFamily: font?.css }}>{font?.label || selected}</span>
          );
        }}
      >
        {FONT_OPTIONS.map((font) => (
          <MenuItem key={font.key} value={font.key}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography sx={{ fontFamily: font.css, fontSize: "1rem", fontWeight: 600 }}>
                {font.label}
              </Typography>
              <Typography sx={{ fontFamily: font.css, fontSize: "0.85rem", color: "#888" }}>
                Tasarım Mimarlık - Örnek Başlık
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>

      <Box
        sx={{
          border: "1px solid #e8e8e8",
          borderRadius: 2,
          p: 3,
          backgroundColor: "#fafafa",
        }}
      >
        <Typography sx={{ fontSize: "0.75rem", color: "#999", mb: 1, textTransform: "uppercase", letterSpacing: 1 }}>
          Önizleme
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: `${FONT_OPTIONS.find((f) => f.key === (content.settings?.headingFont || "playfair"))?.css} !important`,
            fontWeight: 600,
            mb: 0.5,
            color: "#222",
          }}
        >
          TASARIM MİMARLIK
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: `${FONT_OPTIONS.find((f) => f.key === (content.settings?.headingFont || "playfair"))?.css} !important`,
            fontWeight: 500,
            color: "#666",
          }}
        >
          Projelerimiz - Hakkımızda - İletişim
        </Typography>
      </Box>
    </Paper>
  );

  // --- Anasayfa ---
  const renderHomeTab = () => (
    <Paper sx={sectionPaperSx}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
          Kapak Görseli
        </Typography>
        <TextField
          fullWidth
          label="Görsel URL"
          value={content.home.heroImage}
          onChange={(e) => updateHomeField("heroImage", e.target.value)}
          sx={fieldSx}
          size="small"
        />
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{
            mb: 2,
            borderColor: "var(--color-primary-dark)",
            color: "var(--color-primary-dark)",
            "&:hover": { borderColor: "var(--color-dark)", color: "var(--color-dark)" },
          }}
        >
          Görsel Yükle
          <input type="file" hidden accept="image/*" onChange={handleHeroUpload} />
        </Button>
        {content.home.heroImage ? (
          <Box sx={{ mt: 1 }}>
            <Box
              component="img"
              src={content.home.heroImage}
              alt="Kapak görseli"
              sx={{
                width: "100%",
                maxWidth: 400,
                height: 200,
                objectFit: "cover",
                borderRadius: 2,
                border: "1px solid #eee",
              }}
            />
          </Box>
        ) : null}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
          İçerik
        </Typography>
        <TextField
          fullWidth
          label="Başlık"
          value={content.home.title}
          onChange={(e) => updateHomeField("title", e.target.value)}
          sx={fieldSx}
          size="small"
        />
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Açıklama"
          value={content.home.description}
          onChange={(e) => updateHomeField("description", e.target.value)}
          sx={fieldSx}
          size="small"
        />
      </Box>
    </Paper>
  );

  // --- Hakkimizda ---
  const renderAboutTab = () => (
    <Paper sx={sectionPaperSx}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
        İçerik
      </Typography>
      <TextField
        fullWidth
        label="Başlık"
        value={content.about.title}
        onChange={(e) => updateAboutField("title", e.target.value)}
        sx={fieldSx}
        size="small"
      />
      <TextField
        fullWidth
        multiline
        minRows={4}
        label="Açıklama"
        value={content.about.description}
        onChange={(e) => updateAboutField("description", e.target.value)}
        sx={fieldSx}
        size="small"
      />

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
          Görsel
        </Typography>
        <TextField
          fullWidth
          label="Görsel URL"
          value={content.about.image}
          onChange={(e) => updateAboutField("image", e.target.value)}
          sx={fieldSx}
          size="small"
        />
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{
            mb: 2,
            borderColor: "var(--color-primary-dark)",
            color: "var(--color-primary-dark)",
            "&:hover": { borderColor: "var(--color-dark)", color: "var(--color-dark)" },
          }}
        >
          Görsel Yükle
          <input type="file" hidden accept="image/*" onChange={handleAboutUpload} />
        </Button>
        {content.about.image ? (
          <Box sx={{ mt: 1 }}>
            <Box
              component="img"
              src={content.about.image}
              alt="Hakkımızda görseli"
              sx={{
                width: "100%",
                maxWidth: 400,
                height: 200,
                objectFit: "cover",
                borderRadius: 2,
                border: "1px solid #eee",
              }}
            />
          </Box>
        ) : null}
      </Box>
    </Paper>
  );

  // --- Projeler ---
  const renderProjectsTab = () => (
    <Box>
      {/* Arama ve filtre */}
      <Paper sx={{ ...sectionPaperSx, mb: 2, display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
        <TextField
          label="Proje ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ ...fieldSx, minWidth: 220, mb: 0, flex: 1 }}
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ color: "#aaa", mr: 1, fontSize: 20 }} />,
            },
          }}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="all">Tümü ({content.projects.length})</MenuItem>
          <MenuItem value="active">Devam Eden ({content.projects.filter((p) => !p.isCompleted).length})</MenuItem>
          <MenuItem value="completed">Tamamlanan ({content.projects.filter((p) => p.isCompleted).length})</MenuItem>
        </Select>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => addProject("projects")}
          sx={{
            borderColor: "var(--color-primary-dark)",
            color: "var(--color-primary-dark)",
            "&:hover": { borderColor: "var(--color-dark)", color: "var(--color-dark)" },
          }}
        >
          Yeni Proje
        </Button>
      </Paper>

      {/* Proje listesi - Accordion */}
      {filteredProjects.length === 0 ? (
        <Paper sx={{ ...sectionPaperSx, textAlign: "center", py: 6, color: "#999" }}>
          <FolderIcon sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
          <Typography>Proje bulunamadı.</Typography>
        </Paper>
      ) : (
        filteredProjects.map((project, index) => {
          // Gercek index'i bul (filtreleme sonrasi)
          const realIndex = content.projects.findIndex((p) => p.id === project.id);

          return (
            <Accordion
              key={project.id}
              expanded={expandedProject === realIndex}
              onChange={(_, isExpanded) => setExpandedProject(isExpanded ? realIndex : null)}
              sx={{
                mb: 1.5,
                borderRadius: "8px !important",
                border: "1px solid #eee",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                "&:before": { display: "none" },
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: { xs: 2, sm: 3 },
                  "&:hover": { backgroundColor: "#fafafa" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%", overflow: "hidden" }}>
                  {/* Thumbnail */}
                  {project.images?.[0] ? (
                    <Box
                      component="img"
                      src={project.images[0]}
                      alt={project.title}
                      sx={{
                        width: 56,
                        height: 42,
                        objectFit: "cover",
                        borderRadius: 1,
                        border: "1px solid #eee",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 56,
                        height: 42,
                        borderRadius: 1,
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ImageIcon sx={{ fontSize: 20, color: "#ccc" }} />
                    </Box>
                  )}

                  {/* Baslik + konum */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: "#222", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {project.title || "Başlıksız Proje"}
                    </Typography>
                    <Typography sx={{ fontSize: "0.8rem", color: "#999" }}>
                      {project.location || "Konum belirtilmemiş"}
                    </Typography>
                  </Box>

                  {/* Durum badge */}
                  <Chip
                    icon={project.isCompleted ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : undefined}
                    label={project.isCompleted ? "Tamamlandı" : "Devam Ediyor"}
                    size="small"
                    sx={{
                      flexShrink: 0,
                      backgroundColor: project.isCompleted ? "rgba(46, 125, 50, 0.08)" : "rgba(237, 108, 2, 0.08)",
                      color: project.isCompleted ? "#2e7d32" : "#ed6c02",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      "& .MuiChip-icon": { color: "inherit" },
                    }}
                  />

                  {/* Gorsel sayisi */}
                  <Chip
                    icon={<ImageIcon sx={{ fontSize: 14 }} />}
                    label={project.images?.length || 0}
                    size="small"
                    variant="outlined"
                    sx={{ flexShrink: 0, fontSize: "0.75rem" }}
                  />
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ px: { xs: 2, sm: 3 }, pt: 1, pb: 3, backgroundColor: "#fafafa" }}>
                {/* Form alanlari - 2 sutunlu grid */}
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth label="Başlık" value={project.title} size="small"
                    onChange={(e) => updateProjectField("projects", realIndex, "title", e.target.value)}
                    sx={fieldSx}
                  />
                  <TextField
                    fullWidth label="Konum" value={project.location} size="small"
                    onChange={(e) => updateProjectField("projects", realIndex, "location", e.target.value)}
                    sx={fieldSx}
                  />
                  <TextField
                    fullWidth label="Tarih" value={project.year} size="small"
                    onChange={(e) => updateProjectField("projects", realIndex, "year", e.target.value)}
                    sx={fieldSx}
                  />
                  <TextField
                    fullWidth label="Yapı Türü" value={project.type} size="small"
                    onChange={(e) => updateProjectField("projects", realIndex, "type", e.target.value)}
                    sx={fieldSx}
                  />
                  <TextField
                    fullWidth label="Parsel Alanı" value={project.parcelArea} size="small"
                    onChange={(e) => updateProjectField("projects", realIndex, "parcelArea", e.target.value)}
                    sx={fieldSx}
                  />
                  <TextField
                    fullWidth label="Yapı Alanı" value={project.buildingArea} size="small"
                    onChange={(e) => updateProjectField("projects", realIndex, "buildingArea", e.target.value)}
                    sx={fieldSx}
                  />
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={project.isCompleted}
                      onChange={(e) => updateProjectField("projects", realIndex, "isCompleted", e.target.checked)}
                      sx={{ "&.Mui-checked": { color: "var(--color-primary-dark)" } }}
                    />
                  }
                  label="Tamamlandı mı?"
                  sx={{ mb: 2 }}
                />

                {/* Gorseller */}
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.9rem", color: "#333" }}>
                      Görseller ({project.images.length})
                    </Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        borderColor: "var(--color-primary-dark)",
                        color: "var(--color-primary-dark)",
                        "&:hover": { borderColor: "var(--color-dark)", color: "var(--color-dark)" },
                      }}
                    >
                      Görsel Yükle
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        multiple
                        onChange={(e) => handleProjectUpload("projects", realIndex, e)}
                      />
                    </Button>
                  </Box>

                  {project.images.length > 0 ? (
                    <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                      {project.images.map((image, imgIdx) => {
                        const isCover = imgIdx === 0;
                        const isFirst = imgIdx === 0;
                        const isLast = imgIdx === project.images.length - 1;

                        return (
                          <Box
                            key={`${project.id}-img-${imgIdx}`}
                            sx={{
                              position: "relative",
                              width: 140,
                              borderRadius: 1.5,
                              overflow: "hidden",
                              border: isCover ? "2px solid var(--color-primary-dark)" : "1px solid #eee",
                              "&:hover .img-overlay": { opacity: 1 },
                            }}
                          >
                            {/* Kapak rozeti */}
                            {isCover && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  zIndex: 3,
                                  backgroundColor: "var(--color-primary-dark)",
                                  color: "#fff",
                                  px: 0.8,
                                  py: 0.2,
                                  borderBottomRightRadius: 6,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.3,
                                }}
                              >
                                <StarIcon sx={{ fontSize: 12 }} />
                                <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, lineHeight: 1 }}>KAPAK</Typography>
                              </Box>
                            )}

                            {/* Gorsel */}
                            <Box
                              component="img"
                              src={image}
                              alt={`${project.title || "Proje"} görsel ${imgIdx + 1}`}
                              sx={{
                                width: "100%",
                                height: 105,
                                objectFit: "cover",
                                display: "block",
                              }}
                            />

                            {/* Hover overlay - aksiyonlar */}
                            <Box
                              className="img-overlay"
                              sx={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.3) 100%)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                opacity: 0,
                                transition: "opacity 0.2s ease",
                                py: 0.5,
                              }}
                            >
                              {/* Ust: Sil butonu */}
                              <Box sx={{ alignSelf: "flex-end", pr: 0.5 }}>
                                <IconButton
                                  size="small"
                                  onClick={() => setDeleteTarget({ type: "image", projectIndex: realIndex, imageIndex: imgIdx })}
                                  sx={{
                                    backgroundColor: "rgba(255,255,255,0.9)",
                                    color: "#d32f2f",
                                    width: 26,
                                    height: 26,
                                    "&:hover": { backgroundColor: "#fff" },
                                  }}
                                >
                                  <CloseIcon sx={{ fontSize: 14 }} />
                                </IconButton>
                              </Box>

                              {/* Orta: Kapak yap butonu (kapak degilse) */}
                              {!isCover && (
                                <Button
                                  size="small"
                                  onClick={() => setCoverImage(realIndex, imgIdx)}
                                  startIcon={<StarIcon sx={{ fontSize: 14 }} />}
                                  sx={{
                                    color: "#fff",
                                    backgroundColor: "rgba(0,0,0,0.45)",
                                    fontSize: "0.65rem",
                                    textTransform: "none",
                                    px: 1,
                                    py: 0.2,
                                    minHeight: 0,
                                    borderRadius: 1,
                                    "&:hover": { backgroundColor: "rgba(0,0,0,0.65)" },
                                  }}
                                >
                                  Kapak Yap
                                </Button>
                              )}

                              {/* Alt: Sola/saga tasi */}
                              <Box sx={{ display: "flex", gap: 0.5 }}>
                                <IconButton
                                  size="small"
                                  disabled={isFirst}
                                  onClick={() => moveProjectImage(realIndex, imgIdx, imgIdx - 1)}
                                  sx={{
                                    backgroundColor: "rgba(255,255,255,0.85)",
                                    color: "#333",
                                    width: 26,
                                    height: 26,
                                    "&:hover": { backgroundColor: "#fff" },
                                    "&.Mui-disabled": { backgroundColor: "rgba(255,255,255,0.3)", color: "rgba(0,0,0,0.2)" },
                                  }}
                                >
                                  <ArrowBackIcon sx={{ fontSize: 14 }} />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  disabled={isLast}
                                  onClick={() => moveProjectImage(realIndex, imgIdx, imgIdx + 1)}
                                  sx={{
                                    backgroundColor: "rgba(255,255,255,0.85)",
                                    color: "#333",
                                    width: 26,
                                    height: 26,
                                    "&:hover": { backgroundColor: "#fff" },
                                    "&.Mui-disabled": { backgroundColor: "rgba(255,255,255,0.3)", color: "rgba(0,0,0,0.2)" },
                                  }}
                                >
                                  <ArrowForwardIcon sx={{ fontSize: 14 }} />
                                </IconButton>
                              </Box>
                            </Box>

                            {/* Sira numarasi */}
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 4,
                                right: 4,
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "#fff",
                                fontSize: "0.65rem",
                                fontWeight: 600,
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 1,
                              }}
                            >
                              {imgIdx + 1}
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: "center", py: 3, color: "#ccc", border: "2px dashed #eee", borderRadius: 2 }}>
                      <ImageIcon sx={{ fontSize: 32, mb: 0.5 }} />
                      <Typography sx={{ fontSize: "0.85rem" }}>Henüz görsel eklenmemiş</Typography>
                    </Box>
                  )}
                </Box>

                {/* URL ile gorsel ekleme */}
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  label="Görseller (satır satır URL)"
                  value={project.images.join("\n")}
                  onChange={(e) => updateProjectImages("projects", realIndex, e.target.value)}
                  sx={{ ...fieldSx, mt: 2 }}
                  size="small"
                />

                {/* Proje sil butonu */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => setDeleteTarget({ type: "project", projectIndex: realIndex })}
                  >
                    Projeyi Sil
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </Box>
  );

  // ============================================================
  //  YUKLEME / HATA / AUTH DURUMLARI
  // ============================================================

  if (!isAuthorized) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "var(--color-primary)" }} />
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "var(--color-primary)" }} />
      </Box>
    );
  }

  if (!hasContent) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <Typography sx={{ color: "#999" }}>İçerik bulunamadı.</Typography>
      </Box>
    );
  }

  // ============================================================
  //  ANA RENDER
  // ============================================================

  const TAB_ITEMS = [
    { label: "Ayarlar", icon: <SettingsIcon /> },
    { label: "Anasayfa", icon: <HomeIcon /> },
    { label: "Hakkımızda", icon: <InfoIcon /> },
    { label: "Projeler", icon: <FolderIcon /> },
  ];

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", pb: 10 }}>
      {/* Sticky Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backgroundColor: "var(--color-dark)",
          color: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: "0.03em", color: "#fff !important" }}>
              Admin Panel
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isUploading && (
                <Chip
                  icon={<CircularProgress size={14} sx={{ color: "#fff" }} />}
                  label="Yükleniyor..."
                  size="small"
                  sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
                />
              )}
              <Button
                variant="outlined"
                size="small"
                startIcon={<LogoutIcon />}
                onClick={() => {
                  window.localStorage.removeItem("admin_token");
                  router.replace("/admin/login");
                }}
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.3)",
                  "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.08)" },
                }}
              >
                Çıkış
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Tab Bar */}
      <Box
        sx={{
          position: "sticky",
          top: 56,
          zIndex: 1099,
          backgroundColor: "#fff",
          borderBottom: "1px solid #eee",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <Container maxWidth="lg">
          <Tabs
            value={activeTab}
            onChange={(_, newVal) => setActiveTab(newVal)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.9rem",
                minHeight: 52,
                color: "#888",
              },
              "& .Mui-selected": {
                color: "var(--color-dark) !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "var(--color-primary-dark)",
                height: 3,
              },
            }}
          >
            {TAB_ITEMS.map((tab, i) => (
              <Tab key={i} label={tab.label} icon={tab.icon} iconPosition="start" />
            ))}
          </Tabs>
        </Container>
      </Box>

      {/* Tab Icerigi */}
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {activeTab === 0 && renderSettingsTab()}
        {activeTab === 1 && renderHomeTab()}
        {activeTab === 2 && renderAboutTab()}
        {activeTab === 3 && renderProjectsTab()}
      </Container>

      {/* Sticky Kaydet Butonu */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backgroundColor: "#fff",
          borderTop: "1px solid #eee",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", py: 1.5, gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={isSaving ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : <SaveIcon />}
              onClick={handleSave}
              disabled={isSaving}
              sx={{
                backgroundColor: "var(--color-dark)",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                borderRadius: 1.5,
                "&:hover": { backgroundColor: "#333" },
                "&.Mui-disabled": { backgroundColor: "#ccc" },
              }}
            >
              {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Silme Onay Diyalogu */}
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 360 } }}
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
          {deleteTarget?.type === "project" ? "Projeyi Sil" : "Görseli Sil"}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#666" }}>
            {deleteTarget?.type === "project"
              ? "Bu projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
              : "Bu görseli silmek istediğinizden emin misiniz?"}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteTarget(null)} sx={{ color: "#888" }}>
            İptal
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Bildirimi */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 8 }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: 1.5 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;
