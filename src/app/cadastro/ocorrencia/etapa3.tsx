import { useState, useEffect } from "react";
import Mapa from "./mapa";
import { validateEndereco } from "./validate";

interface EnderecoInterface {
    estado: string;
    cidade: string;
    rua: string;
    bairro: string;
    numero: string;
}

export default function Etapa3({ ocorrencia, setOcorrencia, validacoes, setValidacoes }: any) {
    const [botaoSelecionado, setBotaoSelecionado] = useState<number>(1);
    const [localizacao, setLocalizacao] = useState<{ lat: number; lng: number } | null>(null);
    const [endereco, setEndereco] = useState<EnderecoInterface>({
        estado: '',
        cidade: '',
        rua: '',
        bairro: '',
        numero: '',
    });

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

    // Atualiza o endereço com base em mudanças no campo de entrada
    const handleChange = (field: string, value: string) => {
        setEndereco((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Valida campos ao perder o foco
    const handleBlur = (campo: string) => {
        setValidacoes((prev: any) => ({
            ...prev,
            [`${campo}Valido`]: validateEndereco(endereco[campo as keyof EnderecoInterface]),
        }));
    };

    // Renderiza o conteúdo dependendo do botão selecionado
    const renderContent = () => {
        if (botaoSelecionado === 1) {
            return localizacao ? (
                <Mapa localizacao={localizacao} setLocalizacao={setLocalizacao} endereco={endereco} funcao={1}/>
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
                                <select onChange={(e) => handleChange("estado", e.target.value)}>
                                    <option value="">Selecione um estado</option>
                                    <option value="Minas Gerais">Minas Gerais</option>
                                    <option value="Sao Paulo">São Paulo</option>
                                    <option value="Goias">Goiás</option>
                                    <option value="Tocantins">Tocantins</option>
                                    <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                                    <option value="Mato Grosso">Mato Grosso</option>
                                    <option value="Distrito Federal">Distrito Federal</option>
                                    <option value="Bahia">Bahia</option>
                                    <option value="Maranhao">Maranhão</option>
                                    <option value="Piaui">Piauí</option>
                                </select>
                            </div>
                        </div>
                        <label className="subtitle is-5">Cidade:</label>
                        <div className="field mb-5">
                            <input
                                className="input is-success is-medium"
                                value={endereco.cidade}
                                onChange={(e) => handleChange("cidade", e.target.value)}
                                onBlur={() => handleBlur("cidade")}
                            />
                            {!validacoes.cidadeValido && <p className="mt-2 subtitle is-5 has-text-danger">Campo obrigatório.</p>}
                        </div>
                        <label className="subtitle is-5">Rua:</label>
                        <div className="field mb-5">
                            <p className="control">
                                <input id="inputRua"
                                    className="input is-success is-medium"
                                    value={endereco.rua}
                                    onChange={event => handleChange("rua", event.target.value)}
                                    type="text"
                                    onBlur={event => handleBlur("rua")} />

                            </p>
                            {!validacoes.ruaValido && <p className="mt-2 subtitle is-5 has-text-danger">Campo obrigatório.</p>}
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label className="subtitle is-5">Bairro:</label>
                                <div className="field mb-5">
                                    <p className="control">
                                        <input id="inputBairro"
                                            className="input is-success is-medium"
                                            value={endereco?.bairro}
                                            onChange={event => handleChange("bairro", event.target.value)}
                                            type="text"
                                            onBlur={event => handleBlur("bairro")} />

                                    </p>
                                    {!validacoes.bairroValido && <p className="mt-2 subtitle is-5 has-text-danger">Campo obrigatório.</p>}
                                </div>
                            </div>
                            <div className="column">
                                <label className="subtitle is-5">Número:</label>
                                <div className="field mb-5">
                                    <p className="control">
                                        <input id="inputNumero"
                                            className="input is-success is-medium"
                                            value={endereco?.numero}
                                            onChange={event => handleChange("numero", event.target.value)}
                                            type="text"
                                            onBlur={event => handleBlur("numero")} />

                                    </p>
                                </div>
                            </div>
                        </div>
                    <Mapa localizacao={localizacao} setLocalizacao={setLocalizacao} endereco={endereco} funcao={2}></Mapa>
                    </div>

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
