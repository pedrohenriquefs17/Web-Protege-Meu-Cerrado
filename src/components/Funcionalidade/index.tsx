interface IFuncionalidade {
    image: string
    titulo: string
    texto: string
}

export const Funcionalidade = ({ image, texto, titulo }: IFuncionalidade) => {
    return (
        <section className="message column" style={{height: "100%"}}>
            <figure className="image container is-128x128">
                <img src={image}></img>
            </figure>
            <div className="message-body">
                <h4 className="subtitle is-size-4 has-text-centered">{titulo}</h4>
                <p className="has-text-centered">{texto}</p>
            </div>
        </section>
    )
}