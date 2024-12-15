import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const Mapa2: React.FC<any> = ({ localizacao, endereco, setEndereco }) => {
    const mapRef = useRef(null);
    const [error, setError] = useState<string | null>(null);
    const [manualUpdate, setManualUpdate] = useState(false);
    const [localizacaoMapa2, setLocalizacaoMapa2] = useState<{ lat: number; lng: number }>(localizacao);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCd177zMMVeuj0UIZWM7hHsoSZpaZ6Etzo", //AIzaSyBmE-KqfQyyoo47gzs90EyhbpZniMqBC-w
        libraries: ["places"],
    });

    useEffect(() => {
        if (!manualUpdate && endereco.cidade && endereco.estado) {
            buscarCoordenadas(`${endereco.cidade}, ${endereco.estado}`);
        } else {
            setManualUpdate(false);
        }
    }, [endereco.cidade, endereco.estado]);

    // Função para buscar coordenadas de um endereço
    const buscarCoordenadas = async (endereco: string) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=AIzaSyCd177zMMVeuj0UIZWM7hHsoSZpaZ6Etzo`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setLocalizacaoMapa2({ lat: location.lat, lng: location.lng });
                setError(null);
            } else {
                setError("Endereço não encontrado.");
            }
        } catch (err) {
            setError("Erro ao buscar coordenadas. Tente novamente.");
        }
    };

    // Atualizar a posição do marcador e buscar o endereço por coordenadas
    const onMarkerDragEnd = async (event: any) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        setManualUpdate(true);
        setLocalizacaoMapa2({ lat: newLat, lng: newLng });
        buscarEnderecoPorCoordenadas(newLat, newLng);
    };

    // Buscar o endereço de acordo com as coordenadas
    const buscarEnderecoPorCoordenadas = async (lat: number, lng: number) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCd177zMMVeuj0UIZWM7hHsoSZpaZ6Etzo`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === "OK" && data.results.length > 0) {
                const addressComponents = data.results[0].address_components;
                let enderecoFormatado = {
                    cidade: "",
                    estado: "",
                };

                addressComponents.forEach((component: any) => {
                    if (component.types.includes("administrative_area_level_2")) {
                        enderecoFormatado.cidade = component.long_name;
                    }
                    if (component.types.includes("administrative_area_level_1")) {
                        enderecoFormatado.estado = component.long_name;
                    }
                });

                setEndereco(enderecoFormatado);
            }
        } catch (error) {
            console.error("Erro ao buscar o endereço:", error);
        }
    };

    return (
        <div>
            <p>Latitude: {localizacaoMapa2.lat} e longitude: {localizacaoMapa2.lng}</p>
            <p>Endereço: cidade {endereco.cidade}, estado {endereco.estado}</p>

            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "400px" }}
                    center={localizacaoMapa2}
                    zoom={15}
                    ref={mapRef}
                >
                    <Marker
                        position={localizacaoMapa2}
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                    />
                </GoogleMap>
            ) : (
                <p>Carregando mapa...</p>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Mapa2;
