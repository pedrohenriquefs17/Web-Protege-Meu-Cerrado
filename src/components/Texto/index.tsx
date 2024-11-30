interface ITexto {
    titulo: string
    texto: string
}

export const Texto = ({texto, titulo}: ITexto) => {
    return (
        <article>
            <div className="">
                <h2 className="text-center text-2xl">{titulo}</h2>
                <p className="text-justify text-lg mt-4">{texto}</p>
            </div>
        </article>
    )
}