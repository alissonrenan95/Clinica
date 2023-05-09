import React, { useState } from 'react'
import InputMask from 'react-input-mask';
import { findByPacienteCpf, newAtendimentoByPaciente } from '../../services/PacienteServices';
import { convertCpfFormattedStringToNumber, validateCpf } from '../../services/Utils';
import { FaPen } from 'react-icons/fa';
import { Paciente } from '../../dto/Paciente';

const FormAtendimento = () => {
  const [cpf, setCpf]=useState("");

  const handleSave=async (e:any)=>{
    e.preventDefault();
    try{
        if(validateCpf(""+cpf.replace(".","").replace(".","").replace("-",""))){
            let cpfnumber=convertCpfFormattedStringToNumber(cpf);
            if(cpfnumber){
              let paciente:Paciente=(await findByPacienteCpf(cpfnumber)).data[0];
              if(paciente?.id){
                let response=await newAtendimentoByPaciente(paciente.id);
                if(response.data==true){
                  alert("Atendimento Registrado com Sucesso");
                  setCpf("");
                }
                else{
                  alert("Erro ao solicitar atendimento, o paciente possui atendimento em aberto");
                }
              }
              else{
                alert("CPF não cadastrado");
              }
            }
            else{
                alert("Dados Inválidos");
            }
        }
        else{
            alert("CPF Inválido");
        }
    }
    catch(exception){
        alert("Erro ao Registrar o Atendimento");
    }
}


  return (
    <main>
      
      <form onSubmit={handleSave}>
        <h2>Atendimento</h2>
        <div className="controls"><label htmlFor="cpf">CPF </label><InputMask mask='999.999.999-99' value={cpf} placeholder='___.___.___-__' onChange={(e:any)=>setCpf(e.target.value)}/></div>
        <div><button type="submit"><FaPen/> Registrar</button></div>
      </form>
    </main>
  )
}

export default FormAtendimento;
