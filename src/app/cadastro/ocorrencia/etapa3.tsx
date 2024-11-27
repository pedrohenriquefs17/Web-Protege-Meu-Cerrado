import { useState } from "react";

export default function Etapa3({ocorrencia, setOcorrencia}: any) {

    //Controla o botao selecionado
    const [botaoSelecionado, setBotaoSelecionado] = useState<number | null>(1);

    //Armazena a localizacao
    const [localizacao, setLocalizacao] = useState<{ lat: number; long: number } | null>(null);

    //Funcao para obter a localizacao atual do usuário
    function getUsuarioLoc(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error("Geolocalização não é suportada pelo navegador."));
            }
        });
    }

    //Funcao que chama a funcao de obter a loc atual e seta a localizacao na constante - (Essa funcao é chamada dentro da renderizacao de conteúdo)
    const obterLocAtual = async () => {
        try {
            const posicao = await getUsuarioLoc();
            setLocalizacao({
                lat: posicao.coords.latitude,
                long: posicao.coords.longitude
            });
        } catch (error: any) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.error("Usuário negou a solicitação de geolocalização.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("As informações de localização não estão disponíveis.");
                    break;
                case error.TIMEOUT:
                    console.error("O tempo para obter a localização expirou.");
                    break;
                default:
                    console.error("Erro desconhecido:", error.message);
            }
        }
    };

    // Funcao para renderizar o conteúdo dependendo do botao selecionado
    const renderContent = () => {

        if (botaoSelecionado == 1) {
            obterLocAtual();
        }

        switch (botaoSelecionado) {
            case 1:
                return (
                    <div>
                        {localizacao ? (
                            <p>Latitude: {localizacao.lat}, Longitude: {localizacao.long}</p>
                        ) : (
                            <p>Obtendo localização...</p>
                        )}
                    </div>
                );
            case 2:
                return <div>oiii</div>;
            default:
                return <p>Selecione uma opção acima.</p>;
        }
    };

    // Funcao para estilizar os botoes de acordo com o botao que estiver selecionado
    const getButtonClass = (botao: number) => {
        return botaoSelecionado === botao
            ? "button is-success is-medium is-active" // Classe quando ativo
            : "button is-medium"; // Classe quando inativo
    };

    return (
        <>
            <p className="title">Localização</p>
            <div className="buttons has-addons">
                <button
                    className={getButtonClass(1)}
                    onClick={() => {
                        setBotaoSelecionado(1);
                    }}
                >
                    Localização atual
                </button>
                <button className={getButtonClass(2)} onClick={() => setBotaoSelecionado(2)}>
                    Informar a localização manualmente
                </button>
            </div>
            <div>{renderContent()}</div>
        </>
    );
}
