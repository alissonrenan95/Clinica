export interface Paciente{
    id?: number;
    cpf: number;
    nome: string;
    datanascimento:Date;
    telefone: number;
    urlimagem?:string;
}