'use client';

import React, { useState } from "react";
import Link from "next/link";

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("https://pmc.airsoftcontrol.com.br/pmc/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao enviar e-mail.");
        return;
      }

      setMessage("E-mail de recuperação enviado com sucesso.");
      setError("");
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    }
  };

  return (
    <div>
      <h1>Recuperar Senha</h1>
      <form onSubmit={handleForgotPassword} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>E-mail</label>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          style={{
            width: "100%",
            padding: "0.8rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button type="submit" style={styles.button}>
          Enviar link de recuperação
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        <Link href="/login">Voltar ao Login</Link>
      </p>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

const styles = {
  formContainer: {
    textAlign: "center",
    width: "100%",
    maxWidth: "500px",
    height: "auto",
    margin: "0 auto",
    padding: "2rem",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#127351",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default EsqueceuSenha;