'use client';

import React, { useState } from "react";
import InputMask from 'react-input-mask';
import Link from "next/link";

interface UsuarioCadastro {
    nome: string,
    email: string,
    cpf: string,
    dataNascimento: Date,
    telefone: string,
    role: string,
    senha: string,
    confirmarSenha: string
}

const NovaConta = () => {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState(null);
    const [telefone, setTelefone] = useState("");
    const [role, setRole] = useState("USUARIO");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async () => {
        console.log(nome)
        console.log(email)
        console.log(cpf)
        console.log(dataNascimento)
        console.log(telefone)
        console.log(role)
        console.log(senha)
        console.log(confirmarSenha)

        try {

            const converterData = (dataStr: any) => {
                const [dia, mes, ano] = dataStr.split('/');
                return `${ano}-${mes}-${dia}`;
            }

            const dataNasc = new Date(converterData(dataNascimento));

            const response = await fetch("https://pmc.airsoftcontrol.com.br/pmc/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "nome": nome,
                    "email": email,
                    "cpf": cpf,
                    "dataNascimento": dataNasc,
                    "telefone": telefone,
                    "role": "USUARIO",
                    "senha": senha,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Erro ao criar conta.");
                console.log(error)
                return;
            }

            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem.");
                return;
            } else {
                setSuccess("Conta criada com sucesso.");
                setError("");
                setNome("");
                setCpf("");
                setDataNascimento(null);
                setTelefone("");
                setRole("");
                setEmail("");
                setSenha("");
            }
        } catch (err) {
            setError("Erro ao conectar com o servidor");
        }

    };

    return (
        <div>
            <h1>Criar Nova Conta</h1>
            <form style={{ display: "flex", flexDirection: "row", width: "100%", maxWidth: "900px", margin: "0 auto" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Nome</label>
                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={nome}
                        style={{
                            width: "100%",
                            padding: "0.8rem",
                            marginBottom: "1rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>E-mail</label>
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        style={{
                            width: "100%",
                            padding: "0.8rem",
                            marginBottom: "1rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>CPF</label>
                    <InputMask
                        mask="999.999.999-99"
                        value={cpf}
                        placeholder="Digite seu CPF"
                        style={{
                            width: "100%",
                            padding: "0.8rem",
                            marginBottom: "1rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        onChange={(e: any) => setCpf(e.target.value)}
                        required
                    />
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Data de nascimento</label>
                    <InputMask
                        mask="99/99/9999"
                        //value={dataNascimento}
                        placeholder="Digite sua data de nascimento"
                        style={{
                            width: "100%",
                            padding: "0.8rem",
                            marginBottom: "1rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        onChange={(e: any) => setDataNascimento(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Telefone</label>
                    <InputMask
                        mask="(99)99999-9999"
                        value={telefone}
                        placeholder="Digite seu telefone"
                        style={{
                            width: "100%",
                            padding: "0.8rem",
                            marginBottom: "1rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        onChange={(e: any) => setTelefone(e.target.value)}
                        required
                    />
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Cargo</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "0.8rem",
                            marginBottom: "1rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}>
                        <option value="USUARIO">Usuário</option>
                        <option value="ADMINISTRADOR">Administrador</option>
                    </select>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Senha</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        style={{
                            width: "100%",
                            padding: "0.8rem",
                            marginBottom: "1rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Confirmar senha</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={confirmarSenha}
                        style={{
                            width: "100%",
                            padding: "0.8rem",
                            marginBottom: "1rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                    />
                </div>
            </form>
            <button onClick={handleRegister} style={styles.button}>
                Criar Conta
            </button>
            <p style={{ marginTop: "1rem" }}>
                Já tem uma conta? <Link href="/login">Fazer Login</Link>
            </p>
            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

const styles = {
    formContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
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
    formColumn: {
        display: "flex",
        flexDirection: "column",
        width: "48%",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
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

export default NovaConta;