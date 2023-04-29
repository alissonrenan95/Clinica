import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { findAtendimentos, findAtendimentosByPacienteId, findByPacienteId, newAtendimentoByPaciente} from '../../services/PacienteServices';
import { FaEye, FaPlus } from 'react-icons/fa';
import PacienteContext from '../../context/PacienteContext';
import { HubConnectionBuilder, HubConnection,LogLevel } from '@microsoft/signalr';
import { Atendimento } from '../../dto/Atendimento';
import { SocketConnection } from '../../dto/SocketConnection';

const AtendimentoPage = () => {
    const navigate=useNavigate();
    const {pacienteid}=useParams();
    const {paciente, setPaciente}=useContext<any>(PacienteContext);
    const [atendimentos, setAtendimentos]=useState<Atendimento[]>([]);
    const [connection, setConnection]=useState<HubConnection>();
    const [messages, setMessages]=useState<any[]>();
    const [users, setUsers]=useState<any[]>();

    useEffect(()=>{
        /*findByPacienteId(pacienteid).then((response)=>{
            if(response.status!==400 && response.status!==404){
                if(response?.data[0]){
                    setPaciente(response.data[0]);
                }
            }
        });*/
        if(pacienteid){
            findAtendimentosByPacienteId(Number(pacienteid)).then((response)=>{
                if(response.status!==400 && response.status!==404){
                    if(response.data){
                        setAtendimentos(response.data);
                    }
                }
            });
        }
        else{
            findAtendimentos().then((response)=>{
                if(response.status!==400 && response.status!==404){
                    if(response.data){
                        setAtendimentos(response.data);
                    }
                }
            });
            
        }
        joinRoom(new Date().toLocaleDateString("pt-BR"),"atendimentos");
        
        

    },[])


    function buscarPaciente(idpaciente:number){
        findByPacienteId(idpaciente).then((response)=>{
            if(response.status!==400 && response.status!==404){
                if(response?.data[0]){
                    setPaciente(response.data[0]);
                }
            }
        });
    }

    
    const joinRoom = async (user:string, room:string)=>{
        try{
            const connection = new HubConnectionBuilder().withUrl("https://192.168.0.10:7102/ws/atendimentos").configureLogging(LogLevel.Information).build();
            connection.on("UsersInRoom",(users)=>{
                setUsers(users);
            })
            connection.on("ReceiveMessage", (user, message)=>{
                findAtendimentos().then((response)=>{
                    if(response.status!==400 && response.status!==404){
                        if(response.data){
                            setAtendimentos(response.data);
                        }
                    }
                });
                //setAtendimentos(messages=>[...messages, {user, message}])
                
                //console.log("message received: ", message);
            });
            
            connection.onclose(e=>{
                setConnection(undefined);
                setMessages([]);
                setUsers([]);
            })
            await connection.start();
            
            await connection.invoke("JoinRoom", {user, room});
            
            setConnection(connection);
        }
        catch(e){
            console.log(e);
        }
    }


    const configureConnectionListener=(connection:HubConnection)=>{

    }

    const closeConnection = async()=>{
        try{
            await connection?.stop();
        }
        catch(e){

        }
    }

    const sendMessage = async(message:any)=>{
        try{
            await connection?.invoke("SendMessage", message);
        }
        catch(e){
            console.log(e);
        }
    }


    const handleNewAtendimentoByPaciente=async (idpaciente:any)=>{
        try{
            let retorno = await newAtendimentoByPaciente(idpaciente);
            if(retorno){
                alert("Atendimento solicitado com sucesso, aguarde");
                sendMessage(pacienteid);
            }
            else{
                alert("Erro ao Solicitar Atendimento")
            }
        }
        catch(exception ){
            alert("Erro ao enviar solicitação")
        }
    }



  return (
    <main>
        <h1>Atendimentos</h1>
        {(paciente)?<p>Paciente: {paciente?.nome}</p>:<></>}

        {(paciente)?<button onClick={()=>handleNewAtendimentoByPaciente(pacienteid)}><FaPlus/>Solicitar Atendimento</button>:<></>}
        <br/>
        <table>
            <tbody>
            <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Concluido</th>
                <th></th>
            </tr>
            {(atendimentos?.map(atendimento=>(
                <tr style={{backgroundColor:(atendimento.concluido)?"green":""}}>
                    <td>{atendimento.id}</td>
                    <td>{new Date(atendimento?.datahoraatendimento).toLocaleString("pt-BR")}</td>
                    <td>{(atendimento.concluido)?"Sim":"Não"}</td>
                    <td><button onClick={()=>{buscarPaciente(atendimento.pacienteid);navigate(atendimento.id+"/Examegeral/")}}><FaEye/> Exame Geral</button></td>
                </tr>)
            ))}
            </tbody>
        </table>
        

    </main>
  )
}

export default AtendimentoPage;