import { OcorrenciaInterface } from "./ocorrenciaInterface";
import InputMask from 'react-input-mask';
import { validateDataOcorrencia, validateDescricao } from "./validate";

export default function Etapa2({ ocorrencia, setOcorrencia, validacoes, setValidacoes }: any) {

    const handleChange = (field: string, value: string) => {
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
                    <select value={ocorrencia.categoria} onChange={event => handleChange("categoria", event.target.value)}>
                        <option value="Queimadas e incendios">Queimadas e Incêndios</option>
                        <option value="Inundacoes e enchentes">Inundações e Enchentes</option>
                        <option value="exploracao e atividades ilegais">Exploração e Atividades Ilegais</option>
                        <option value="Poluicao hidrica">Poluição Hídrica</option>
                        <option value="Poluicao do solo">Poluição do Solo</option>
                        <option value="Poluicao do ar">Poluição do Ar</option>
                        <option value="Ameaca a fauna">Ameaça à Fauna</option>
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