"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";

const AdminLoginPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const isAuthed = typeof window !== "undefined"
      ? window.localStorage.getItem("admin_authed") === "true"
      : false;
    if (isAuthed) {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (password === ADMIN_PASSWORD) {
      window.localStorage.setItem("admin_authed", "true");
      router.replace("/admin");
      return;
    }

    setErrorMessage("Şifre hatalı.");
  };

  return (
    <Container maxWidth="sm" sx={{ paddingY: 8 }}>
      <Typography variant="h4" sx={{ fontFamily: "inherit", marginBottom: 2 }}>
        Admin Girişi
      </Typography>
      <Typography sx={{ fontFamily: "inherit", marginBottom: 3, color: "#666" }}>
        Yönetim paneline erişmek için şifrenizi girin.
      </Typography>

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

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
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" type="submit" fullWidth>
          Giriş Yap
        </Button>
      </Box>
    </Container>
  );
};

export default AdminLoginPage;
