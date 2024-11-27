"use client";

import { useState } from "react";
import Etapa1 from "./etapa1";
import { OcorrenciaInterface } from "./ocorrenciaInterface";
import Etapa2 from "./etapa2";
import Etapa3 from "./etapa3";

export default function Ocorrencia() {
    const [currentStep, setCurrentStep] = useState(2);

    const [ocorrencia, setOcorrencia] = useState<OcorrenciaInterface>({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        dataNascimento: "",
        dataOcorrencia: "",
        categoria: "",
        descricao: "",
        arquivos: [] as File[],
        localizacao: ""
    });

    const [validacoes, setValidacoes] = useState({
        cpfValido: true,
        emailValido: true,
        telefoneValido: true,
        dataNascimentoValido: true
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
            if (!validacoes.cpfValido || !validacoes.dataNascimentoValido || !validacoes.emailValido || !validacoes.telefoneValido || !ocorrencia.nome) {
                alert("Preencha os dados, por favor!");
                return;
            }
        }
        setCurrentStep(index);
    }

    // Renderiza o conteúdo da etapa atual
    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <Etapa1 ocorrencia={ocorrencia} setOcorrencia={setOcorrencia} validacoes={validacoes} setValidacoes={setValidacoes} />
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
                        <Etapa3 ocorrencia={ocorrencia} setOcorrencia={setOcorrencia}></Etapa3>
                    </div>
                );
            default:
                return null;
        }
    }

    const submit = () => {
        console.log(ocorrencia);
    }

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
                                <button className="button is-success" onClick={() => showStep(currentStep - 1, "")}>
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
