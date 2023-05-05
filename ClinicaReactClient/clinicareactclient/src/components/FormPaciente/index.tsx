import React, { useState, useEffect, useRef } from 'react'
import { convertCpfFormattedStringToNumber, convertCpfNumberToFormattedString, validateCpf } from '../../services/Utils';
import { FaPen } from 'react-icons/fa';
import { createPaciente, findByPacienteId, updatePaciente } from '../../services/PacienteServices';
import { Paciente } from '../../dto/Paciente';
import { useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { URL_API, URL_BASE_PACIENTE } from '../../services/Api';


const FormPaciente = () => {
    const {pacienteid}=useParams();
    const [cpf, setCpf]=useState('');
    const [nome, setNome]=useState('');
    const [datanascimento, setDatanascimento]=useState('');
    const [telefone, setTelefone]=useState('');
    const [urlimagem,setUrlimagem]=useState('');
    const [pacienteimages,setPacienteimages]=useState<any>([]);
    const inputimageref=useRef<any>(null);

    useEffect(() => {
        if(!isNaN(Number(pacienteid))){
            buscarPacientePorId(Number(pacienteid));
        }
    }, [pacienteid])
    
    async function buscarPacientePorId(idpaciente: number){
        try{
            let paciente= (await findByPacienteId(idpaciente)).data;
            
            if(paciente[0]){
                setCpf(convertCpfNumberToFormattedString(Number(paciente[0].cpf))||"");
                setNome(paciente[0].nome);
                let datanasc=new Date(paciente[0].datanascimento);
                setDatanascimento(""+datanasc.getFullYear()+"-"+((datanasc.getMonth()+1<10)?"0":"")+(datanasc.getMonth()+1)+"-"+((datanasc.getDate()<10)?"0":"")+datanasc.getDate());
                setTelefone(paciente[0].telefone);
                setUrlimagem(URL_API+URL_BASE_PACIENTE+"RequestImage/"+paciente[0].urlimagem);
            }
        }
        catch(exception){
            alert(exception);
        }
        //
    }

    const handleSave=async (e:any)=>{
        e.preventDefault();
        try{
            if(validateCpf(""+cpf.replace(".","").replace(".","").replace("-","")) && ((""+telefone).replace('(','').replace(')','').replace('-','')).length===11){
                let datacomtimezone=new Date(datanascimento);
                datacomtimezone.setUTCMinutes(datacomtimezone.getTimezoneOffset());
                let paciente:Paciente={"cpf":convertCpfFormattedStringToNumber(cpf)||0,nome,"datanascimento":datacomtimezone,"telefone":Number((""+telefone).replace('(','').replace(')','').replace('-',''))};
                
                let response;
                if(pacienteid){
                    paciente.id=Number(pacienteid);
                    response=await updatePaciente(paciente, pacienteimages[0]);
                }
                else{
                    response=await createPaciente(paciente, pacienteimages[0]);
                }
                if(response.data==true){
                    alert("Paciente Registrado com Sucesso");
                    setCpf("");
                    setNome("");
                    setDatanascimento("");
                    setTelefone("");
                    setUrlimagem("");
                    setPacienteimages([]);
                    inputimageref.current.value=null;
                    
                }
                else{
                    alert("Dados Inválidos");
                }
            }
            else{
                alert("Dados Inválidos");
            }
        }
        catch(exception){
            alert(exception);
            alert("Erro ao Registrar o Paciente");
        }
    }

  return (
    <main>
        
        <form onSubmit={handleSave} encType="multipart/form-data">
            <h2>Paciente</h2>
            <div className="align-items-center"><img src={(pacienteimages.length>0)?URL.createObjectURL(pacienteimages[0]):urlimagem}  loading="lazy" alt=""/></div>
            <div className="controls"><label htmlFor="cpf">CPF </label><InputMask mask='999.999.999-99' placeholder='___.___.___-__' value={cpf} disabled={(pacienteid)?true:false} onChange={(e:any)=>setCpf(e.target.value)}/></div>
            <div className="controls"><label htmlFor="nome">Nome </label><input type="text" placeholder='Digite seu nome' value={nome} onChange={(e)=>setNome(e.target.value)}/></div>
            <div className="controls"><label htmlFor="datanascimento">Data Nascimento </label><input type="date" value={datanascimento} onChange={(e)=>setDatanascimento(e.target.value)}/></div>
            <div className="controls"><label htmlFor="telefone">Telefone </label><InputMask mask='(99)99999-9999' placeholder='(__)_____-____' value={telefone} onChange={(e)=>setTelefone(e.target.value)}/></div>
            <div className="controls"><label htmlFor="pacienteimage">Foto</ label><input type="file" accept=".jpg" ref={inputimageref} onChange={(e)=>setPacienteimages(e.target.files)}/></div>
            <button type="submit"><FaPen/> Registrar</button>
        </form>
    </main>
  )
}

export default FormPaciente;