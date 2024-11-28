interface ITexto {
    titulo: string
    texto: string
}

export const Texto = ({texto, titulo}: ITexto) => {
    return (
        <article className="card is-shadowless">
            <div className="card-content">
                <h2 className="title">{titulo}</h2>
                <p className="content">{texto}</p>
            </div>
        </article>
    )
}