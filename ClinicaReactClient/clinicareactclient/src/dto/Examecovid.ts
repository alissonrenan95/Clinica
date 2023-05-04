import { Atendimento } from "./Atendimento";

export interface Examecovid{
    id?: number;
    atendimentoid:number;
    febre:boolean;
    coriza:boolean;
    narizentupido:boolean;
    cansaco:boolean;
    tosse:boolean;
    dordecabeca:boolean;
    doresnocorpo:boolean;
    malestargeral:boolean;
    dordegarganta:boolean;
    dificuldadederespirar:boolean;
    faltadepaladar:boolean;
    faltadeolfato:boolean;
    dificuldadedelocomocao:boolean;
    diarreia:boolean;
    concluido:boolean;
    atendimento?:Atendimento;
}