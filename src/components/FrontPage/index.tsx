import Carousel from "components/Carousel"
import { FrontPageBlock } from "components/FrontPageBlock"
import { Funcionalidade } from "components/Funcionalidade"
import { Texto } from "components/Texto"
import { VideoPlayer } from "components/VideoPlayer"

export const FrontPage = () => {
    return (
        <main className="px-20">

            <FrontPageBlock>
                <VideoPlayer videoUrl="https://www.youtube.com/watch?v=T92VCbyedMU" />
                <Texto titulo="Sobre o projeto" texto="O Protege Meu Cerrado é uma plataforma desenvolvida pela Startup MAX17 em parceria com alunos do curso de Análise e Desenvolvimento de Sistema do Instituto Federal do Triangulo Mineiro - IFTM para ajudar na preservação do Cerrado. Com ele, você pode relatar problemas ambientais em tempo real e contribuir para a proteção desse bioma único." />
            </FrontPageBlock>


            <div className="columns">
                <Funcionalidade image="/images/report.svg" titulo="Relatar Problema Ambiental" texto="Envie relatos sobre problemas ambientais que atingem sua comunidade" />
                <Funcionalidade image="/images/add-image.svg" titulo="Enviar Fotos e Localização" texto="Envie fotos e a localização do ato" />
                <Funcionalidade image="/images/notification.svg" titulo="Notificação Automática" texto="Notifique as autoridades competentes com poucos toques" />
                <Funcionalidade image="/images/checklist.svg" titulo="Rastreamento de Relatos" texto="Acompanhe o status dos seus relatos e veja as ações tomadas" />
            </div>

            <FrontPageBlock>
                <Texto titulo="Compromisso com a comunidade" texto="O Cerrado é o berço das águas do Brasil, essencial para o abastecimento de milhões de pessoas, a produção de alimentos e a biodiversidade. Sua preservação ajuda a combater as mudanças climáticas, protege comunidades tradicionais e garante o equilíbrio ambiental. Cuidar do Cerrado é cuidar da sociedade, da vida e do futuro do planeta. Juntos, podemos alinhar desenvolvimento sustentável e conservação, promovendo um mundo mais justo e equilibrado." />
                <Carousel images={["/carouselFrontPage/cerrado1.jpeg", "/carouselFrontPage/cerrado2.jpeg"]} />
            </FrontPageBlock>
        </main>
    )
}