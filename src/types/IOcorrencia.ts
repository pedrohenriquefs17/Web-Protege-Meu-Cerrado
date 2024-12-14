interface IOcorrencia {
    id: number
    id_user: number
    id_categoria: number
    id_status: number
    nome: any
    email: any
    cpf: any
    telefone: any
    dt_nasc: any
    descricao: string
    is_anon: boolean
    dt_ocorrencia: string
    lat: string
    lon: string
}

export default IOcorrencia