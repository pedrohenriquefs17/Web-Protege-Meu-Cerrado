'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("https://pmc.airsoftcontrol.com.br/pmc/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, senha: password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Erro ao realizar login.");
                return;
            }

            const data = await response.json();

            console.log("Token: ", data);

        } catch (err) {
            setError("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className="container is-fluid">
            <div className="columns is-centered">
                <div className="column is-one-third">
                    
                    <div
                        className="box"
                        style={{
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            backgroundColor: "#127351",
                            color: "#fff",
                            padding: "1.5rem",
                            marginBottom: 0
                        }}
                    >
                        <h1 className="title has-text-centered has-text-white">Login</h1>
                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="box p-6"
                        style={{
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            marginTop: 0
                        }}
                    >
                        <div className="field">
                            <label className="label">E-mail</label>
                            <div className="control">
                                <input
                                    className="input is-medium"
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field mb-5">
                            <label className="label">Senha</label>
                            <div className="control">
                                <input
                                    className="input is-medium"
                                    type="password"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-fullwidth is-medium"
                                    style={{ backgroundColor: "#127351", color: "#fff", border:"none"}}
                                >
                                    Entrar
                                </button>
                            </div>
                        </div>
                    </form>

                    <p className="has-text-centered has-text-white mt-3">
                        <Link href="/login/esqueceu-senha">Esqueceu sua senha?</Link>
                    </p>
                    <p className="has-text-centered has-text-white mt-1">
                        <Link href="/login/nova-conta">Criar nova conta</Link>
                    </p>

                    {error && (
                        <p className="has-text-danger has-text-centered mt-3">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
