export interface OcorrenciaInterface {
    nome: string;
    email: string;
    dataNascimento: string;
    cpf: string;
    telefone: string;
    anonimo: boolean;
    dataOcorrencia: string;
    categoriaId: number;
    descricao: string;
    arquivos: File[];
    lat: string;
    lng: string;
}