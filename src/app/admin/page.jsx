"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

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

const fieldSx = {
  marginBottom: 2,
  "& .MuiInputBase-input": { color: "#111" },
  "& .MuiInputLabel-root": { color: "#555" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#c7c7c7" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#111" },
};

const PreviewImage = ({ src, alt }) => (
  <Box
    component="img"
    src={src}
    alt={alt}
    sx={{
      width: 120,
      height: 90,
      objectFit: "cover",
      borderRadius: 1,
      border: "1px solid #e0e0e0",
      backgroundColor: "#f5f5f5",
    }}
  />
);

const AdminPage = () => {
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const isAuthed = typeof window !== "undefined"
      ? window.localStorage.getItem("admin_authed") === "true"
      : false;
    if (!isAuthed) {
      router.replace("/admin/login");
      return;
    }
    setIsAuthorized(true);
  }, [router]);

  useEffect(() => {
    if (!isAuthorized) return;
    let isMounted = true;

    const loadContent = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        if (!isMounted) return;

        setContent({
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
      } catch (error) {
        if (isMounted) {
          setErrorMessage("İçerik yüklenemedi.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, [isAuthorized]);

  const hasContent = useMemo(() => Boolean(content), [content]);

  const updateHomeField = (field, value) => {
    setContent((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        [field]: value,
      },
    }));
  };

  const updateAboutField = (field, value) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value,
      },
    }));
  };

  const updateProjectField = (listKey, index, field, value) => {
    setContent((prev) => {
      const list = [...prev[listKey]];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [listKey]: list };
    });
  };

  const updateProjectImages = (listKey, index, value) => {
    const images = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    updateProjectField(listKey, index, "images", images);
  };

  const addProject = (listKey) => {
    setContent((prev) => ({
      ...prev,
      [listKey]: [...prev[listKey], createEmptyProject()],
    }));
  };

  const removeProject = (listKey, index) => {
    setContent((prev) => ({
      ...prev,
      [listKey]: prev[listKey].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      setSuccessMessage("Değişiklikler kaydedildi.");
    } catch (error) {
      setErrorMessage("Kaydetme sırasında hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    setIsUploading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data?.url || null;
    } catch (error) {
      setErrorMessage("Görsel yüklenemedi.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleHeroUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    const url = await uploadImage(file);
    if (url) {
      updateHomeField("heroImage", url);
    }
  };

  const handleAboutUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    const url = await uploadImage(file);
    if (url) {
      updateAboutField("image", url);
    }
  };

  const handleProjectUpload = async (listKey, index, event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;

    const uploadedUrls = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) {
        uploadedUrls.push(url);
      }
    }

    if (uploadedUrls.length) {
      const images = [...content[listKey][index].images, ...uploadedUrls];
      updateProjectField(listKey, index, "images", images);
    }
  };

  const filteredProjects = useMemo(() => {
    if (!content?.projects) return [];
    const term = searchTerm.trim().toLowerCase();
    return content.projects.filter((project) => {
      const matchesTerm = term
        ? `${project.title} ${project.location} ${project.year} ${project.type}`
            .toLowerCase()
            .includes(term)
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

  if (!isAuthorized) {
    return (
      <Container
        maxWidth="lg"
        sx={{ paddingY: 6, backgroundColor: "#fff", color: "#111" }}
      >
        <Typography sx={{ fontFamily: "inherit" }}>
          Yönlendiriliyor...
        </Typography>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ paddingY: 6, backgroundColor: "#fff", color: "#111" }}
      >
        <Typography sx={{ fontFamily: "inherit" }}>
          Yükleniyor...
        </Typography>
      </Container>
    );
  }

  if (!hasContent) {
    return (
      <Container
        maxWidth="lg"
        sx={{ paddingY: 6, backgroundColor: "#fff", color: "#111" }}
      >
        <Typography sx={{ fontFamily: "inherit" }}>
          İçerik bulunamadı.
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ paddingY: 6, backgroundColor: "#fff", color: "#111" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ fontFamily: "inherit", marginBottom: 3 }}>
          Admin Panel
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            window.localStorage.removeItem("admin_authed");
            router.replace("/admin/login");
          }}
        >
          Çıkış
        </Button>
      </Box>

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
      {successMessage ? (
        <Alert severity="success">{successMessage}</Alert>
      ) : null}
      {isUploading ? (
        <Alert severity="info">Görsel yükleniyor...</Alert>
      ) : null}

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" sx={{ fontFamily: "inherit", marginBottom: 2 }}>
          Anasayfa
        </Typography>
        <TextField
          fullWidth
          label="Kapak Görseli (URL)"
          value={content.home.heroImage}
          onChange={(event) => updateHomeField("heroImage", event.target.value)}
          sx={fieldSx}
        />
        <Button variant="outlined" component="label" sx={{ marginBottom: 3 }}>
          Kapak Görseli Yükle
          <input type="file" hidden accept="image/*" onChange={handleHeroUpload} />
        </Button>
        {content.home.heroImage ? (
          <Box sx={{ marginBottom: 3 }}>
            <Typography sx={{ fontFamily: "inherit", marginBottom: 1 }}>
              Kapak Görseli Önizleme
            </Typography>
            <PreviewImage
              src={content.home.heroImage}
              alt="Kapak görseli önizleme"
            />
          </Box>
        ) : null}
        <TextField
          fullWidth
          label="Başlık"
          value={content.home.title}
          onChange={(event) => updateHomeField("title", event.target.value)}
          sx={fieldSx}
        />
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Açıklama"
          value={content.home.description}
          onChange={(event) =>
            updateHomeField("description", event.target.value)
          }
          sx={fieldSx}
        />
      </Box>

      <Divider sx={{ marginY: 5 }} />

      <Box>
        <Typography variant="h5" sx={{ fontFamily: "inherit", marginBottom: 2 }}>
          Hakkımızda
        </Typography>
        <TextField
          fullWidth
          label="Başlık"
          value={content.about.title}
          onChange={(event) => updateAboutField("title", event.target.value)}
          sx={fieldSx}
        />
        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Açıklama"
          value={content.about.description}
          onChange={(event) => updateAboutField("description", event.target.value)}
          sx={fieldSx}
        />
        <TextField
          fullWidth
          label="Görsel (URL)"
          value={content.about.image}
          onChange={(event) => updateAboutField("image", event.target.value)}
          sx={fieldSx}
        />
        <Button variant="outlined" component="label" sx={{ marginBottom: 3 }}>
          Hakkımızda Görseli Yükle
          <input type="file" hidden accept="image/*" onChange={handleAboutUpload} />
        </Button>
        {content.about.image ? (
          <Box sx={{ marginBottom: 3 }}>
            <Typography sx={{ fontFamily: "inherit", marginBottom: 1 }}>
              Hakkımızda Görseli Önizleme
            </Typography>
            <PreviewImage
              src={content.about.image}
              alt="Hakkımızda görseli önizleme"
            />
          </Box>
        ) : null}
      </Box>

      <Divider sx={{ marginY: 5 }} />

      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
          <Typography variant="h5" sx={{ fontFamily: "inherit" }}>
            Projeler
          </Typography>
          <Typography sx={{ fontFamily: "inherit", color: "#666" }}>
            ({filteredProjects.length})
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: 3 }}>
          <TextField
            label="Proje ara"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            sx={{ ...fieldSx, minWidth: 240, marginBottom: 0 }}
          />
          <Select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="all">Tümü</MenuItem>
            <MenuItem value="active">Tamamlanmamış</MenuItem>
            <MenuItem value="completed">Tamamlanmış</MenuItem>
          </Select>
        </Box>
        {filteredProjects.map((project, index) => (
          <Box
            key={project.id}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              padding: 3,
              marginBottom: 3,
            }}
          >
            <Typography sx={{ fontFamily: "inherit", marginBottom: 2 }}>
              Proje {index + 1}
            </Typography>
            <TextField
              fullWidth
              label="Başlık"
              value={project.title}
              onChange={(event) =>
                updateProjectField("projects", index, "title", event.target.value)
              }
              sx={fieldSx}
            />
            <TextField
              fullWidth
              label="Konum"
              value={project.location}
              onChange={(event) =>
                updateProjectField(
                  "projects",
                  index,
                  "location",
                  event.target.value
                )
              }
              sx={fieldSx}
            />
            <TextField
              fullWidth
              label="Tarih"
              value={project.year}
              onChange={(event) =>
                updateProjectField("projects", index, "year", event.target.value)
              }
              sx={fieldSx}
            />
            <TextField
              fullWidth
              label="Yapı Türü"
              value={project.type}
              onChange={(event) =>
                updateProjectField("projects", index, "type", event.target.value)
              }
              sx={fieldSx}
            />
            <TextField
              fullWidth
              label="Parsel Alanı"
              value={project.parcelArea}
              onChange={(event) =>
                updateProjectField(
                  "projects",
                  index,
                  "parcelArea",
                  event.target.value
                )
              }
              sx={fieldSx}
            />
            <TextField
              fullWidth
              label="Yapı Alanı"
              value={project.buildingArea}
              onChange={(event) =>
                updateProjectField(
                  "projects",
                  index,
                  "buildingArea",
                  event.target.value
                )
              }
              sx={fieldSx}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={project.isCompleted}
                  onChange={(event) =>
                    updateProjectField(
                      "projects",
                      index,
                      "isCompleted",
                      event.target.checked
                    )
                  }
                />
              }
              label="Tamamlandı mı?"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Görseller (satır satır URL)"
              value={project.images.join("\n")}
              onChange={(event) =>
                updateProjectImages("projects", index, event.target.value)
              }
              sx={fieldSx}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ marginBottom: 2 }}
            >
              Görsel Yükle
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={(event) => handleProjectUpload("projects", index, event)}
              />
            </Button>
            {project.images.length ? (
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginBottom: 2 }}>
                {project.images.map((image, imageIndex) => (
                  <PreviewImage
                    key={`${project.id}-image-${imageIndex}`}
                    src={image}
                    alt={`${project.title || "Proje"} görsel ${imageIndex + 1}`}
                  />
                ))}
              </Box>
            ) : null}
            <Button
              color="error"
              variant="outlined"
              onClick={() => removeProject("projects", index)}
            >
              Projeyi Sil
            </Button>
          </Box>
        ))}
        <Button variant="outlined" onClick={() => addProject("projects")}>
          Yeni Proje Ekle
        </Button>
      </Box>

      <Divider sx={{ marginY: 5 }} />

      <Button variant="contained" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Kaydediliyor..." : "Tüm Değişiklikleri Kaydet"}
      </Button>
    </Container>
  );
};

export default AdminPage;
