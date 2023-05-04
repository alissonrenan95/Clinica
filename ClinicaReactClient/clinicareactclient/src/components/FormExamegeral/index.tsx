import React, {useState, useEffect} from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Paciente } from "../../dto/Paciente";
import { Examegeral } from "../../dto/Examegeral";
import { findExamegeralById, updateExamegeral } from "../../services/ExamegeralServices";
import { Atendimento } from "../../dto/Atendimento";
import { findAtendimentoById } from "../../services/AtendimentoServices";
import { findByPacienteId } from "../../services/PacienteServices";

const FormExameGeral = () => {
  const navigate=useNavigate();
  const {pacienteid, atendimentoid, examegeralid}=useParams();
  const [paciente,setPaciente]=useState<Paciente>();
  const [atendimento, setAtendimento]=useState<Atendimento>();
  const [pressaosistolica, setPressaosistolica]=useState(0);
  const [pressaodiastolica, setPressaodiastolica]=useState(0);
  const [pulsacao, setPulsacao]=useState(0);
  const [respiracao, setRespiracao]=useState(0);
  const [temperatura, setTemperatura]=useState(0);

  useEffect(() => {
    buscarExamegeral();
  }, []);
  
  const buscarExamegeral=async()=>{

    let response=await findExamegeralById(Number(examegeralid));
    if(!(response?.data[0]?.concluido)){
        setPressaosistolica(response.data[0].pressaosistolica);
        setPressaodiastolica(response.data[0].pressaodiastolica);
        setPulsacao(response.data[0].pulsacao);
        setRespiracao(response.data[0].respiracao);
        setTemperatura(response.data[0].temperatura);
        if(response.data[0].atendimento){
            setAtendimento(response.data[0].atendimento);
            if(response.data[0].atendimento.paciente){
                setPaciente(response.data[0].atendimento.paciente);
            }
            else{
                let responsepaciente=await findByPacienteId(response.data[0].atendimento.pacienteid);
                setPaciente(responsepaciente.data[0]);
            }
        }
        else{
            let responseatendimento=await findAtendimentoById(response.data[0].atendimentoid);
            setAtendimento(responseatendimento.data[0]);
            if(responseatendimento.data[0].paciente){
                setPaciente(responseatendimento.data[0].paciente);
            }
            else{
                let responsepaciente=await findByPacienteId(responseatendimento.data[0].pacienteid);
                setPaciente(responsepaciente.data[0]);
            }
        }
    }
    else{
        navigate("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examegeral/");
    }
  }
  
  const handleUpdate=async (e:any)=>{
    e.preventDefault();
    try{
        let examegeral:Examegeral={"id":Number(examegeralid), "atendimentoid":Number(atendimentoid),pressaosistolica, pressaodiastolica, pulsacao, respiracao, temperatura, "concluido":true};

        let response=await updateExamegeral(examegeral);
        if(response.data==true){
            alert("Exame registrado com sucesso");
            navigate("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examegeral/");
        }
        else{
            alert("Dados Inválidos");
        }
    }
    catch(err){
      console.error("Falha ao registrar exame" + err);
    }
  }



  return (
    <div className="container text-center">
      <form onSubmit={handleUpdate}>

        <h1 className='title'> Paciente {paciente?.nome}</h1>
       
        <h3 className='subtitle'>Data Nacimento:  {(paciente)?new Date(paciente?.datanascimento).toLocaleDateString("pt-BR"):""}
      </h3>
        <h3 className='subtitle'>CPF: {paciente?.cpf}</h3>

        <div>
            <label htmlFor="pressaosistolica">Pressão Sistólica</label>
            <input type="number" name="pressaosistolica" id="pressaosistolica" value={pressaosistolica} onChange={(e)=>{setPressaosistolica(Number(e.target.value))}}/>
        </div>
        <div>
            <label htmlFor="pressaodiastolica">Pressão Diastólica</label>
            <input type="number" name="pressaodiastolica" id="pressaodiastolica" value={pressaodiastolica} onChange={(e)=>{setPressaodiastolica(Number(e.target.value))}}/>
        </div>
        <div>
            <label htmlFor="pulsacao">Pulsação</label>
            <input type="number" name="pulsacao" id="pulsacao" value={pulsacao} onChange={(e)=>{setPulsacao(Number(e.target.value))}}/>
        </div>
        <div>
            <label htmlFor="respiracao">Respiração</label>
            <input type="number" name="respiracao" id="respiracao" value={respiracao} onChange={(e)=>{setRespiracao(Number(e.target.value))}}/>
        </div>
        <div>
            <label htmlFor="temperatura">Temperatura</label>
            <input type="number" name="temperatura" id="temperatura" value={temperatura} onChange={(e)=>{setTemperatura(Number(e.target.value))}}/>
        </div>
        
        <button type="submit"><FaPen/>
          Registrar
        </button>
      </form>
    </div>
  );
};
export default FormExameGeral;