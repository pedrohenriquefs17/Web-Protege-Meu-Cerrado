import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const Mapa: React.FC<any> = ({ localizacao, setLocalizacao, endereco, funcao }) => {
    const mapRef = useRef(null); // Referência do mapa

    const enderecoString = [
        endereco.rua,
        endereco.numero,
        endereco.bairro,
        endereco.cidade,
        endereco.estado,
        "Brasil",
    ]
        .filter(Boolean)
        .join(", ");

    const [localizacaoAtual, setLocalizacaoAtual] = useState(localizacao); // Localização baseada no endereço
    const [localizacaoManual, setLocalizacaoManual] = useState(localizacao); // Localização manual (alterada pelo usuário)

    const [error, setError] = useState<string | null>(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCd177zMMVeuj0UIZWM7hHsoSZpaZ6Etzo",
        libraries: ["places"],
    });

    const buscarCoordenadas = async () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(enderecoString)}&key=AIzaSyCd177zMMVeuj0UIZWM7hHsoSZpaZ6Etzo`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setLocalizacaoManual({ lat: location.lat, lng: location.lng });
                setError(null);
            } else {
                setError("Endereço não encontrado.");
            }
        } catch (err) {
            setError("Erro ao buscar coordenadas. Tente novamente.");
        }
    };

    useEffect(() => {
        if (isLoaded) {
            if (funcao === 2 && endereco && Object.values(endereco).every((campo) => campo)) {
                buscarCoordenadas();
            } else if (funcao === 1) {
                setLocalizacao(localizacaoAtual);
            }
        }
    }, [funcao, endereco, isLoaded]);

    const onMapClick = (event: any) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        setLocalizacaoManual({ lat: newLat, lng: newLng }); 
    };

    const localizacaoParaExibir = funcao === 2 ? localizacaoManual : localizacaoAtual;

    return (
        <div>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "400px" }}
                    center={{ lat: localizacaoParaExibir.lat, lng: localizacaoParaExibir.lng }}
                    zoom={10}
                    ref={mapRef}
                    onClick={onMapClick} 
                >
                    <Marker position={{ lat: localizacaoParaExibir.lat, lng: localizacaoParaExibir.lng }} />
                </GoogleMap>
            ) : (
                <p>Carregando mapa...</p>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Mapa;
