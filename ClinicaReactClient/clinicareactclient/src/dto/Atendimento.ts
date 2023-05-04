import { Examecovid } from "./Examecovid";
import { Examegeral } from "./Examegeral";
import { Paciente } from "./Paciente";

export interface Atendimento{
    id?: number;
    pacienteid:number;
    datahoraatendimento:Date;
    concluido:boolean;
    paciente?:Paciente;
    examegerals?:Examegeral[];
    examecovids?:Examecovid[];
}