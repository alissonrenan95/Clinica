import React, { useEffect, useState } from 'react'
import { classificarFrequenciaCardiaca, classificarFrequenciaRespiratoria, classificarPressaoDiastolica, classificarPressaoSistolica, classificarTemperaturaCelsius, convertBooleanToString } from "../../services/Utils"
import { useNavigate, useParams } from 'react-router-dom';
import { Examegeral } from '../../dto/Examegeral';
import { Atendimento } from '../../dto/Atendimento';
import { Paciente } from '../../dto/Paciente';
import { findByPacienteId, findExamegeralByPacienteIdAndAtendimentoId } from '../../services/PacienteServices';
import { findAtendimentoById, findExamegeralByAtendimentoId } from '../../services/AtendimentoServices';
import Grid from '../../components/Grid';

const ExamegeralPage = () => {
    const navigate = useNavigate();
    const [pagenumber, setPagenumber] = useState<number>(1);
    const { pacienteid } = useParams();
    const { atendimentoid } = useParams();
    const [paciente, setPaciente] = useState<Paciente>();
    const [atendimento, setAtendimento] = useState<Atendimento>();
    const [examesgeral, setExamesgeral] = useState<Examegeral[]>([]);


    useEffect(() => {
        buscarExamesgeral();
    }, [pagenumber]);

    const buscarExamesgeral = async () => {
        try {
            let idpaciente = Number(pacienteid);
            let idatendimento = Number(atendimentoid);
            let response;
            if (idatendimento) {
                if (idpaciente) {
                    response = await findExamegeralByPacienteIdAndAtendimentoId(idpaciente, idatendimento);
                }
                else {
                    response = await findExamegeralByAtendimentoId(idatendimento);
                }
                if (response.status === 200) {
                    setExamesgeral(response.data);
                    if (response.data) {
                        if (response.data[0].concluido) {
                            if (response.data[0].atendimento) {
                                setAtendimento(response.data[0].atendimento);
                                if (response.data[0].atendimento.paciente) {
                                    setPaciente(response.data[0].atendimento.paciente);
                                }
                                else {
                                    setPaciente((await findByPacienteId(response.data[0].atendimento.pacienteid)).data[0]);
                                }
                            }
                            else {
                                let responseatendimento = await findAtendimentoById(Number(response.data[0].atendimentoid));
                                setAtendimento(responseatendimento.data[0]);
                                if (responseatendimento.data[0].paciente) {
                                    setPaciente(responseatendimento.data[0].paciente);
                                }
                                else {
                                    if (responseatendimento.data[0]) {
                                        setPaciente((await findByPacienteId(responseatendimento.data[0].pacienteid)).data[0]);
                                    }
                                }
                            }
                        }
                        else {
                            navigate("" + response.data[0].id, { replace: true });
                        }
                    }

                }
            }
            else {
                //response=await findExamesgeral();
            }
        }
        catch (exception) {

        }

    }

    function convertExamegeralDataToGrid(datagrid: Examegeral[]) {

        let dadosconvertidos: any[][][] = [[[]]];
        try {
            datagrid.map((examegeral) => {
                let objlinhas = [];
                let linha0 = [
                    classificarPressaoSistolica(examegeral.pressaosistolica),
                    classificarPressaoDiastolica(examegeral.pressaodiastolica),
                    (paciente) ? classificarFrequenciaCardiaca(examegeral.pulsacao, paciente.datanascimento) : "",
                    classificarFrequenciaRespiratoria(examegeral.respiracao),
                    classificarTemperaturaCelsius(examegeral.temperatura),
                    ""
                ];
                let linha1 = [
                    examegeral.pressaosistolica,
                    examegeral.pressaodiastolica,
                    examegeral.pulsacao,
                    examegeral.respiracao,
                    examegeral.temperatura,
                    convertBooleanToString(examegeral.concluido)
                ];
                objlinhas = [linha0,linha1];
                dadosconvertidos[dadosconvertidos.length] = objlinhas;
            });
        }
        catch (exception) {
            dadosconvertidos = [[[]]];
        }
        return dadosconvertidos;
    }


    return (
        <main>
            <h1>Exame Geral</h1>
            <br />

            <p>Paciente: {paciente?.nome}</p>
            <p>Data atendimento: {(atendimento) ? new Date(atendimento?.datahoraatendimento).toLocaleString("pt-BR") : ""} </p>


            <br />
            <Grid headers={[["Pressão Sistólica","Pressão Diastólica","Pulsação","Respiração","Temperatura","Concluído"]]} datagrid={convertExamegeralDataToGrid(examesgeral)}/>
            
            {/*
        <table>
            <thead>
                <tr>
                    <th>Pressão Sistólica</th>
                    <th>Pressão Diastólica</th>
                    <th>Pulsação</th>
                    <th>Respiração</th>
                    <th>Temperatura</th>
                    <th>Concluído</th>
                </tr>
            </thead>
            <tbody>
            
            {(examesgeral.map(examegeral=>(
                <>
                    <tr style={{background:"#BBBBBB"}}>
                        <td>{classificarPressaoSistolica(examegeral.pressaosistolica)}</td>
                        <td>{classificarPressaoDiastolica(examegeral.pressaodiastolica)}</td>
                        <td>{(paciente)?classificarFrequenciaCardiaca(examegeral.pulsacao, paciente.datanascimento):""}</td>
                        <td>{classificarFrequenciaRespiratoria(examegeral.respiracao)}</td>
                        <td>{classificarTemperaturaCelsius(examegeral.temperatura)}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{examegeral.pressaosistolica}</td>
                        <td>{examegeral.pressaodiastolica}</td>
                        <td>{examegeral.pulsacao}</td>
                        <td>{examegeral.respiracao}</td>
                        <td>{examegeral.temperatura}</td>
                        <td>{(examegeral.concluido)?"Sim":"Não"}</td>
                    </tr>
                </>)
            ))}
            </tbody>
        </table>
            */}


        </main>
    )

}

export default ExamegeralPage;