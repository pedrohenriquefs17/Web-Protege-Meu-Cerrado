import { FrontPage } from "components/FrontPage";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <div>
        <FrontPage />
        {/* <Link className="button" href="/cadastro/ocorrencia">Vá para a página de ocorrencia</Link> */}
      </div>
    </>
  );
}

export default Home