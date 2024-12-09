"use client";

import { useEffect, useState } from "react";
import { validateCPF, validateEmail, validatePhone, validateDateOfBirth, validateNome, isMenorDezoito } from "./validate";
import InputMask from 'react-input-mask';

interface DadosFormulario {
    nome: string;
    email: string;
    dataNascimento: string;
    cpf: string;
    telefone: string;
}

export default function Etapa1({ ocorrencia, setOcorrencia, validacoes, setValidacoes, voltarAnonimo }: any) {

    const [botaoSelecionado, setBotaoSelecionado] = useState<number>(1);

    const [dadosFormulario, setDadosFormulario] = useState({
        nome: ocorrencia.nome,
        email: ocorrencia.email,
        dataNascimento: ocorrencia.dataNascimento,
        cpf: ocorrencia.cpf,
        telefone: ocorrencia.telefone
    });

    const [dadosBackup, setDadosBackup] = useState(null);

    const getButtonClass = (botao: number) => {
        return botaoSelecionado === botao
            ? "button is-success is-medium is-active"
            : "button is-medium";
    }

    const taCadastrado = () => {
        if(ocorrencia.idUser === null){
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (voltarAnonimo) {
            setBotaoSelecionado(2);
        }
    }, [voltarAnonimo]);

    useEffect(() => {
        if (botaoSelecionado === 2) {
    
            setDadosBackup(ocorrencia);

            setDadosFormulario({
                nome: '',
                email: '',
                dataNascimento: null,
                cpf: '',
                telefone: ''
            });

            setOcorrencia({
                nome: '',
                email: '',
                dataNascimento: null,
                cpf: '',
                telefone: '',
                anonimo: true
            });

        } else if (botaoSelecionado === 1 && dadosBackup) {
            setDadosFormulario(dadosBackup);
            setDadosBackup(null);
            setOcorrencia({ anonimo: false });
        }
    }, [botaoSelecionado]);

    useEffect(() => {
        if (dadosFormulario.nome || dadosFormulario.email || dadosFormulario.cpf || dadosFormulario.telefone || dadosFormulario.dataNascimento) {
            // Atualiza a ocorrencia toda vez que os dados do formulário mudarem
            setOcorrencia({
                ...dadosFormulario,
                anonimo: botaoSelecionado === 2
            });
        }
    }, [dadosFormulario, botaoSelecionado]); // Dependências para garantir que a ocorrencia seja atualizada quando necessário


    const handleChange = (field: keyof DadosFormulario, value: string) => {
        const atualizado = {
            ...dadosFormulario,
            [field]: value,
        };
        setDadosFormulario(atualizado);
    };

    const handleBlur = (campo: string) => {
        switch (campo) {
            case "nome":
                setValidacoes({
                    ...validacoes,
                    nomeValido: validateNome(ocorrencia.nome)
                });
                break;
            case "cpf":
                setValidacoes({
                    ...validacoes,
                    cpfValido: validateCPF(ocorrencia.cpf)
                });
                break;
            case "email":
                setValidacoes({
                    ...validacoes,
                    emailValido: validateEmail(ocorrencia.email)
                });
                break;
            case "telefone":
                setValidacoes({
                    ...validacoes,
                    telefoneValido: validatePhone(ocorrencia.telefone)
                });
                break;
            case "dataNascimento":
                setValidacoes({
                    ...validacoes,
                    dataNascimentoValido: validateDateOfBirth(ocorrencia.dataNascimento)
                });
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div>
                <p className="title">Informações pessoais</p>

                <div className="buttons has-addons">
                    <button
                        className={getButtonClass(1)}
                        onClick={() => {
                            setBotaoSelecionado(1);
                        }}
                    >
                        Denúncia normal
                    </button>
                    <button className={getButtonClass(2)} onClick={() => setBotaoSelecionado(2)} disabled={taCadastrado()}>
                        Denúncia anônima
                    </button>
                </div>
                <div className="field mb-5">
                    <p className="control has-icons-left">
                        <input id="inputNome"
                            className="input is-success is-medium"
                            value={dadosFormulario.nome}
                            onChange={event => handleChange("nome", event.target.value)}
                            type="text"
                            placeholder="Nome completo"
                            disabled={botaoSelecionado === 2}
                            onBlur={event => handleBlur("nome")} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-circle-user"></i>
                        </span>
                    </p>
                    {botaoSelecionado == 1 && !validacoes.nomeValido && <p className="mt-2 subtitle is-5 has-text-danger">Campo obrigatório.</p>}
                </div>
                <div className="field mb-5">
                    <p className="control has-icons-left">
                        <input id="inputEmail"
                            className="input is-success is-medium"
                            type="email"
                            placeholder="Email"
                            onChange={event => handleChange("email", event.target.value)}
                            value={dadosFormulario.email}
                            onBlur={event => handleBlur("email")}
                            disabled={botaoSelecionado === 2} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        {botaoSelecionado == 1 && !validacoes.emailValido && <p className="mt-2 subtitle is-5 has-text-danger">Email inválido.</p>}
                    </p>
                </div>
                <div className="columns">
                    <div className="field mb-2 column">
                        <p className="control has-icons-left">
                            <InputMask
                                mask="999.999.999-99"
                                id="inputCPF"
                                className="input is-success is-medium"
                                type="text"
                                placeholder="CPF"
                                onChange={event => handleChange("cpf", event.target.value)}
                                value={dadosFormulario.cpf}
                                onBlur={event => handleBlur("cpf")}
                                disabled={botaoSelecionado === 2} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-id-card"></i>
                            </span>
                            {botaoSelecionado == 1 && !validacoes.cpfValido && <p className="mt-2 subtitle is-5 has-text-danger">CPF inválido.</p>}
                        </p>
                    </div>
                    <div className="field mb-2 column">
                        <p className="control">
                            <InputMask
                                mask="99/99/9999"
                                id="inputDate"
                                className="input is-success is-medium"
                                type="text"
                                placeholder="Data de nascimento"
                                onChange={event => handleChange("dataNascimento", event.target.value)}
                                value={dadosFormulario.dataNascimento}
                                onBlur={event => handleBlur("dataNascimento")}
                                disabled={botaoSelecionado === 2} />
                            {botaoSelecionado == 1 && !validacoes.dataNascimentoValido && <p className="mt-2 subtitle is-5 has-text-danger">Data de nascimento inválida.</p>}
                        </p>
                    </div>
                    <div className="field mb-2 column">
                        <p className="control has-icons-left">
                            <InputMask
                                mask="(99) 99999-9999"
                                id="inputTelefone"
                                className="input is-success is-medium"
                                type="tel"
                                placeholder="Telefone"
                                onChange={event => handleChange("telefone", event.target.value)}
                                value={dadosFormulario.telefone}
                                onBlur={event => handleBlur("telefone")}
                                disabled={botaoSelecionado === 2} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-phone"></i>
                            </span>
                            {botaoSelecionado == 1 && !validacoes.telefoneValido && <p className="mt-2 subtitle is-5 has-text-danger">Telefone inválido.</p>}
                        </p>
                    </div>
                </div>
                {botaoSelecionado == 1 && validacoes.dataNascimentoValido && isMenorDezoito(dadosFormulario.dataNascimento) && <div className="notification is-warning is-light">
                    A data de nascimento informada corresponde a um usuário menor de idade. Ao continuar utilizando esta plataforma, você declara que possui autorização de seus pais ou responsáveis legais para realizar os relatos.
                </div>}
            </div>
        </>
    )
}