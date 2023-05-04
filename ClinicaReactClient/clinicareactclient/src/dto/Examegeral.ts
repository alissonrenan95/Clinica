import { Atendimento } from "./Atendimento";

export interface Examegeral{
    id?: number;
    atendimentoid:number;
    pressaosistolica:number;
    pressaodiastolica:number;
    pulsacao:number;
    respiracao:number;
    temperatura:number;
    concluido:boolean;
    atendimento?:Atendimento;
}