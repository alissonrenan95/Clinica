import { Paciente } from "./Paciente";

export interface Atendimento{
    id?: number;
    pacienteid:number;
    datahoraatendimento:Date;
    concluido:boolean;
    paciente?:Paciente;
}