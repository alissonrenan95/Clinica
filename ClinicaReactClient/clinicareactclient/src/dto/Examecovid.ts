import { Atendimento } from "./Atendimento";

export interface Examecovid{
    id?: number;
    atendimentoid:number;
    febre:boolean;
    Coriza:boolean;
    Narizentupido:boolean;
    Cansaco:boolean;
    Tosse:boolean;
    Dordecabeca:boolean;
    Doresnocorpo:boolean;
    Malestargeral:boolean;
    Dordegarganta:boolean;
    Dificuldadederespirar:boolean;
    Faltadepaladar:boolean;
    Faltadeolfato:boolean;
    Dificuldadedelocomocao:boolean;
    Diarreia:boolean;
    Concluido:boolean;
    atendimento?:Atendimento;
}