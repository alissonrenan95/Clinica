import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Paciente } from "../../dto/Paciente";
import { Atendimento } from "../../dto/Atendimento";
import { findAtendimentoById } from "../../services/AtendimentoServices";
import { findByPacienteId } from "../../services/PacienteServices";
import { Examecovid } from "../../dto/Examecovid";
import { findExamecovidById, updateExamecovid } from "../../services/ExamecovidServices";
import { convertCpfNumberToFormattedString } from "../../services/Utils";
import CustomSwitch from "../CustomSwitch";

const FormExamecovid = () => {
    const navigate = useNavigate();
    const { pacienteid, atendimentoid, examecovidid } = useParams();
    const [paciente, setPaciente] = useState<Paciente>();
    const [atendimento, setAtendimento] = useState<Atendimento>();
    const [febre, setFebre] = useState(false);
    const [coriza, setCoriza] = useState(false);
    const [narizentupido, setNarizentupido] = useState(false);
    const [cansaco, setCansaco] = useState(false);
    const [tosse, setTosse] = useState(false);
    const [dordecabeca, setDordecabeca] = useState(false);
    const [doresnocorpo, setDoresnocorpo] = useState(false);
    const [malestargeral, setMalestargeral] = useState(false);
    const [dordegarganta, setDordegarganta] = useState(false);
    const [dificuldadederespirar, setDificuldadederespirar] = useState(false);
    const [faltadepaladar, setFaltadepaladar] = useState(false);
    const [faltadeolfato, setFaltadeolfato] = useState(false);
    const [dificuldadedelocomocao, setDificuldadedelocomocao] = useState(false);
    const [diarreia, setDiarreia] = useState(false);


    useEffect(() => {
        buscarExamecovid();
    }, []);

    const buscarExamecovid = async () => {

        let response = await findExamecovidById(Number(examecovidid));
        if (!(response?.data[0]?.concluido)) {
            setFebre(response.data[0].febre);
            setCoriza(response.data[0].coriza);
            setNarizentupido(response.data[0].narizentupido);
            setCansaco(response.data[0].cansaco);
            setTosse(response.data[0].tosse);
            setDordecabeca(response.data[0].dordecabeca);
            setDoresnocorpo(response.data[0].doresnocorpo);
            setMalestargeral(response.data[0].malestargeral);
            setDordegarganta(response.data[0].dordegarganta);
            setDificuldadederespirar(response.data[0].dificuldadedderespirar);
            setFaltadepaladar(response.data[0].faltadepaladar);
            setFaltadeolfato(response.data[0].faltadeolfato);
            setDificuldadedelocomocao(response.data[0].dificuldadedelocomocao);
            setDiarreia(response.data[0].diarreia);
            if (response.data[0].atendimento) {
                setAtendimento(response.data[0].atendimento);
                if (response.data[0].atendimento.paciente) {
                    setPaciente(response.data[0].atendimento.paciente);
                }
                else {
                    let responsepaciente = await findByPacienteId(response.data[0].atendimento.pacienteid);
                    setPaciente(responsepaciente.data[0]);
                }
            }
            else {
                let responseatendimento = await findAtendimentoById(response.data[0].atendimentoid);
                setAtendimento(responseatendimento.data[0]);
                if (responseatendimento.data[0].paciente) {
                    setPaciente(responseatendimento.data[0].paciente);
                }
                else {
                    let responsepaciente = await findByPacienteId(responseatendimento.data[0].pacienteid);
                    setPaciente(responsepaciente.data[0]);
                }
            }
        }
        else {
            navigate("/Paciente/" + pacienteid + "/Atendimento/" + atendimentoid + "/Examecovid/");
        }
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        try {
            let examecovid: Examecovid = { "id": Number(examecovidid), "atendimentoid": Number(atendimentoid), febre, coriza, narizentupido, cansaco, tosse, dordecabeca, doresnocorpo, malestargeral, dordegarganta, dificuldadederespirar, faltadepaladar, faltadeolfato, dificuldadedelocomocao, diarreia, "concluido": true };

            let response = await updateExamecovid(examecovid);
            if (response.data == true) {
                alert("Exame registrado com sucesso");
                navigate("/Paciente/" + pacienteid + "/Atendimento/" + atendimentoid + "/Examecovid/");
            }
            else {
                alert("Dados Inválidos");
            }
        }
        catch (err) {

            alert(err);
            console.error("Falha ao registrar exame" + err);
        }
    }



    return (
        <main>
            <form onSubmit={handleUpdate}>
                <h2>Exame Covid</h2>
                <div className="text-left">
                <p> Paciente: {paciente?.nome}</p>
                <p>Data Nacimento:  {(paciente) ? new Date(paciente?.datanascimento).toLocaleDateString("pt-BR") : ""}</p>
                <p>CPF: {(paciente) ? convertCpfNumberToFormattedString(paciente.cpf) : ""}</p>
                </div>
                <p>Questionário de Sintomas</p>
                <div className="w-100 " style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{width:"50%"}}>
                        <CustomSwitch label="Febre" checkvalue={febre} setCheckvalue={setFebre} />
                        <CustomSwitch label="Coriza" checkvalue={coriza} setCheckvalue={setCoriza} />
                        <CustomSwitch label="Nariz entupido" checkvalue={narizentupido} setCheckvalue={setNarizentupido} />
                        <CustomSwitch label="Cansaço" checkvalue={cansaco} setCheckvalue={setCansaco} />
                        <CustomSwitch label="Tosse" checkvalue={tosse} setCheckvalue={setTosse} />
                        <CustomSwitch label="Dor de cabeça" checkvalue={dordecabeca} setCheckvalue={setDordecabeca} />
                        <CustomSwitch label="Dores no corpo" checkvalue={doresnocorpo} setCheckvalue={setDoresnocorpo} />
                    </div>
                    <div style={{width:"50%"}}>
                        <CustomSwitch label="Mal estar geral" checkvalue={malestargeral} setCheckvalue={setMalestargeral} />
                        <CustomSwitch label="Dor de garganta" checkvalue={dordegarganta} setCheckvalue={setDordegarganta} />
                        <CustomSwitch label="Dificuldade respirar" checkvalue={dificuldadederespirar} setCheckvalue={setDificuldadederespirar} />
                        <CustomSwitch label="Falta de paladar" checkvalue={faltadepaladar} setCheckvalue={setFaltadepaladar} />
                        <CustomSwitch label="Falta de olfato" checkvalue={faltadeolfato} setCheckvalue={setFaltadeolfato} />
                        <CustomSwitch label="Dificuldade locomoção" checkvalue={dificuldadedelocomocao} setCheckvalue={setDificuldadedelocomocao} />
                        <CustomSwitch label="Diarreia" checkvalue={diarreia} setCheckvalue={setDiarreia} />
                    </div>
                </div>
                <br/>
                <div><button type="submit"><FaPen /> Registrar</button></div>
                <br/>
            </form>
        </main>
    );
};
export default FormExamecovid;