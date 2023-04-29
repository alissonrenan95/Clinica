import React, { useContext, useEffect, useState } from 'react'
import { findAll, newPaciente } from '../../services/PacienteServices';
import {FaEye, FaPlus, FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import PacienteContext from '../../context/PacienteContext';
import { convertCpfNumberToFormattedString, validateCpf } from '../../services/Utils';
import { Paciente } from '../../dto/Paciente';
import { SocketConnection } from '../../dto/SocketConnection';
import { joinRoom, sendMessage } from '../../services/SocketConnection';


const PacientePage = () => {
    const [pacientes,setPacientes]=useState<Paciente[]>([]);
    const navigate=useNavigate();
    const {setPaciente}=useContext<any>(PacienteContext);
    const [cpf, setCpf]=useState<string>("");
    
    useEffect(()=>{
        buscarPacientes();


        
        //gerarMonitor();
    },[])


    function buscarPacientes(){
        findAll().then((response)=>{
            if(response.status!==400 && response.status!==404){
                setPacientes(response.data || []);
            }
        });
    }

  return (
    
    <main>
        <h1>Pacientes</h1>
        <div>
            <label htmlFor="pesquisapaciente">Pesquisar por CPF: </label>
            <input type="text" placeholder='12345678900' value={cpf} onChange={(e)=>setCpf(e.target.value)}/>
            <button onClick={()=>alert((validateCpf(cpf))?"Válido":"Inválido")}><FaSearch/> Pesquisar</button>
            <button onClick={()=>navigate("novo")}><FaPlus/> Novo</button>
        </div>
        <br/>
        <table>
            <tbody>
            <tr>
                <th>CPF</th>
                <th>Nome</th>
                <th>Data Nascimento</th>
                <th>Telefone</th>
                <th></th>
            </tr>
            {(pacientes?.map(paciente=>(
                <tr>
                    <td>{convertCpfNumberToFormattedString(paciente.cpf)}</td>
                    <td>{paciente.nome}</td>
                    <td>{new Date(paciente?.datanascimento).toLocaleString("pt-BR").substring(0,10)}</td>
                    <td>{paciente.telefone}</td>
                    <td><button onClick={()=>{setPaciente(paciente); navigate(paciente.id+"/Atendimento/")}}><FaEye/> Atendimentos</button></td>
                </tr>)
            ))}
            </tbody>
        </table>
        

    </main>
  )
}

export default PacientePage;