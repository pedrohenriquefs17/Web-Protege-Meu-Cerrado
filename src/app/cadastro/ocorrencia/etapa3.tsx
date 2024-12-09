import { useState, useEffect } from "react";
import Mapa from "./mapa";
import Mapa2 from "./mapa2";

interface EnderecoInterface {
    estado: string;
    cidade: string;
}

export default function Etapa3({ ocorrencia, setOcorrencia, validacoes, setValidacoes }: any) {
    const [botaoSelecionado, setBotaoSelecionado] = useState<number>(1);
    const [localizacao, setLocalizacao] = useState<{ lat: number; lng: number } | null>(null);
    const [endereco, setEndereco] = useState<EnderecoInterface>({
        estado: '',
        cidade: ''
    });

    const handleChange = (field: string, value: string) => {
        setEndereco((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Função para obter a localização atual do usuário
    const getUsuarioLoc = (): Promise<GeolocationPosition> => {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error("Geolocalização não é suportada pelo navegador."));
            }
        });
    };

    // Obtém a localização atual quando o botão é selecionado
    useEffect(() => {
        if (botaoSelecionado === 1 && !localizacao) {
            const obterLocAtual = async () => {
                try {
                    const posicao = await getUsuarioLoc();
                    const novaLocalizacao = {
                        lat: posicao.coords.latitude,
                        lng: posicao.coords.longitude,
                    };

                    setLocalizacao(novaLocalizacao);

                    setOcorrencia((prev: any) => ({
                        ...prev,
                        lat: novaLocalizacao.lat,
                        lng: novaLocalizacao.lng,
                    }));
                } catch (error: any) {
                    console.error("Erro ao obter localização:", error.message);
                }
            };

            obterLocAtual();
        }
    }, [botaoSelecionado, localizacao]);

    // Renderiza o conteúdo dependendo do botão selecionado
    const renderContent = () => {
        if (botaoSelecionado === 1) {
            return localizacao ? (
                <Mapa localizacao={localizacao} setLocalizacao={setLocalizacao} />
            ) : (
                <p>Obtendo localização...</p>
            );
        } else if (botaoSelecionado === 2) {
            return (
                <>
                    <div className="container">
                        <label className="subtitle is-5">Estado:</label>
                        <div className="field mt-2 mb-5">
                            <div className="select is-success is-fullwidth is-medium">
                                <select
                                    value={endereco.estado}
                                    onChange={(e) => handleChange("estado", e.target.value)}
                                >
                                    <option value="" disabled>Selecione um estado</option>
                                    <option value="Minas Gerais">Minas Gerais</option>
                                    <option value="São Paulo">São Paulo</option>
                                    <option value="Goiás">Goiás</option>
                                    <option value="Tocantins">Tocantins</option>
                                    <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                                    <option value="Mato Grosso">Mato Grosso</option>
                                    <option value="Distrito Federal">Distrito Federal</option>
                                    <option value="Bahia">Bahia</option>
                                    <option value="Maranhão">Maranhão</option>
                                    <option value="Piauí">Piauí</option>
                                </select>
                            </div>
                        </div>

                        <label className="subtitle is-5">Cidade:</label>
                        <div className="field mb-5">
                            <input
                                className="input is-success is-medium"
                                value={endereco.cidade}
                                onChange={(e) => handleChange("cidade", e.target.value)}
                            />
                        </div>
                    </div>
                    <article className="message is-success">
                        <div className="message-body">
                            Arraste o marcador para selecionar a localização da ocorrência.
                        </div>
                    </article>
                    <Mapa2 localizacao={localizacao} endereco={endereco} setEndereco={setEndereco}></Mapa2>

                </>
            );
        }
    };

    // Estiliza os botões dependendo do botão ativo
    const getButtonClass = (botao: number) => {
        return botaoSelecionado === botao ? "button is-success is-medium is-active" : "button is-medium";
    };

    return (
        <>
            <p className="title">Localização</p>
            <div className="buttons has-addons">
                <button
                    className={getButtonClass(1)}
                    onClick={() => setBotaoSelecionado(1)}
                >
                    Localização atual
                </button>
                <button
                    className={getButtonClass(2)}
                    onClick={() => setBotaoSelecionado(2)}
                >
                    Informar a localização manualmente
                </button>
            </div>
            <div>{renderContent()}</div>
        </>
    );
}
