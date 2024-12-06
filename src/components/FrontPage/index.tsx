import ApiInfo from "components/ApiInfo"
import { Blog } from "components/Blog"
import CarouselWrapper from "components/Carousel/CarouselWraper"
import FlexWrapper from "components/FlexWrapper"
import { Funcionalidade } from "components/Funcionalidade"
import { Header } from "components/Header"
import { Texto } from "components/Texto"
import { VideoPlayer } from "components/VideoPlayer"

const FrontPage = () => {
    return (
        <main className="px-20 bg-secondaryGray text-black">
            <Header />

            <FlexWrapper>
                <VideoPlayer videoUrl="https://www.youtube.com/watch?v=T92VCbyedMU " />
                <Texto titulo="Sobre o projeto" texto="O Protege Meu Cerrado é uma plataforma desenvolvida pela Startup MAX17 em parceria com alunos do curso de Análise e Desenvolvimento de Sistema do Instituto Federal do Triangulo Mineiro - IFTM para ajudar na preservação do Cerrado. Com ele, você pode relatar problemas ambientais em tempo real e contribuir para a proteção desse bioma único." />
            </FlexWrapper>

            <FlexWrapper>
                <div className="grid grid-cols-2">
                    <ApiInfo icon="mdi:user" title="Usuários cadastrados" text={1} />
                    <ApiInfo icon="mdi:hourglass" title="Ocorrências em andamento" text={2} />
                    <ApiInfo icon="ic:baseline-info" title="Ocorrências finalizadas" text={3} />
                    <ApiInfo icon="ic:baseline-info" title="Ocorrências finalizadas" text={4} />
                </div>
                <CarouselWrapper />
            </FlexWrapper>

            <FlexWrapper>
                <Funcionalidade image="/images/report.svg" titulo="Relatar Problema Ambiental" texto="Envie relatos sobre problemas ambientais que atingem sua comunidade" />
                <Funcionalidade image="/images/add-image.svg" titulo="Enviar Fotos e Localização" texto="Envie fotos e a localização do ato junto da sua denúncia" />
                <Funcionalidade image="/images/notification.svg" titulo="Notificação Automática" texto="Notifique as autoridades competentes com poucos toques" />
                <Funcionalidade image="/images/checklist.svg" titulo="Rastreamento de Relatos" texto="Acompanhe o status dos seus relatos e veja as ações tomadas" />
            </FlexWrapper>

            <FlexWrapper>
                <Texto titulo="Compromisso com a comunidade" texto="O Cerrado é o berço das águas do Brasil, essencial para o abastecimento de milhões de pessoas, a produção de alimentos e a biodiversidade. Sua preservação ajuda a combater as mudanças climáticas, protege comunidades tradicionais e garante o equilíbrio ambiental. Cuidar do Cerrado é cuidar da sociedade, da vida e do futuro do planeta. Juntos, podemos alinhar desenvolvimento sustentável e conservação, promovendo um mundo mais justo e equilibrado." />
                {/* <CarouselWrapper /> */}
            </FlexWrapper>

            <Blog titulo="Como a agricultura impacta no cerrado?" texto="
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quis id optio tempora dolorem nihil nesciunt delectus rem quia! Possimus sunt ratione sint consequatur sapiente repellendus ex saepe, quaerat necessitatibus?
            Corporis similique quasi iusto et, eligendi molestiae dicta reprehenderit eveniet, maiores ut hic, nihil quibusdam ex. Aperiam consequuntur dolorum, dignissimos quo totam reiciendis aliquid ipsam reprehenderit, mollitia accusamus, placeat eius.
            Magnam doloribus, delectus doloremque unde id ipsam assumenda atque ab sapiente illo ipsa eius reiciendis quasi provident facilis animi ullam deleniti magni architecto dignissimos eligendi eos eum, pariatur fugiat! Aspernatur!"/>
        </main>
    )
}

export default FrontPage