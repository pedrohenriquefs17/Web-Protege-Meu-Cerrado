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
            <div
                className="box is-flex"
                style={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: "#127351",
                    color: "#fff",
                    padding: "1.5rem",
                    marginBottom: 0
                }}
            >
                <h1 className="title has-text-centered has-text-white">Recuperar senha</h1>
            </div>
            <form className="box p-5" onSubmit={handleForgotPassword} style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                marginTop: 0
            }}>
                <label className="label">E-mail</label>
                <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    className="input is-medium mb-4"
                />

                <button type="submit" className="button" style={{
                    backgroundColor: "#127351",
                    color: "#fff",
                }}>
                    Enviar link de recuperação
                </button>


            </form>
            <p className="text-center has-text-white" style={{ marginTop: "1rem" }}>
                <Link href="/login">Voltar ao Login</Link>
            </p>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}


export default EsqueceuSenha;