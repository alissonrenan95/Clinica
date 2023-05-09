import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Examecovid } from "../../dto/Examecovid";
import { Atendimento } from "../../dto/Atendimento";
import { Paciente } from "../../dto/Paciente";
import { findByPacienteId, findExamecovidByPacienteIdAndAtendimentoId } from "../../services/PacienteServices";
import { findAtendimentoById, findExamecovidByAtendimentoId } from "../../services/AtendimentoServices";
import Grid from "../../components/Grid";

const ExamecovidPage = () => {
  const navigate = useNavigate();
  const { pacienteid, atendimentoid } = useParams();
  const [paciente, setPaciente]=useState<Paciente>();
  const [atendimento, setAtendimento] = useState<Atendimento>();
  const [examescovid, setExamescovid] = useState<Examecovid[]>([]);


  // /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examecovid

  useEffect(() => {
    buscarExamescovid();
  }, []);


  const buscarExamescovid=async ()=>{
    try{
        let idpaciente=Number(pacienteid);
        let idatendimento=Number(atendimentoid);
        let response;
        if(idatendimento){
            if(idpaciente){
                response=await findExamecovidByPacienteIdAndAtendimentoId(idpaciente, idatendimento);
            }
            else{
                response=await findExamecovidByAtendimentoId(idatendimento);
            }
            if(response.status===200){
                setExamescovid(response.data);
                if(response.data){
                    if(response.data[0].concluido){
                        if(response.data[0].atendimento){
                            setAtendimento(response.data[0].atendimento);
                            if(response.data[0].atendimento.paciente){
                                setPaciente(response.data[0].atendimento.paciente);
                            }
                            else{
                                setPaciente((await findByPacienteId(response.data[0].atendimento.pacienteid)).data[0]);
                            }
                        }
                        else{
                            let responseatendimento=await findAtendimentoById(Number(response.data[0].atendimentoid));
                            setAtendimento(responseatendimento.data[0]);
                            if(responseatendimento.data[0].paciente){
                                setPaciente(responseatendimento.data[0].paciente);
                            }
                            else{
                                if(responseatendimento.data[0]){
                                    setPaciente((await findByPacienteId(responseatendimento.data[0].pacienteid)).data[0]);
                                }
                            }
                        }
                    }
                    else{
                        navigate(""+response.data[0].id, {replace:true});
                    }
                }
                
            }
        }
        else{
            //response=await findExamesgeral();
        }
    }
    catch(exception){
        
    }
    
}


function convertCovidDataToGrid(datagrid:Examecovid[]){

  let dadosconvertidos:string[][]=[[]];

  

  datagrid.map((examecovid) => (
    dadosconvertidos[dadosconvertidos.length]=[""+(examecovid.cansaco)]
    
  ));
    return dadosconvertidos;
}




  return (
    <main>
        <h1>Exame Covid</h1>
        <br/>
        
        <p>Paciente: {paciente?.nome}</p>
        <p>Data atendimento: {(atendimento)?new Date(atendimento?.datahoraatendimento).toLocaleString("pt-BR"):""} </p>
        
        <Grid datagrid={convertCovidDataToGrid(examescovid)} headers={[]}></Grid>



      <table>
        <thead></thead>

        <tbody>
          <tr>
            <th className="tbcabecalho">ID</th>
            <th className="tbcabecalho">Febre</th>
            <th className="tbcabecalho">Coriza</th>
            <th className="tbcabecalho">Nariz Entupido</th>
            <th className="tbcabecalho">Cansaço</th>
            <th className="tbcabecalho">Tosse</th>
            <th className="tbcabecalho">Dor de Cabeça</th>
            <th className="tbcabecalho">Dores No Corpo</th>
            <th className="tbcabecalho">Mal Estar geral</th>
            <th className="tbcabecalho">Dor de Garganta</th>
            <th className="tbcabecalho">Dificuldade de Respirar</th>
            <th className="tbcabecalho">Falta de Paladar</th>
            <th className="tbcabecalho">Falta de Olfato</th>
            <th className="tbcabecalho">Dificuldade de Locomoção</th>
            <th className="tbcabecalho">Diarreia</th>
            <th className="tbcabecalho">Concluido</th>
          </tr>
          {examescovid ? (
            examescovid.map((examecovid) => (
              <tr>
                <td>{examecovid.id}</td>
                <td>{examecovid.febre ? "Sim" : "Não"}</td>
                <td>{examecovid.dordecabeca ? "Sim" : "Não"}</td>
                <td>{examecovid.narizentupido ? "Sim" : "Não"}</td>
                <td>{examecovid.cansaco ? "Sim" : "Não"}</td>
                <td>{examecovid.tosse ? "Sim" : "Não"}</td>
                <td>{examecovid.dordecabeca ? "Sim" : "Não"}</td>
                <td>{examecovid.doresnocorpo ? "Sim" : "Não"}</td>
                <td>{examecovid.malestargeral ? "Sim" : "Não"}</td>
                <td>{examecovid.dordegarganta ? "Sim" : "Não"}</td>
                <td>{examecovid.dificuldadederespirar ? "Sim" : "Não"}</td>
                <td>{examecovid.faltadepaladar ? "Sim" : "Não"}</td>
                <td>{examecovid.faltadeolfato ? "Sim" : "Não"}</td>
                <td>{examecovid.dificuldadedelocomocao ? "Sim" : "Não"}</td>
                <td>{examecovid.diarreia ? "Sim" : "Não"}</td>
                <td>{examecovid.concluido ? "Sim" : "Não"}</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default ExamecovidPage;