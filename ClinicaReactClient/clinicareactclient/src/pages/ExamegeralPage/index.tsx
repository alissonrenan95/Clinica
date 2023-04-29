import React, { useContext, useEffect, useState } from 'react'
import {classificarFrequenciaCardiaca,classificarFrequenciaRespiratoria,classificarPressaoDiastolica,classificarPressaoSistolica,classificarTemperaturaCelsius} from "../../services/Utils"
import { useNavigate, useParams } from 'react-router-dom';
import { findAtendimentosByPacienteId, findByPacienteId, findExamegeralPacienteIdAndAtendimentoId, findExamesgeral } from '../../services/PacienteServices';
import PacienteContext from '../../context/PacienteContext';
import { Examegeral } from '../../dto/Examegeral';
import { Atendimento } from '../../dto/Atendimento';

const ExamegeralPage = () => {
    const navigate=useNavigate();
    const {pacienteid}=useParams();
    const {atendimentoid}=useParams();
    const {paciente,setPaciente}=useContext<any>(PacienteContext);
    //const [paciente,setPaciente]=useState();
    const [atendimento,setAtendimento]=useState<Atendimento>();
    const [examesgeral, setExamesgeral]=useState<Examegeral[]>([]);

    useEffect(()=>{
        if(pacienteid){
                findByPacienteId(Number(pacienteid)).then((response)=>{
                    if(response.status!==400 && response.status!==404){
                        if(response?.data[0]){
                            setPaciente(response.data[0]);
                        }
                    }
                });
                findAtendimentosByPacienteId(Number(pacienteid)).then((response)=>{
                    if(response.status!==400 && response.status!==404){
                        if(response?.data){
                            setAtendimento(response.data[0]);
                        }
                    }
                });
        }
        
        
        if(paciente){
            let pacienteid=paciente.id;
            findExamegeralPacienteIdAndAtendimentoId(Number(pacienteid), Number(atendimentoid)).then((response)=>{
                if(response.status!==400 && response.status!==404){
                    if(response.data){
                        setExamesgeral(response.data);
                    }
                }
            });
        }
        else{
            findExamesgeral().then((response)=>{
                if(response.status!==400 && response.status!==404){
                    if(response.data){
                        setExamesgeral(response.data);
                    }
                }
            });
        }
    },[])


  return (
    <main>
        <h1>Exame Geral</h1>
        <br/>
        
        <p>Paciente: {paciente?.nome}</p>
        <p>Data atendimento: {(atendimento)?new Date(atendimento?.datahoraatendimento).toLocaleString("pt-BR"):""} </p>
        
        
        <br/>
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
                        <td>{classificarFrequenciaCardiaca(examegeral.pulsacao, paciente.datanascimento)}</td>
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

export default ExamegeralPage;