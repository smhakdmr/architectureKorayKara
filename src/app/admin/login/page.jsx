"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const AdminLoginPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mevcut token gecerli mi kontrol et
    const token = window.localStorage.getItem("admin_token");
    if (!token) return;

    fetch("/api/auth", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) router.replace("/admin");
      })
      .catch(() => {
        // Token gecersiz, kalsin
      });
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Giriş başarısız.");
        setIsLoading(false);
        return;
      }

      // Token'i sakla ve yonlendir
      window.localStorage.setItem("admin_token", data.token);
      router.replace("/admin");
    } catch {
      setErrorMessage("Sunucuya bağlanılamadı.");
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingY: 8 }}>
      <Typography variant="h4" sx={{ fontFamily: "inherit", marginBottom: 2 }}>
        Admin Girişi
      </Typography>
      <Typography sx={{ fontFamily: "inherit", marginBottom: 3, color: "#666" }}>
        Yönetim paneline erişmek için şifrenizi girin.
      </Typography>

      {errorMessage ? <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert> : null}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ marginTop: 3 }}
      >
        <TextField
          fullWidth
          label="Şifre"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isLoading}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : null}
        >
          {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
      </Box>
    </Container>
  );
};

export default AdminLoginPage;
