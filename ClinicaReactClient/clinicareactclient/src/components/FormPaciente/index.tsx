import React, { useState } from 'react'
import { convertCpfFormattedStringToNumber, convertCpfNumberToFormattedString, formatarCpf } from '../../services/Utils';
import { FaPlus } from 'react-icons/fa';
import { findAtendimentosByPacienteId, findByPacienteCpf, findByPacienteId, findExamesgeral, newPaciente } from '../../services/PacienteServices';
import { Paciente } from '../../dto/Paciente';


const FormPaciente = () => {
    const [cpf, setCpf]=useState('');
    const [nome, setNome]=useState('');
    const [datanascimento, setDatanascimento]=useState('');
    const [telefone, setTelefone]=useState('');

    const handleSave=async (e:any)=>{
        e.preventDefault();
        try{
            let paciente:Paciente={cpf:convertCpfFormattedStringToNumber(cpf)||0,nome,datanascimento:new Date(datanascimento),telefone:Number(telefone),urlimagem:""+convertCpfFormattedStringToNumber(cpf)||0+"png"};
            let response=await newPaciente(paciente);
            
            if(response.data){
                alert("Paciente Registrado com Sucesso");
                setCpf("");
                setNome("");
                setDatanascimento("");
                setTelefone("");
            }
            else{
                alert("Dados Inválidos");
            }
        }
        catch(exception){
            alert("Erro ao Registrar o Paciente");
        }
    }

    

  return (
    <main style={{display:"flex", flexDirection:"column", width:"100vw", margin:"0 10%"}}>
        <h2>Cadastro de Paciente</h2>
        <form onSubmit={handleSave}>
            <div className="controls"><label htmlFor="cpf">CPF </label><input type="text" value={cpf} pattern="^\d{3}.?\d{3}.?\d{3}-?\d{2}$"  maxLength={14} onChange={(e)=>setCpf(formatarCpf(e.target.value))}/></div>
            <div className="controls"><label htmlFor="nome">Nome </label><input type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/></div>
            <div className="controls"><label htmlFor="datanascimento">Data Nascimento </label><input type="date" value={datanascimento} onChange={(e)=>setDatanascimento(e.target.value)}/></div>
            <div className="controls"><label htmlFor="telefone">Telefone </label><input type="tel" value={telefone} onChange={(e)=>setTelefone(e.target.value)}/></div>
            <button type="submit"><FaPlus/> Cadastrar</button>
        </form>
    </main>
  )
}

export default FormPaciente;