import { Atendimento } from "../dto/Atendimento";
import { requestGetAsAsync, URL_BASE_ATENDIMENTO, URL_BASE_EXAMEGERAL, requestPostAsAsync, URL_BASE_EXAMECOVID } from "./Api";


export function findAtendimentoById(atendimentoid:number){
    return requestGetAsAsync(URL_BASE_ATENDIMENTO+atendimentoid);
}

export function findExamegeralByAtendimentoId(atendimentoid:number){
    return requestGetAsAsync(URL_BASE_ATENDIMENTO+atendimentoid+"/"+URL_BASE_EXAMEGERAL);
}

export function updateAtendimento(atendimento:Atendimento){
    return requestPostAsAsync(URL_BASE_ATENDIMENTO+atendimento.id,{"atendimentoid":atendimento.id});
}

export function findExamecovidByAtendimentoId(atendimentoid:number){
    return requestGetAsAsync(URL_BASE_ATENDIMENTO+atendimentoid+"/"+URL_BASE_EXAMECOVID);
}