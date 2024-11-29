import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";

const Mapa: React.FC<any> = ({ localizacao, setLocalizacao, endereco }) => {
    const mapRef = useRef(null); // Referência do mapa

    const enderecoString = `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`;

    const [error, setError] = useState<string | null>();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCd177zMMVeuj0UIZWM7hHsoSZpaZ6Etzo", // Substitua pela sua chave da API
        libraries: ["places"], // Se precisar de funcionalidades como autocomplete
    });

    const buscarCoordenadas = async () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(enderecoString)}&key=AIzaSyCd177zMMVeuj0UIZWM7hHsoSZpaZ6Etzo`; 
        try {
          const response = await fetch(url);
          const data = await response.json();
    
          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            setLocalizacao({ lat: location.lat, lng: location.lng });
            setError(null);
          } else {
            console.log("Endereço não encontrado.");
          }
        } catch (err) {
          console.log("Erro ao buscar coordenadas. Tente novamente.");
        }
      };

    // Função para atualizar a localização quando o mapa for clicado
    const onMapClick = (event: any) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        setLocalizacao({ lat: newLat, lng: newLng });
    };

    useEffect(() => {
        
        if (endereco && isLoaded) {
            buscarCoordenadas(); // Chama a função assim que a API é carregada e o endereço está completo
        }
    }, [endereco, isLoaded]);
    

    return (
        <div>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "400px" }}
                    center={{ lat: localizacao.lat, lng: localizacao.lng }}
                    zoom={10}
                    ref={mapRef}
                >
                    <Marker position={{ lat: localizacao.lat, lng: localizacao.lng }} />
                </GoogleMap>
            ) : (
                <p>Carregando mapa...</p>
            )}
        </div>
    );
};

export default Mapa;
