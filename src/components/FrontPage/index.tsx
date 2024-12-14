"use client"

import ApiInfo from "components/ApiInfo"
import { Blog } from "components/Blog"
import CarouselWrapper from "components/Carousel/CarouselWraper"
import FlexWrapper from "components/FlexWrapper"
import Footer from "components/Footer"
import { Funcionalidade } from "components/Funcionalidade"
import { Header } from "components/Header"
import LinearWrapper from "components/LinearWrapper"
import MapaOcorrencia from "components/MapaOcorrencia"
import { Texto } from "components/Texto"
import { VideoPlayer } from "components/VideoPlayer"
import { useEffect, useState } from "react"
import GET from "service/api/GET"

const FrontPage = () => {
    const [qtdUser, setQtdUser] = useState<number>(0)

    useEffect(() => {
        const fetchQtdUsuarios = async () => {
            try {
                const response = await GET({
                    url: "https://pmc.airsoftcontrol.com.br/pmc/admin/quantidadeUsuarios"
                })
                setQtdUser(response)
            } catch (error) {
                // TODO: CRIAR UM TOAST DE ERROR
                console.error(error)
            }
        }

        fetchQtdUsuarios()
    }, [])

    return (
        <main className="px-20 bg-secondaryGray text-black primaryFont">
            <Header />
            <CarouselWrapper />

            <FlexWrapper>
                <VideoPlayer videoUrl="https://www.youtube.com/watch?v=T92VCbyedMU " />
                <Texto titulo="Sobre o projeto" texto="O Protege Meu Cerrado é uma plataforma desenvolvida pela Startup MAX17 em parceria com alunos do curso de Análise e Desenvolvimento de Sistema do Instituto Federal do Triangulo Mineiro - IFTM para ajudar na preservação do Cerrado. Com ele, você pode relatar problemas ambientais em tempo real e contribuir para a proteção desse bioma único." />
            </FlexWrapper>

            <FlexWrapper>
                <LinearWrapper>
                    <ApiInfo icon="mdi:user" title="Usuários cadastrados" text={qtdUser} />
                    <ApiInfo icon="el:ok" title="Ocorrências finalizadas" text={"?"} />
                    <ApiInfo icon="mdi:hourglass" title="Ocorrências em andamento" text={"?"} />
                    <ApiInfo icon="mdi:hourglass" title="Ocorrências em andamento" text={"?"} />
                </LinearWrapper>
                <MapaOcorrencia />
            </FlexWrapper>

            <FlexWrapper>
                <Funcionalidade image="/images/report.svg" titulo="Relatar Problema Ambiental" texto="Envie relatos sobre problemas ambientais que atingem sua comunidade" />
                <Funcionalidade image="/images/add-image.svg" titulo="Enviar Fotos e Localização" texto="Envie fotos e a localização do ato junto da sua denúncia" />
                <Funcionalidade image="/images/notification.svg" titulo="Notificação Automática" texto="Notifique as autoridades competentes com poucos toques" />
                <Funcionalidade image="/images/checklist.svg" titulo="Rastreamento de Relatos" texto="Acompanhe o status dos seus relatos e veja as ações tomadas" />
            </FlexWrapper>

            <FlexWrapper>
                <Texto titulo="Compromisso com a comunidade" texto="O Cerrado é o berço das águas do Brasil, essencial para o abastecimento de milhões de pessoas, a produção de alimentos e a biodiversidade. Sua preservação ajuda a combater as mudanças climáticas, protege comunidades tradicionais e garante o equilíbrio ambiental. Cuidar do Cerrado é cuidar da sociedade, da vida e do futuro do planeta. Juntos, podemos alinhar desenvolvimento sustentável e conservação, promovendo um mundo mais justo e equilibrado." />
            </FlexWrapper>
            
            <Footer />
        </main>
    )
}

export default FrontPage