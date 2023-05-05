import React, {useState, useEffect} from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Paciente } from "../../dto/Paciente";
import { Atendimento } from "../../dto/Atendimento";
import { findAtendimentoById } from "../../services/AtendimentoServices";
import { findByPacienteId } from "../../services/PacienteServices";
import { Examecovid } from "../../dto/Examecovid";
import { findExamecovidById, updateExamecovid } from "../../services/ExamecovidServices";
import { convertCpfNumberToFormattedString } from "../../services/Utils";

const FormExamecovid = () => {
  const navigate=useNavigate();
  const {pacienteid, atendimentoid, examecovidid}=useParams();
  const [paciente,setPaciente]=useState<Paciente>();
  const [atendimento, setAtendimento]=useState<Atendimento>();
  const [febre, setFebre]=useState(false);
  const [coriza, setCoriza]=useState(false);
  const [narizentupido, setNarizentupido]=useState(false);
  const [cansaco, setCansaco]=useState(false);
  const [tosse,setTosse]=useState(false);
  const [dordecabeca, setDordecabeca]=useState(false);
  const [doresnocorpo, setDoresnocorpo]=useState(false);
  const [malestargeral, setMalestargeral]=useState(false);
  const [dordegarganta, setDordegarganta]=useState(false);
  const [dificuldadederespirar, setDificuldadederespirar]=useState(false);
  const [faltadepaladar, setFaltadepaladar]=useState(false);
  const [faltadeolfato, setFaltadeolfato]=useState(false);
  const [dificuldadedelocomocao,setDificuldadedelocomocao]=useState(false);
  const [diarreia,setDiarreia]=useState(false);
  

  useEffect(() => {
    buscarExamecovid();
  }, []);
  
  const buscarExamecovid=async()=>{

    let response=await findExamecovidById(Number(examecovidid));
    if(!(response?.data[0]?.concluido)){
        setFebre(response.data[0].febre);
        setCoriza(response.data[0].coriza);
        setNarizentupido(response.data[0].narizentupido);
        setCansaco(response.data[0].cansaco);
        setTosse(response.data[0].tosse);
        setDordecabeca(response.data[0].dordecabeca);
        setDoresnocorpo(response.data[0].doresnocorpo);
        setMalestargeral(response.data[0].malestargeral);
        setDordegarganta(response.data[0].dordegarganta);
        setDificuldadederespirar(response.data[0].dificuldadedderespirar);
        setFaltadepaladar(response.data[0].faltadepaladar);
        setFaltadeolfato(response.data[0].faltadeolfato);
        setDificuldadedelocomocao(response.data[0].dificuldadedelocomocao);
        setDiarreia(response.data[0].diarreia);
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
        navigate("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examecovid/");
    }
  }
  
  const handleUpdate=async (e:any)=>{
    e.preventDefault();
    try{
        let examecovid:Examecovid={"id":Number(examecovidid), "atendimentoid":Number(atendimentoid),febre,coriza,narizentupido,cansaco,tosse,dordecabeca,doresnocorpo,malestargeral,dordegarganta,dificuldadederespirar,faltadepaladar,faltadeolfato,dificuldadedelocomocao,diarreia,"concluido":true};

        let response=await updateExamecovid(examecovid);
        if(response.data==true){
            alert("Exame registrado com sucesso");
            navigate("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examecovid/");
        }
        else{
            alert("Dados Inválidos");
        }
    }
    catch(err){
        
        alert(err);
      console.error("Falha ao registrar exame" + err);
    }
  }



  return (
    <main>
        <form onSubmit={handleUpdate}>
            <h2>Exame Covid</h2>
            <p> Paciente: {paciente?.nome}</p>

            <p>Data Nacimento:  {(paciente)?new Date(paciente?.datanascimento).toLocaleDateString("pt-BR"):""}</p>
            <p>CPF: {(paciente)?convertCpfNumberToFormattedString(paciente.cpf):""}</p>

            <div>
                <input type="checkbox" name="febre" id="febre" checked={febre} onChange={(e)=>{setFebre(e.target.checked)}}/>
                <label htmlFor="febre">Febre</label>
            </div>
            <div>
                <input type="checkbox" name="coriza" id="coriza" checked={coriza} onChange={(e)=>{setCoriza(e.target.checked)}}/>
                <label htmlFor="coriza">Coriza</label>
            </div>
            <div>
                <input type="checkbox" name="narizentupido" id="narizentupido" checked={narizentupido} onChange={(e)=>{setNarizentupido(e.target.checked)}}/>
                <label htmlFor="narizentupido">Nariz Entupido</label>
            </div>
            <div>
                <input type="checkbox" name="cansaco" id="cansaco" checked={cansaco} onChange={(e)=>{setCansaco(e.target.checked)}}/>
                <label htmlFor="cansaco">Cansaço</label>
            </div>
            <div>
                <input type="checkbox" name="tosse" id="tosse" checked={tosse} onChange={(e)=>{setTosse(e.target.checked)}}/>
                <label htmlFor="cansaco">Tosse</label>
            </div>
            <div>
                <input type="checkbox" name="dordecabeca" id="dordecabeca" checked={dordecabeca} onChange={(e)=>{setDordecabeca(e.target.checked)}}/>
                <label htmlFor="dordecabeca">Dor de Cabeça</label>
            </div>
            <div>
                <input type="checkbox" name="doresnocorpo" id="doresnocorpo" checked={doresnocorpo} onChange={(e)=>{setDoresnocorpo(e.target.checked)}}/>
                <label htmlFor="doresnocorpo">Dores no Corpo</label>
            </div>
            <div>
                <input type="checkbox" name="malestargeral" id="malestargeral" checked={malestargeral} onChange={(e)=>{setMalestargeral(e.target.checked)}}/>
                <label htmlFor="malestargeral">Mal Estar Geral</label>
            </div>
            <div>
                <input type="checkbox" name="dordegarganta" id="dordegarganta" checked={dordegarganta}onChange={(e)=>{setDordegarganta(e.target.checked)}}/>
                <label htmlFor="dordegarganta">Dor de garganta</label>
            </div>
            <div>
                <input type="checkbox" name="dificuldadedderespirar" id="dificuldadederespirar" checked={dificuldadederespirar} onChange={(e)=>{setDificuldadederespirar(e.target.checked)}}/>
                <label htmlFor="dificuldadederespirar">Dificuldade de Respirar</label>
            </div>
            <div>
                <input type="checkbox" name="faltadepaladar" id="faltadepaladar" checked={faltadepaladar} onChange={(e)=>{setFaltadepaladar(e.target.checked)}}/>
                <label htmlFor="faltadepaladar">Falta de Paladar</label>
            </div>
            <div>
                <input type="checkbox" name="faltadeolfato" id="faltadeolfato" checked={faltadeolfato} onChange={(e)=>{setFaltadeolfato(e.target.checked)}}/>
                <label htmlFor="faltadeolfato">Falta de Olfato</label>
            </div>
            <div>
                <input type="checkbox" name="dificuldadedelocomocao" id="dificuldadedelocomocao" checked={dificuldadedelocomocao} onChange={(e)=>{setDificuldadedelocomocao(e.target.checked)}}/>
                <label htmlFor="dificuldadedelocomocao">Dificuldade de Locomoção</label>
            </div>
            <div>
                <input type="checkbox" name="diarreia" id="diarreia" checked={diarreia} onChange={(e)=>{setDiarreia(e.target.checked)}}/>
                <label htmlFor="diarreia">Diarreia</label>
            </div>
            <button type="submit"><FaPen/> Registrar</button>
        </form>
    </main>
  );
};
export default FormExamecovid;