import Link from "next/link";

const Home = () => {
  return (
    <>
      <div>
        <p className="subtitle">TO-DO - PÁGINA INICIAL</p>
        <p className="subtitle">IN PROGRESS - PÁGINA DE CADASTRO DE OCORRÊNCIA</p>
        <Link className="button" href="/cadastro/ocorrencia">Vá para a página de ocorrencia</Link>
      </div>
    </>
  );
}
