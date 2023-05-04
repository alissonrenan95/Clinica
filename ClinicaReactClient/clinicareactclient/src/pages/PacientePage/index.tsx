import React, { useEffect, useState } from 'react'
import { findAll, findAllByPagination, findByPacienteCpf} from '../../services/PacienteServices';
import {FaArrowLeft, FaArrowRight, FaEye, FaPlus, FaSearch, FaWindowClose} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
//import PacienteContext from '../../context/PacienteContext';
import { convertCpfNumberToFormattedString, formatarCpf, validateCpf } from '../../services/Utils';
import { Paciente } from '../../dto/Paciente';
import InputMask from 'react-input-mask';
import { URL_BASE_ATENDIMENTO, URL_BASE_PACIENTE } from '../../services/Api';


const PacientePage = () => {
    const [pagenumber, setPagenumber]=useState<number>(1);
    const paginationsize=15;
    const [pacientes,setPacientes]=useState<Paciente[]>([]);
    const navigate=useNavigate();
    const [cpf, setCpf]=useState<string>("");
    
    useEffect(()=>{
        buscarPacientes();
    },[pagenumber]);

    async function buscarPacientes(){
        if(pagenumber>=1){
            let dados=(await findAllByPagination(pagenumber, paginationsize)).data;
            if(dados.length===0){
                setPagenumber(pagenumber-1);
            }
            else{
                setPacientes(dados);
            }
        }
    }

    async function buscarPacientePorCpf(cpf:string){
        if(validateCpf(cpf)){
            setPacientes((await findByPacienteCpf(Number(cpf))).data);
        }
        else{
            alert("CPF Inválido");
        }
    }

  return (
    
    <main>
        <h1>Pacientes</h1>
        <div><button onClick={()=>navigate("/"+URL_BASE_PACIENTE+"novo")}><FaPlus/> Novo</button></div>
        <div>
            <label htmlFor="pesquisapaciente">Pesquisar por CPF: </label>
            <InputMask mask='999.999.999-99' value={cpf} onChange={(e:any)=>setCpf(e.target.value)}/>
            <button onClick={()=>buscarPacientePorCpf(cpf.replace('.','').replace('.','').replace('-',''))}><FaSearch/> Pesquisar</button>
            <button onClick={()=>{(pagenumber===1)?buscarPacientes():setPagenumber(1)}}><FaWindowClose/> Redefinir</button>
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
            {pacientes?.map(paciente=>(
                <tr key={paciente.id}>
                    <td>{convertCpfNumberToFormattedString(paciente.cpf)}</td>
                    <td>{paciente.nome}</td>
                    <td>{new Date(paciente?.datanascimento).toLocaleString("pt-BR").substring(0,10)}</td>
                    <td>{paciente.telefone}</td>
                    <td>
                        <button onClick={()=>{navigate("/"+URL_BASE_PACIENTE+paciente.id)}}><FaEye/> Editar</button>
                        <button onClick={()=>{navigate("/"+URL_BASE_PACIENTE+paciente.id+"/"+URL_BASE_ATENDIMENTO)}}><FaEye/> Atendimentos</button>
                    </td>
                </tr>)
            )}
            </tbody>
        </table>
        <div>
            <button onClick={()=>(pagenumber>1)?setPagenumber(pagenumber-1):""}><FaArrowLeft/></button>
            <button onClick={()=>setPagenumber(pagenumber+1)}><FaArrowRight/></button>
        </div>
        

    </main>
  )
}

export default PacientePage;