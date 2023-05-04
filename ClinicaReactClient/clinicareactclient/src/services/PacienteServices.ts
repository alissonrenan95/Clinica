import { Paciente } from "../dto/Paciente";
import { requestGetAsAsync, URL_BASE_PACIENTE, URL_BASE_ATENDIMENTO, URL_BASE_EXAMEGERAL, requestPostAsAsync, requestPostFormDataAsAsync } from "./Api";


export function findAll(){
    return requestGetAsAsync(URL_BASE_PACIENTE);
}
export function findAllByPagination(pagenumber:number=1, paginationsize:number=15){
    return requestGetAsAsync(URL_BASE_PACIENTE+"?pagenumber="+pagenumber+"&paginationsize="+paginationsize);
}

export function findByPacienteId(pacienteid:number){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid);
}

export function findByPacienteCpf(pacientecpf:number){
    return requestGetAsAsync(URL_BASE_PACIENTE+"cpf/"+pacientecpf);
}

export function findAtendimentosByPacienteId(pacienteid:number,pagenumber:number=1, paginationsize:number=15){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO+"?pagenumber="+pagenumber+"&paginationsize="+paginationsize);
}

export function findAtendimentoByPacienteIdAndAtendimentoId(pacienteid:number, atendimentoid:number){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO+atendimentoid);
}

export function findExamegeralByPacienteIdAndAtendimentoId(pacienteid:number, atendimentoid:number){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO+atendimentoid+"/"+URL_BASE_EXAMEGERAL);
}

export function findAtendimentos(){
    return requestGetAsAsync(URL_BASE_ATENDIMENTO);
}

export function findAtendimentosByPagination(pagenumber:number=1, paginationsize:number=15){
    return requestGetAsAsync(URL_BASE_ATENDIMENTO+"?pagenumber="+pagenumber+"&paginationsize="+paginationsize);
}

export function findExamesgeral(){
    return requestGetAsAsync(URL_BASE_EXAMEGERAL);
}


export function createPaciente(paciente:Paciente, pacienteimage:any){
    return requestPostAsAsync(URL_BASE_PACIENTE,paciente);
}

export function updatePaciente(paciente:Paciente, pacienteimage?:any){
    let formdata=new FormData();
    Object.entries(paciente).forEach(([key, value], index) => {
        // name Bobby Hadz 0
        // country Chile 1
        formdata.append(key,value);
    });
    formdata.append("datanascimento", paciente.datanascimento.toLocaleDateString("pt-BR"));
    formdata.append("pacienteimage", pacienteimage);
    return requestPostFormDataAsAsync(URL_BASE_PACIENTE+paciente.id,formdata);
}


export function newAtendimentoByPaciente(pacienteid:number){
    return requestPostAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO,{pacienteid});
}