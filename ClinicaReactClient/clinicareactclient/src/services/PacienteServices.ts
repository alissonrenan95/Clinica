import { Paciente } from "../dto/Paciente";
import { requestGetAsAsync, URL_BASE_PACIENTE, URL_BASE_ATENDIMENTO, URL_BASE_EXAMEGERAL, requestPostAsAsync } from "./Api";


export function findAll(){
    return requestGetAsAsync(URL_BASE_PACIENTE);
}

export function findByPacienteId(pacienteid:number){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid);
}

export function findByPacienteCpf(pacientecpf:number){
    return requestGetAsAsync(URL_BASE_PACIENTE+"cpf="+pacientecpf);
}

export function findAtendimentosByPacienteId(pacienteid:number){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO);
}

export function findAtendimentoByPacienteIdAndAtendimentoId(pacienteid:number, atendimentoid:number){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO+atendimentoid);
}

export function findExamegeralPacienteIdAndAtendimentoId(pacienteid:number, atendimentoid:number){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO+atendimentoid+"/"+URL_BASE_EXAMEGERAL);
}



export function findAtendimentos(){
    return requestGetAsAsync(URL_BASE_ATENDIMENTO);
}

export function findExamesgeral(){
    return requestGetAsAsync(URL_BASE_EXAMEGERAL);
}


export function newPaciente(paciente:Paciente){
    return requestPostAsAsync(URL_BASE_PACIENTE,paciente);
}


export function newAtendimentoByPaciente(pacienteid:number){
    return requestPostAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO,{pacienteid});
}