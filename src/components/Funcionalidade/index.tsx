interface IFuncionalidade {
    image: string
    titulo: string
    texto: string
}

export const Funcionalidade = ({ image, texto, titulo }: IFuncionalidade) => {
    return (
        <section className="w-64 px-2 bg-green-50 border border-black">
            <img className="h-40 mx-auto" src={image}></img>
            <div className="bg-green-200 w-full h-48 text-center text-black">
                <h4 className="text-xl font-semibold py-2">{titulo}</h4>
                <p className="">{texto}</p>
            </div>
        </section>
    )
}