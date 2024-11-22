"use client";

import { OcorrenciaInterface } from "./ocorrenciaInterface";
import { validateCPF, validateEmail, validatePhone, validateDateOfBirth } from "./validate";
import InputMask from 'react-input-mask';

export default function Etapa1({ ocorrencia, setOcorrencia, validacoes, setValidacoes}: any) {

    //Estudar isso aqui
    const handleChange = (field: string, value: string) => {
        setOcorrencia((prev: OcorrenciaInterface) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleBlur = (campo: string) => {
        switch (campo) {
            case "cpf":
                setValidacoes({
                    ...validacoes,
                    cpfValido: validateCPF(ocorrencia.cpf),
                });
                break;
            case "email":
                setValidacoes({
                    ...validacoes,
                    emailValido: validateEmail(ocorrencia.email),
                });
                break;
            case "telefone":
                setValidacoes({
                    ...validacoes,
                    telefoneValido: validatePhone(ocorrencia.telefone),
                });
                break;
            case "dataNascimento":
                setValidacoes({
                    ...validacoes,
                    dataNascimentoValido: validateDateOfBirth(ocorrencia.dataNascimento),
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

                <div className="field mb-5">
                    <p className="control has-icons-left">
                        <input id="inputNome"
                            className="input is-success is-medium"
                            value={ocorrencia.nome}
                            onChange={event => handleChange("nome", event.target.value)}
                            type="text"
                            placeholder="Nome" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-circle-user"></i>
                        </span>
                    </p>
                </div>

                <div className="field mb-5">
                    <p className="control has-icons-left">
                        <input id="inputSobrenome"
                            className="input is-success is-medium"
                            type="text"
                            placeholder="Sobrenome"
                            value={ocorrencia.sobrenome}
                            onChange={event => handleChange("sobrenome", event.target.value)}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-circle-user"></i>
                        </span>
                    </p>
                </div>
                <div className="field mb-5">
                    <p className="control has-icons-left">
                        <input id="inputEmail"
                            className="input is-success is-medium"
                            type="email"
                            placeholder="Email"
                            onChange={event => handleChange("email", event.target.value)}
                            value={ocorrencia.email}
                            onBlur={event => handleBlur("email")} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        {!validacoes.emailValido && <p className="mt-2 subtitle is-5 has-text-danger">Email inválido.</p>}
                    </p>
                </div>
                <div className="columns">
                    <div className="field mb-5 column">
                        <p className="control has-icons-left">
                            <InputMask
                                mask="999.999.999-99"
                                id="inputCPF"
                                className="input is-success is-medium"
                                type="text"
                                placeholder="CPF"
                                onChange={event => handleChange("cpf", event.target.value)}
                                value={ocorrencia.cpf}
                                onBlur={event => handleBlur("cpf")} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-id-card"></i>
                            </span>
                            {!validacoes.cpfValido && <p className="mt-2 subtitle is-5 has-text-danger">CPF inválido.</p>}
                        </p>
                    </div>
                    <div className="field mb-5 column">
                        <p className="control">
                            <InputMask
                                mask="99/99/9999"
                                id="inputDate"
                                className="input is-success is-medium"
                                type="text"
                                placeholder="Data de nascimento"
                                onChange={event => handleChange("dataNascimento", event.target.value)}
                                value={ocorrencia.dataNascimento}
                                onBlur={event => handleBlur("dataNascimento")} />
                            {!validacoes.dataNascimentoValido && <p className="mt-2 subtitle is-5 has-text-danger">Data de nascimento inválida.</p>}
                        </p>
                    </div>
                    <div className="field mb-5 column">
                        <p className="control has-icons-left">
                            <InputMask
                                mask="(99) 99999-9999"
                                id="inputTelefone"
                                className="input is-success is-medium"
                                type="tel"
                                placeholder="Telefone"
                                onChange={event => handleChange("telefone", event.target.value)}
                                value={ocorrencia.telefone}
                                onBlur={event => handleBlur("telefone")} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-phone"></i>
                            </span>
                            {!validacoes.telefoneValido && <p className="mt-2 subtitle is-5 has-text-danger">Telefone inválido.</p>}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}