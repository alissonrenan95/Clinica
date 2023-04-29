import React from 'react'
import ExamegeralPage from '../ExamegeralPage'
import { useNavigate, useParams } from 'react-router-dom'
import { findAtendimentoByPacienteIdAndAtendimentoId, findByPacienteId, findExamegeralPacienteIdAndAtendimentoId } from '../../services/PacienteServices';
import { useState } from 'react';
import { useEffect } from 'react';
import { classificarFrequenciaCardiaca, classificarFrequenciaRespiratoria, classificarPressaoDiastolica, classificarPressaoSistolica, classificarTemperaturaCelsius } from '../../services/Utils';
import { Atendimento } from '../../dto/Atendimento';
import { Examegeral } from '../../dto/Examegeral';
import { Paciente } from '../../dto/Paciente';

const AtendimentoDetailPage = () => {
  const {atendimentoid, pacienteid}=useParams();
  const [paciente, setPaciente]=useState<Paciente>();
  const [atendimentos, setAtendimentos]=useState<Atendimento[]>([]);
  const [examesgeral, setExamesgeral]=useState<Examegeral[]>([]);
  const navigate=useNavigate();
    useEffect(()=>{
        try{
            if(pacienteid && atendimentoid){
                findExamegeralPacienteIdAndAtendimentoId(Number(pacienteid), Number(atendimentoid)).then((response)=>{
                    if(response.status!==400 && response.status!==404){
                        if(response.data){
                            setExamesgeral(response.data);
                            findAtendimentoByPacienteIdAndAtendimentoId(Number(pacienteid), Number(atendimentoid)).then((response)=>{
                                if(response.status!==400 && response.status!==404){
                                    if(response.data){
                                        setAtendimentos(response.data);
                                        
                                        findByPacienteId(Number(pacienteid)).then((response)=>{
                                            if(response.status!==400 && response.status!==404){
                                                if(response?.data[0]){
                                                    setPaciente(response.data[0]);
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
            else{
                navigate("/Atendimento");
            }
        }
        catch(e){
            navigate("/Atendimento");
        }
    },[]);


  return (
    <main>
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
    </main>
  )
}

export default AtendimentoDetailPage;