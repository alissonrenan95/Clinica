import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { findAtendimentos, findAtendimentosByPacienteId, findAtendimentosByPagination, findByPacienteId, newAtendimentoByPaciente} from '../../services/PacienteServices';
import { FaArrowLeft, FaArrowRight, FaBars, FaBookOpen, FaCheck, FaCheckCircle, FaCircle, FaExclamationCircle, FaEye, FaPlus } from 'react-icons/fa';
import { Atendimento } from '../../dto/Atendimento';
import { URL_BASE_ATENDIMENTO, URL_BASE_EXAMECOVID, URL_BASE_EXAMEGERAL, URL_BASE_PACIENTE } from '../../services/Api';
import { Paciente } from '../../dto/Paciente';
import { updateAtendimento } from '../../services/AtendimentoServices';

const AtendimentoPage = () => {
    const [pagenumber, setPagenumber]=useState<number>(1);
    const paginationsize=15;
    const navigate=useNavigate();
    const {pacienteid}=useParams();
    const [paciente,setPaciente]=useState<Paciente>();
    const [atendimentos, setAtendimentos]=useState<Atendimento[]>([]);


    useEffect(()=>{
        buscarAtendimentos(Number(pacienteid));
    },[pagenumber]);


    async function buscarAtendimentos(idpaciente:number){
        if(pagenumber>=1){
            if(idpaciente){
                setPaciente((await findByPacienteId(Number(idpaciente))).data[0]);
                setAtendimentos((await findAtendimentosByPacienteId(Number(idpaciente),pagenumber, paginationsize)).data);
            }
            else{
                let dados=(await findAtendimentosByPagination(pagenumber, paginationsize)).data;
                if(dados.length===0){
                    setPagenumber(pagenumber-1);
                }
                else{
                    setAtendimentos(dados);
                }
            }
        }
    }


    const handleNewAtendimentoByPaciente=async (idpaciente:any)=>{
        if(idpaciente){
            try{
                let retorno = (await newAtendimentoByPaciente(idpaciente)).data;
                if(retorno===true){
                    alert("Atendimento solicitado com sucesso, aguarde");
                    if(pagenumber>1){
                        setPagenumber(1);
                    }
                    else{
                        buscarAtendimentos(Number(idpaciente));
                    }
                    //sendMessage(pacienteid);
                }
                else{
                    alert("Erro ao solicitar atendimento, o paciente possui atendimento em aberto");
                }
            }
            catch(exception ){
                alert("Erro ao solicitar atendimento");
            }
        }
        else{
            navigate("/"+URL_BASE_ATENDIMENTO+"Novo");
        }
    }

    const handleFinalizarAtendimento=async (atendimento:Atendimento)=>{
        atendimento.concluido=true;
        try{
            let response=await updateAtendimento(atendimento);
            if(response.data==true){
                alert("Atendimento finalizado com sucesso");
                buscarAtendimentos(Number(pacienteid));
            }
            else{
                alert("Erro ao finalizar atendimento");
            }
        }
        catch(exception){
            alert("Erro ao finalizar atendimento");
        }
        
    }

  return (
    <main>
        <div>
        <h1>Atendimentos</h1>
        {(paciente)?<p>Paciente: {paciente?.nome}</p>:<></>}
        <button onClick={()=>handleNewAtendimentoByPaciente(pacienteid)}><FaPlus/> Solicitar Atendimento</button>
        </div>
        <br/>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Data</th>
                    {(!paciente)?<th>Paciente</th>:<></>}
                    <th>Concluido</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            
            {(atendimentos?.map(atendimento=>(
                <tr key={atendimento.id} >
                    <td>{atendimento.id}</td>
                    <td>{new Date(atendimento?.datahoraatendimento).toLocaleString("pt-BR")}</td>
                    {(!paciente)?<td>{atendimento?.paciente?.nome}</td>:<></>}
                    <td><p style={{color:((atendimento.concluido)?"#00FF00":"#F2BE22"), fontSize:"2rem", margin:"0 auto"}}>{(atendimento.concluido)?<FaCheckCircle/>:<FaExclamationCircle/>}</p></td>
                    <td className="menutabela">
                        <div className="dropdown">
                            <button className="dropbtn"><FaBars/></button>
                            <div className="dropdown-content">
                                {(!atendimento?.concluido)?(atendimento?.examegerals)?(!atendimento.examegerals[0].concluido)?<></>:<Link to={"/"+URL_BASE_PACIENTE+atendimento.pacienteid+"/"+URL_BASE_ATENDIMENTO+atendimento.id+"/"+URL_BASE_EXAMEGERAL}><FaEye/> Exame Geral</Link>:<Link to={"/"+URL_BASE_PACIENTE+atendimento.pacienteid+"/"+URL_BASE_ATENDIMENTO+atendimento.id+"/"+URL_BASE_EXAMEGERAL}><FaEye/> Exame Geral</Link>:<></>}
                                {(!atendimento?.concluido)?(atendimento?.examecovids)?(atendimento.examecovids[0].concluido)?<></>:<Link to={"/"+URL_BASE_PACIENTE+atendimento.pacienteid+"/"+URL_BASE_ATENDIMENTO+atendimento.id+"/"+URL_BASE_EXAMECOVID}><FaEye/> Exame Covid</Link>:<Link to={"/"+URL_BASE_PACIENTE+atendimento.pacienteid+"/"+URL_BASE_ATENDIMENTO+atendimento.id+"/"+URL_BASE_EXAMECOVID}><FaEye/> Exame Covid</Link>:<></>}
                                {((!atendimento?.concluido) && ((atendimento?.examegerals && atendimento.examegerals[0].concluido)))?<Link to="" onClick={()=>{handleFinalizarAtendimento(atendimento)}}><FaCheck/> Finalizar</Link>:<></>}
                                {(atendimento?.concluido)?<Link to={"/"+URL_BASE_PACIENTE+atendimento.pacienteid+"/"+URL_BASE_ATENDIMENTO+atendimento.id}><FaBookOpen/> Detalhes</Link>:<></>}
                            </div>
                        </div>


                    </td>
                </tr>)
            ))}
            </tbody>
        </table>
        <div>
            <button onClick={()=>(pagenumber>1)?setPagenumber(pagenumber-1):""}><FaArrowLeft/></button>
            <button onClick={()=>setPagenumber(pagenumber+1)}><FaArrowRight/></button>
            
        </div>
    </main>
  )
}

export default AtendimentoPage;