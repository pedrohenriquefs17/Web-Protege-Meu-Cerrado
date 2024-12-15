import dotenv from 'dotenv'
dotenv.config()

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import GET from "service/api/GET"
import IPonto from "types/IPonto"
import IOcorrencia from "types/IOcorrencia"

const MapaOcorrencia = () => {
    const [points, setPoins] = useState<IPonto[]>([])
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!
    })

    const center = { // Belo Horizonte
        lat: -19.9191,
        lng: -43.9387,
    }

    useEffect(() => {
        const fetchLocalizations = async () => {
            const occurrence = await GET({ url: "https://pmc.airsoftcontrol.com.br/ocorrencias" }) as Array<IOcorrencia>
            const localizations: IPonto[] = occurrence.map(loc => {
                return {
                    id: loc.id,
                    nome: loc.nome,
                    descricao: loc.descricao,
                    lat: +loc.lat,
                    lon: +loc.lon
                }
            })
            setPoins(localizations)
        }

        fetchLocalizations()
    }, [])

    const markPoints = () => {
        return points.map(p => {
            return (
                <Marker
                    position={{ lat: p.lat, lng: p.lon }}
                    key={`marker-${p.id}`}
                    /** FIXME: qnd desenvolvi, a ocorrencia tinha os campos nome e descricao,
                     *  eu nao sei se o nome é um titulo da ocorrencia ou o nome do usuario
                     *  que fez a denuncia. Caso seja o nome do usuário trocar a label pra
                     *  descrição ou so omitir
                     */
                    // label={p.descricao}
                    label={p.nome}
                />
            )
        })
    }

    return isLoaded ? (
        <GoogleMap
            center={center}
            zoom={5}
            mapContainerStyle={{ width: "60vw", height: "80vh" }} >
            {markPoints()}
        </GoogleMap >
    ) : (<p>Mapa não carregado</p>)
}

export default MapaOcorrencia