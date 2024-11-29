"use client";

import { useState } from "react";
import Etapa1 from "./etapa1";
import { OcorrenciaInterface } from "./ocorrenciaInterface";
import Etapa2 from "./etapa2";
import Etapa3 from "./etapa3";

export default function Ocorrencia() {
    const [currentStep, setCurrentStep] = useState(0);

    const [voltarAnonimo, setVoltarAnonimo] = useState(false);

    const [ocorrencia, setOcorrencia] = useState<OcorrenciaInterface>({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        dataNascimento: "",
        anonimo: false,
        dataOcorrencia: "",
        categoria: "",
        descricao: "",
        arquivos: [] as File[],
        lat: "",
        lng: ""
    });

    const [validacoes, setValidacoes] = useState({
        nomeValido: true,
        cpfValido: true,
        emailValido: true,
        telefoneValido: true,
        dataNascimentoValido: true,
        dataOcorrenciaValida: true,
        descricaoValida: true,
        cidadeValido: true,
        bairroValido: true,
        ruaValido: true,
        numeroValido: true
    });

    const steps = 3;

    // Atualiza a barra de progresso de acordo com a etapa
    const updateProgressBar = () => {
        const barValue = ((currentStep + 1) / steps) * 100;
        return barValue;
    }

    // Usada para mostrar uma etapa (ela atualiza a etapa atual)
    const showStep = (index: number, tipo: string) => {
        if (tipo.includes('avancar')) {
            if (ocorrencia.anonimo == false) {
                if (!validacoes.cpfValido || !ocorrencia.cpf || !validacoes.dataNascimentoValido || !ocorrencia.dataNascimento || !validacoes.emailValido || !ocorrencia.email || !validacoes.telefoneValido || !ocorrencia.telefone || !ocorrencia.nome) {
                    alert("Preencha os dados, por favor!");
                    return;
                }
            }

            if (currentStep == 1) {
                if (!validacoes.descricaoValida || !ocorrencia.descricao || !validacoes.dataOcorrenciaValida || !ocorrencia.dataOcorrencia) {
                    alert("Preencha os campos, por favor!");
                    return;
                }
            }
        }

        if (tipo.includes('voltar')) {
            if (ocorrencia.anonimo === true) {
                setVoltarAnonimo(true);
            } else {
                setVoltarAnonimo(false);
            }
        }

        setCurrentStep(index);

    }

    // Renderiza o conteúdo da etapa atual
    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <Etapa1 ocorrencia={ocorrencia} setOcorrencia={setOcorrencia} validacoes={validacoes} setValidacoes={setValidacoes} voltarAnonimo={voltarAnonimo} />
                );
            case 1:
                return (
                    <div>
                        <Etapa2 ocorrencia={ocorrencia} setOcorrencia={setOcorrencia} validacoes={validacoes} setValidacoes={setValidacoes}></Etapa2>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <Etapa3 ocorrencia={ocorrencia} setOcorrencia={setOcorrencia} validacoes={validacoes} setValidacoes={setValidacoes}></Etapa3>
                    </div>
                );
            default:
                return null;
        }
    }

    const enviarDadosParaBackend = async (dados: OcorrenciaInterface) => {
        try {
            const formData = new FormData();
            formData.append("nome", dados.nome);
            formData.append("email", dados.email);
            formData.append("cpf", dados.cpf);
            formData.append("telefone", dados.telefone);
            formData.append("dataNascimento", dados.dataNascimento);
            formData.append("anonimo", dados.anonimo.toString());
            formData.append("dataOcorrencia", dados.dataOcorrencia);
            formData.append("categoria", dados.categoria);
            formData.append("descricao", dados.descricao);
            formData.append("lat", dados.lat);
            formData.append("lng", dados.lng);

            // Adicionando arquivos
            //dados.arquivos.forEach((arquivo, index) => {
            //    formData.append(`arquivo${index}`, arquivo);
            //});

            const resposta = await fetch("http://seu-backend.com/api/endpoint", {
                method: "POST",
                body: formData,
            });

            if (!resposta.ok) {
                throw new Error("Erro ao enviar dados para o backend");
            }

            const data = await resposta.json();
            console.log("Resposta do servidor:", data);
        } catch (erro) {
            console.error("Erro no POST:", erro);
            throw erro;
        }
    };

    const submit = async () => {
        try {

            console.log(ocorrencia);

            // await enviarDadosParaBackend(ocorrencia);
            // alert("Dados enviados com sucesso!");

            // setOcorrencia({
            //     nome: "",
            //     email: "",
            //     cpf: "",
            //     telefone: "",
            //     dataNascimento: "",
            //     anonimo: false,
            //     dataOcorrencia: "",
            //     categoria: "",
            //     descricao: "",
            //     arquivos: [] as File[],
            //     lat: "",
            //     lng: ""
            // });
        } catch (erro) {
            alert("Erro ao enviar os dados. Tente novamente mais tarde.");
            console.error(erro);
        }
    };

    return (
        <>
            <div className="custom-background section is-fullheight">
                <div className="content has-text-centered">
                    <p className="title has-text-white">Protege Meu Cerrado</p>
                    <p className="subtitle has-text-white">Cadastre sua denúncia</p>
                </div>
                <div>
                    <div className="column is-half is-offset-one-quarter">
                        <progress className="progress is-success" value={updateProgressBar()} max="100"></progress>
                        <div className="box p-6 is-rounded">
                            <div className="form-step">{renderStepContent()}</div>
                        </div>
                        <div className="mt-4 is-flex is-justify-content-space-between">

                            {currentStep > 0 ? (
                                <button className="button is-success" onClick={() => showStep(currentStep - 1, "voltar")}>
                                    Voltar
                                </button>
                            ) : (
                                <span></span> /* Espaçador vazio para manter o alinhamento */
                            )}

                            {currentStep < (steps - 1) && (
                                <button
                                    className="button is-success"
                                    onClick={() => showStep(currentStep + 1, "avancar")}
                                >
                                    Avançar
                                </button>
                            )}
                            {currentStep === (steps - 1) && (
                                <button className="button is-success" type="submit" onClick={submit}>
                                    Finalizar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

