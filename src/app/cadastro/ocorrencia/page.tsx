"use client";

import { useState } from "react";
import Etapa1 from "./etapa1";
import { OcorrenciaInterface } from "./ocorrenciaInterface";
import Etapa2 from "./etapa2";
import Etapa3 from "./etapa3";
import Image from "next/image";

export default function Ocorrencia() {
    const [currentStep, setCurrentStep] = useState(0);

    const [voltarAnonimo, setVoltarAnonimo] = useState(false);

    const [ocorrencia, setOcorrencia] = useState<OcorrenciaInterface>({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        dataNascimento: null,
        anonimo: false,
        dataOcorrencia: "",
        categoriaId: -1,
        descricao: "",
        arquivos: [] as File[],
        lat: "",
        lng: "",
        idUser: 33
    });

    const [validacoes, setValidacoes] = useState({
        nomeValido: true,
        cpfValido: true,
        emailValido: true,
        telefoneValido: true,
        dataNascimentoValido: true,
        dataOcorrenciaValida: true,
        descricaoValida: true,
        cidadeValido: true
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

    // const enviarDadosParaBackendCompleto = async (dados: OcorrenciaInterface) => {
    //     try {
    //         const formData = new FormData();

    //         formData.append("nome", "dados.nome");
    //         formData.append("email", "dados.email");
    //         formData.append("cpf", dados.cpf);
    //         formData.append("telefone", dados.telefone);
    //         formData.append("dataNascimento", dados.dataNascimento);
    //         formData.append("is_anon", dados.anonimo.toString());
    //         formData.append("dataOcorrencia", dados.dataOcorrencia);
    //         formData.append("categoria", dados.categoria);
    //         formData.append("descricao", dados.descricao);
    //         formData.append("lat", dados.lat);
    //         formData.append("lng", dados.lng);


    //         dados.arquivos.forEach((arquivo, index) => {
    //             formData.append(`arquivo${index}`, arquivo);
    //         });

    //         const resposta = await fetch("https://pmc.airsoftcontrol.com.br/ocorrencias/cadastro", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: formData
    //         });

    //         if (!resposta.ok) {
    //             throw new Error("Erro ao enviar dados para o backend");
    //         }

    //         const data = await resposta.json();
    //         console.log("Resposta do servidor:", data);
    //     } catch (erro) {
    //         console.error("Erro no POST:", erro);
    //         throw erro;
    //     }
    // };

    const enviarDadosParaBackend = async (dados: OcorrenciaInterface) => {
        console.log(dados)
        try {

            const converterData = (data: string | null): string => {
                if (data && typeof data === 'string') {
                    const partes = data.split('/');
                    if (partes.length === 3) {
                        const [dia, mes, ano] = partes;
                        return `${ano}-${mes}-${dia}`;
                    }
                }
                return '';
            };

            const criarDataSomenteDia = (data: string): Date | null => {
                if (data && /^\d{4}-\d{2}-\d{2}$/.test(data)) {
                    const [ano, mes, dia] = data.split('-').map(Number);
                    return new Date(Date.UTC(ano, mes - 1, dia));
                }
                return null;
            };

            const dataNasc = criarDataSomenteDia((converterData(dados.dataNascimento)));
            const dataOcorrencia = criarDataSomenteDia((converterData(dados.dataOcorrencia)));

            const dataNascISO = dataNasc ? dataNasc.toISOString().split('T')[0] : null;
            const dataOcorrenciaISO = dataOcorrencia ? dataOcorrencia.toISOString().split('T')[0] : null;

            const body = JSON.stringify({
                "is_anon": dados.anonimo, 
                "descricao": dados.descricao.trim(),
                "email": dados.email,
                "cpf": dados.cpf,
                "telefone": dados.telefone,
                "dt_nasc": dataNascISO,
                "dt_ocorrencia": dataOcorrenciaISO,
                "id_categoria": dados.categoriaId,
                "lat": dados.lat,
                "lon": dados.lng,
                "id_status": null,
                "id_user": 33
            });

            console.log("Corpo da requisição:", body);

            const resposta = await fetch("https://pmc.airsoftcontrol.com.br/ocorrencias", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            });

            if (!(resposta.status === 201)) {
                throw new Error(`Erro ao enviar dados: ${resposta.status} ${resposta.statusText}`);
            }
        } catch (erro) {
            console.error("Erro no POST:", erro);
            throw erro;
        }
    }

    const submit = async () => {
        try {

            console.log(ocorrencia);

            await enviarDadosParaBackend(ocorrencia);
            alert("Dados enviados com sucesso!");

            setOcorrencia({
                nome: "",
                email: "",
                cpf: "",
                telefone: "",
                dataNascimento: "",
                anonimo: false,
                dataOcorrencia: "",
                categoriaId: -1,
                descricao: "",
                arquivos: [] as File[],
                lat: "",
                lng: "",
                idUser: ocorrencia.idUser
            });
        } catch (erro) {
            alert("Erro ao enviar os dados. Tente novamente mais tarde.");
            console.error(erro);
        }
    };

    return (
        <>
            <div className="custom-background section is-fullheight">
                <div className="content is-flex is-justify-content-center is-align-items-center">
                    <div className="has-text-centered">
                        <Image
                            src="/logo-protege-meu-cerrado.png"
                            alt="Logo Protege Meu Cerrado"
                            width={300}
                            height={200}
                        />
                    </div>
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
                                <span></span>
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

