import Carousel from "components/Carousel"
import { Funcionalidade } from "components/Funcionalidade"
import { Texto } from "components/Texto"
import { VideoPlayer } from "components/VideoPlayer"
import ReactPlayer from 'react-player'

export const FrontPage = () => {
    return (
        <main>
            {/* <Texto titulo="Sobre o projeto" texto="O Protege Meu Cerrado é uma plataforma desenvolvida pela Startup MAX17 em parceria com alunos do curso de Análise e Desenvolvimento de Sistema do Instituto Federal do Triangulo Mineiro - IFTM para ajudar na preservação do Cerrado. Com ele, você pode relatar problemas ambientais em tempo real e contribuir para a proteção desse bioma único." />
            <div className="columns">
                <Funcionalidade image="/images/report.svg" titulo="Relatar Problema Ambiental" texto="Envie relatos sobre problemas ambientais que atingem sua comunidade" />
                <Funcionalidade image="/images/add-image.svg" titulo="Enviar Fotos e Localização" texto="Envie fotos e a localização do ato" />
                <Funcionalidade image="/images/notification.svg" titulo="Notificação Automática" texto="Notifique as autoridades competentes com poucos toques" />
                <Funcionalidade image="/images/checklist.svg" titulo="Rastreamento de Relatos" texto="Acompanhe o status dos seus relatos e veja as ações tomadas" />
            </div>

            <VideoPlayer videoUrl="https://www.youtube.com/watch?v=T92VCbyedMU" /> */}

            <Carousel images={["/images/licensed-image1.jpeg", "/images/notification.svg"]} />
        </main>
    )
}