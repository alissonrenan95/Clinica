import React, { createContext, useState } from 'react'
import { Paciente } from '../dto/Paciente';

const PacienteContext:React.Context<{}>=createContext({});
export const PacienteProvider=({children}:any)=> {
    const [paciente, setPaciente]=useState<Paciente>();
    const [atendimento, setAtendimento]=useState();
    const [examegeral, setExamegeral]=useState();
    const [examecovid, setExamecovid]=useState();




    return(
        <PacienteContext.Provider value={{paciente, setPaciente, atendimento, setAtendimento, examegeral, setExamegeral, examecovid, setExamecovid}}>
            {children}
        </PacienteContext.Provider>
    )
}

export default PacienteContext;