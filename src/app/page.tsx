import FrontPage from "components/FrontPage"
import {Maven_Pro} from "next/font/google"

const mavenPro = Maven_Pro({
  subsets: ["latin"]
})

const Home = () => {
  return (
    <div className={mavenPro.className}>
      <FrontPage />
      {/* <Link className="button" href="/cadastro/ocorrencia">Vá para a página de ocorrencia</Link> */}
    </div>
  );
}

export default Home