import { OcorrenciaInterface } from "./ocorrenciaInterface";
import InputMask from 'react-input-mask';
import { validateDataOcorrencia, validateDescricao } from "./validate";
import { useState, useEffect } from "react";

interface categoriaInterface {
    id: number;
    nome_categoria: string;
}

export default function Etapa2({ ocorrencia, setOcorrencia, validacoes, setValidacoes }: any) {
    const [categorias, setCategorias] = useState<categoriaInterface[]>([]);

    const handleChange = (field: string, value: string) => {
        if(field ==="categoriaId"){
            const numCategoria = parseInt(value);
            setOcorrencia((prev: OcorrenciaInterface) => ({
                ...prev,
                [field]: numCategoria,
            }));
            return;
        }

        setOcorrencia((prev: OcorrenciaInterface) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleBlur = (campo: string) => {
        if (campo == "descricao") {
            setValidacoes({
                ...validacoes,
                descricaoValida: validateDescricao(ocorrencia.descricao),
            });
        }
        if (campo == "dataOcorrencia") {
            setValidacoes({
                ...validacoes,
                dataOcorrenciaValida: validateDataOcorrencia(ocorrencia.dataOcorrencia),
            });
        }
    }


    useEffect(() => {
        fetch('https://pmc.airsoftcontrol.com.br/ocorrencias/categorias')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCategorias(data);
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            // Converte FileList em Array e adiciona ao estado
            const filesArray = Array.from(event.target.files);
            setOcorrencia((prev: any) => ({
                ...prev,
                arquivos: [...prev.arquivos, ...filesArray]
            }));
        }
    };

    return (
        <>
            <p className="title is-spaced">Dados da Denúncia</p>
            <label className="subtitle is-5">Data da ocorrência:</label>
            <div className="field pt-2 mb-3 columns">
                <p className="control column is-one-third">
                    <InputMask
                        mask="99/99/9999"
                        id="inputDate"
                        className="input is-success is-medium has-text-centered"
                        type="text"
                        value={ocorrencia.dataOcorrencia}
                        onChange={event => handleChange("dataOcorrencia", event.target.value)}
                        onBlur={event => handleBlur("dataOcorrencia")} />
                    {!validacoes.dataOcorrenciaValida && <p className="mt-2 subtitle is-5 has-text-danger">Data inválida.</p>}
                </p>
            </div>
            <label className="subtitle is-5">Categoria:</label>
            <div className="field mt-2 mb-5">
                <div className="select is-success is-fullwidth is-medium">
                    <select id="meuSelect" value={ocorrencia.categoriaId} onChange={event => handleChange("categoriaId", event.target.value)}>
                        {categorias.length>0 ? categorias.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nome_categoria}
                            </option>
                        )) : <option disabled>Carregando as categorias...</option>}
                    </select>
                </div>
            </div>
            <label className="subtitle is-5">Descrição:</label>
            <div className="field mt-2 mb-5">
                <textarea value={ocorrencia.descricao} onBlur={event => handleBlur("descricao")} onChange={event => handleChange("descricao", event.target.value)} className="textarea is-success is-medium"></textarea>
                {!validacoes.descricaoValida && <p className="mt-2 subtitle is-5 has-text-danger">Campo obrigatório.</p>}
            </div>
            <label className="subtitle is-5">Arquivos:</label>
            <div className="field mt-2 mb-5">
                <div className="file is-success is-medium has-name is-fullwidth">
                    <label className="file-label">
                        <input className="file-input" type="file" name="resume" multiple onChange={handleFileChange} />
                        <span className="file-cta">
                            <span className="file-icon">
                                <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label"> Escolha os arquivos </span>
                        </span>
                        <span className="file-name"> {
                            Array.isArray(ocorrencia.arquivos) && ocorrencia.arquivos.length > 0
                                ? ocorrencia.arquivos.map((file: File) => file.name).join(", ")
                                : "Nenhum arquivo selecionado"
                        } </span>
                    </label>
                </div >
            </div>
        </>
    )
}
