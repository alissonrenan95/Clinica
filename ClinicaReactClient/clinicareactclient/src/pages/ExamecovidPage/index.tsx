import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Examecovid } from "../../dto/Examecovid";
import { Atendimento } from "../../dto/Atendimento";
import { Paciente } from "../../dto/Paciente";
import { findByPacienteId, findExamecovidByPacienteIdAndAtendimentoId } from "../../services/PacienteServices";
import { findAtendimentoById, findExamecovidByAtendimentoId } from "../../services/AtendimentoServices";
import Grid from "../../components/Grid";
import { convertBooleanToString } from "../../services/Utils";

const ExamecovidPage = () => {
  const navigate = useNavigate();
  const { pacienteid, atendimentoid } = useParams();
  const [paciente, setPaciente] = useState<Paciente>();
  const [atendimento, setAtendimento] = useState<Atendimento>();
  const [examescovid, setExamescovid] = useState<Examecovid[]>([]);


  // /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examecovid

  useEffect(() => {
    buscarExamescovid();
  }, []);


  const buscarExamescovid = async () => {
    try {
      let idpaciente = Number(pacienteid);
      let idatendimento = Number(atendimentoid);
      let response;
      if (idatendimento) {
        if (idpaciente) {
          response = await findExamecovidByPacienteIdAndAtendimentoId(idpaciente, idatendimento);
        }
        else {
          response = await findExamecovidByAtendimentoId(idatendimento);
        }
        if (response.status === 200) {
          setExamescovid(response.data);
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


  function convertCovidDataToGrid(datagrid: Examecovid[]) {

    let dadosconvertidos: any[][][] = [[[]]];
    try{
      datagrid.map((examecovid) => {
        let objlinhas=[];
        //let values=Object.values(examecovid);
        let linha0=["ID",examecovid.id,"Concluido", convertBooleanToString(examecovid.concluido)];
        let linha1=["Febre", convertBooleanToString(examecovid.febre),"Mal estar geral",convertBooleanToString(examecovid.malestargeral)]
        let linha2=["Coriza", convertBooleanToString(examecovid.coriza),"Dor de garganta", convertBooleanToString(examecovid.dordegarganta)];
        let linha3=["Nariz entupido", convertBooleanToString(examecovid.dificuldadederespirar),"Dificuldade de respirar", convertBooleanToString(examecovid.dificuldadederespirar)];
        let linha4=["Cansaço", convertBooleanToString(examecovid.cansaco),"Falta de paladar",convertBooleanToString(examecovid.faltadepaladar)];
        let linha5=["Tosse", convertBooleanToString(examecovid.tosse),"Falta de olfato",convertBooleanToString(examecovid.faltadeolfato)];
        let linha6=["Dor de cabeça",convertBooleanToString(examecovid.dordecabeca),"Dificuldade de locomoção",convertBooleanToString(examecovid.dificuldadedelocomocao)];
        let linha7=["Dores no corpo",convertBooleanToString(examecovid.doresnocorpo),"Diarreia",convertBooleanToString(examecovid.diarreia)];
        objlinhas=[linha0,linha1,linha2,linha3,linha4,linha5,linha6,linha7];
        dadosconvertidos[dadosconvertidos.length]=objlinhas;
      });
    }
    catch(exception){
      dadosconvertidos=[[[]]];
    }
    return dadosconvertidos;
  }




  return (
    <main>
      <h1>Exame Covid</h1>
      <br />

      <p>Paciente: {paciente?.nome}</p>
      <p>Data atendimento: {(atendimento) ? new Date(atendimento?.datahoraatendimento).toLocaleString("pt-BR") : ""} </p>
      <Grid headers={[[]]} datagrid={convertCovidDataToGrid(examescovid)}/>
        
      {/*}

      {examescovid ? (
        examescovid.map((examecovid) => (
          <table>
            <thead>
              
            </thead>

            <tbody>
              <tr>
                <td>ID</td>
                <td>{examecovid.id}</td>
                <td>Concluido</td>
                <td>{examecovid.concluido ? "Sim" : "Não"}</td>
              </tr>

              <tr>
                <td>Febre</td>
                <td>{examecovid.febre ? "Sim" : "Não"}</td>
                <td>Mal estar geral</td>
                <td>{examecovid.malestargeral ? "Sim" : "Não"}</td>

              </tr>
              <tr>
                <td>Coriza</td>
                <td>{examecovid.coriza ? "Sim" : "Não"}</td>
                <td>Dor de garganta</td>
                <td>{examecovid.dordegarganta ? "Sim" : "Não"}</td>
              </tr>
              <tr>
                <td>Nariz entupido</td>
                <td>{examecovid.narizentupido ? "Sim" : "Não"}</td>
                <td>Dificuldade de Respirar</td>
                <td>{examecovid.dificuldadederespirar ? "Sim" : "Não"}</td>
              </tr>
              <tr>
                <td>Cansaço</td>
                <td>{examecovid.cansaco ? "Sim" : "Não"}</td>
                <td>Falta de paladar</td>
                <td>{examecovid.faltadepaladar ? "Sim" : "Não"}</td>
              </tr>
              <tr>
                <td>Tosse</td>
                <td>{examecovid.tosse ? "Sim" : "Não"}</td>
                <td>Falta de olfato</td>
                <td>{examecovid.faltadeolfato ? "Sim" : "Não"}</td>
              </tr>
              <tr>
                <td>Dor de cabeça</td>
                <td>{examecovid.dordecabeca ? "Sim" : "Não"}</td>
                <td>Dificuldade de locomoção</td>
                <td>{examecovid.dificuldadedelocomocao ? "Sim" : "Não"}</td>
              </tr>
              <tr>
                <td>Dores no corpo</td>
                <td>{examecovid.doresnocorpo ? "Sim" : "Não"}</td>
                <td>Diarreia</td>
                <td>{examecovid.diarreia ? "Sim" : "Não"}</td>
              </tr>

            </tbody>
          </table>
        ))
      ) : (
        <></>
      )}
      */}

    </main>
  );
};

export default ExamecovidPage;