import React from 'react'
import ExamegeralPage from '../ExamegeralPage'
import { useNavigate, useParams } from 'react-router-dom'
import { findAtendimentoByPacienteIdAndAtendimentoId, findByPacienteId, findExamegeralByPacienteIdAndAtendimentoId } from '../../services/PacienteServices';
import { useState } from 'react';
import { useEffect } from 'react';
import { classificarFrequenciaCardiaca, classificarFrequenciaRespiratoria, classificarPressaoDiastolica, classificarPressaoSistolica, classificarTemperaturaCelsius } from '../../services/Utils';
import { Atendimento } from '../../dto/Atendimento';
import { Examegeral } from '../../dto/Examegeral';
import { Paciente } from '../../dto/Paciente';

const AtendimentoDetailPage = () => {
    const { atendimentoid, pacienteid } = useParams();
    const [paciente, setPaciente] = useState<Paciente>();
    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
    const [examesgeral, setExamesgeral] = useState<Examegeral[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        buscarDadosAtendimento();
    }, []);

    async function buscarDadosAtendimento() {
        try {
            if (pacienteid && atendimentoid) {
                let dadosexamegeral = (await findExamegeralByPacienteIdAndAtendimentoId(Number(pacienteid), Number(atendimentoid))).data;
                setExamesgeral(dadosexamegeral || []);
                if (examesgeral.length > 0 && examesgeral[0].atendimento) {
                    setAtendimentos([dadosexamegeral[0].atendimento]);
                }
                else {
                    setAtendimentos((await findAtendimentoByPacienteIdAndAtendimentoId(Number(pacienteid), Number(atendimentoid))).data);
                }
                if (examesgeral.length > 0 && examesgeral[0].atendimento?.paciente) {
                    setPaciente(examesgeral[0].atendimento.paciente);
                }
                else {
                    setPaciente((await findByPacienteId(Number(pacienteid))).data[0]);
                }

            }
            else {
                navigate("/Atendimento");
            }
        }
        catch (e) {
            navigate("/Atendimento");
        }

    }

    return (
        <main>
            <h3>Paciente: {paciente?.nome}</h3>
            <h3>Data do Exame: {(atendimentos.length > 0) ? new Date(atendimentos[0]?.datahoraatendimento).toLocaleDateString() : ""}</h3>

            {(examesgeral.map(examegeral => (
                <table>
                    <tbody>
                        <tr>
                            <th>Pressão Sistólica</th>
                            <th>Pressão Diastólica</th>
                            <th>Pulsação</th>
                            <th>Respiração</th>
                            <th>Temperatura</th>
                            <th>Concluído</th>
                        </tr>

                        <tr style={{ background: "#BBBBBB" }}>
                            <td>{classificarPressaoSistolica(examegeral.pressaosistolica)}</td>
                            <td>{classificarPressaoDiastolica(examegeral.pressaodiastolica)}</td>
                            <td>{(paciente) ? classificarFrequenciaCardiaca(examegeral.pulsacao, paciente.datanascimento) : ""}</td>
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
                            <td>{(examegeral.concluido) ? "Sim" : "Não"}</td>
                        </tr>

                    </tbody>
                </table>
            )))}
        </main>
    )
}

export default AtendimentoDetailPage;