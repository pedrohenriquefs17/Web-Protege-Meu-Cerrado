import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const Mapa: React.FC<any> = ({ localizacao, setLocalizacao, endereco, setEndereco, funcao }) => {
    const mapRef = useRef(null);
    const [error, setError] = useState<string | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCd177zMMVeuj0UIZWM7hHsoSZpaZ6Etzo",
        libraries: ["places"],
    });

    return (
        <div>
            <p>Latitude: {localizacao.lat} e longitude: {localizacao.lng}</p>

            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "400px" }}
                    center={localizacao}
                    zoom={15}
                    ref={mapRef}
                >
                    <Marker
                        position={localizacao}
                        draggable={false}
                    />
                </GoogleMap>
            ) : (
                <p>Carregando mapa...</p>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Mapa;
