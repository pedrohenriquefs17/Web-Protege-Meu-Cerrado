'use client';

import React, { useState } from "react";
import InputMask from 'react-input-mask';
import Link from "next/link";
import { validateCPF, validateEmail, validateNome, validatePhone } from "app/cadastro/ocorrencia/validate";

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
    const [validacoes, setValidacoes] = useState({
        nomeValido: true,
        cpfValido: true,
        emailValido: true,
        telefoneValido: true,
    });

    const handleRegister = async () => {
        console.log(nome)
        console.log(email)
        console.log(cpf)
        console.log(dataNascimento)
        console.log(telefone)
        console.log(role)
        console.log(senha)
        console.log(confirmarSenha)

        if (!validacoes.cpfValido || !cpf || !dataNascimento || !validacoes.emailValido || !email || !validacoes.telefoneValido || !telefone || !nome || !senha || !confirmarSenha) {
            alert("Preencha os dados, por favor!");
            return;
        }

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

    const handleBlur = (valor: string) => {
        if (valor === "nome") {
            setValidacoes({
                ...validacoes,
                nomeValido: validateNome(nome)
            });
        }
        if (valor === "cpf") {
            setValidacoes({
                ...validacoes,
                cpfValido: validateCPF(cpf)
            });
        }
        if (valor === "email") {
            setValidacoes({
                ...validacoes,
                emailValido: validateEmail(email)
            });
        }
        if (valor === "telefone") {
            setValidacoes({
                ...validacoes,
                telefoneValido: validatePhone(telefone)
            });
        }

    }

    return (
        <div className="container">
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
                <h1 className="title has-text-centered has-text-white">Nova conta</h1>
            </div>

            <form className="box p-6"
                style={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    marginTop: 0
                }}>
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="field mx-3">
                            <label className="label">Nome*</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input is-medium"
                                    placeholder="Digite seu nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                    onBlur={event => handleBlur("nome")}
                                />
                            </div>
                            {!validacoes.nomeValido && <p className="has-text-danger mt-1">Campo obrigatório.</p>}
                        </div>

                        <div className="field mx-3">
                            <label className="label">E-mail*</label>
                            <div className="control">
                                <input
                                    type="email"
                                    className="input is-medium"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    onBlur={event => handleBlur("email")}
                                />
                            </div>
                            {!validacoes.emailValido && <p className="has-text-danger mt-1">E-mail inválido.</p>}
                        </div>
                    </div>

                    <div className="column is-half">
                        <div className="field mx-3">
                            <label className="label">CPF*</label>
                            <div className="control">
                                <InputMask
                                    mask="999.999.999-99"
                                    value={cpf}
                                    className="input is-medium"
                                    placeholder="Digite seu CPF"
                                    onChange={(e: any) => setCpf(e.target.value)}
                                    required
                                    onBlur={event => handleBlur("cpf")}
                                />
                            </div>
                            {!validacoes.cpfValido && <p className="has-text-danger mt-1">CPF inválido.</p>}
                        </div>

                        <div className="field mx-3">
                            <label className="label">Data de nascimento*</label>
                            <div className="control">
                                <InputMask
                                    mask="99/99/9999"
                                    className="input is-medium"
                                    placeholder="Digite sua data de nascimento"
                                    onChange={(e: any) => setDataNascimento(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="field mx-3">
                            <label className="label">Telefone*</label>
                            <div className="control">
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={telefone}
                                    className="input is-medium"
                                    placeholder="Digite seu telefone"
                                    onChange={(e: any) => setTelefone(e.target.value)}
                                    required
                                    onBlur={event => handleBlur("telefone")}
                                />
                            </div>
                            {!validacoes.telefoneValido && <p className="has-text-danger mt-1">Telefone inválido.</p>}
                        </div>
                    </div>

                    <div className="column is-half">
                        <div className="field mx-3">
                            <label className="label">Cargo*</label>
                            <div className="control">
                                <div className="select is-medium is-fullwidth">
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="USUARIO">Usuário</option>
                                        <option value="ADMINISTRADOR">Administrador</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="field mx-3">
                            <label className="label">Senha*</label>
                            <div className="control">
                                <input
                                    type="password"
                                    className="input is-medium"
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="column is-half">
                        <div className="field mx-3">
                            <label className="label">Confirmar senha*</label>
                            <div className="control">
                                <input
                                    type="password"
                                    className="input is-medium"
                                    placeholder="Digite sua senha"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-flex is-justify-content-center">
                    <div className="control">
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="button is-medium"
                            style={{
                                backgroundColor: "#127351",
                                color: "#fff",
                            }}
                        >
                            Criar Conta
                        </button>
                    </div>
                </div>

                <p className="has-text-centered">
                    Já tem uma conta? <Link href="/login">Fazer Login</Link>
                </p>

                {success && <p className="has-text-success has-text-centered">{success}</p>}
                {error && <p className="has-text-danger has-text-centered">{error}</p>}
            </form>

        </div>
    );
}

export default NovaConta;
