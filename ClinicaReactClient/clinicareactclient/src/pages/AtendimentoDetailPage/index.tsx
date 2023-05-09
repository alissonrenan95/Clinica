import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findAtendimentoByPacienteIdAndAtendimentoId, findByPacienteId, findExamecovidByPacienteIdAndAtendimentoId, findExamegeralByPacienteIdAndAtendimentoId } from '../../services/PacienteServices';
import { useState } from 'react';
import { useEffect } from 'react';
import { classificarFrequenciaCardiaca, classificarFrequenciaRespiratoria, classificarPressaoDiastolica, classificarPressaoSistolica, classificarTemperaturaCelsius, gerarResultadoExameCovid } from '../../services/Utils';
import { Atendimento } from '../../dto/Atendimento';
import { Examegeral } from '../../dto/Examegeral';
import { Paciente } from '../../dto/Paciente';
import { Examecovid } from '../../dto/Examecovid';
import { generatePDF } from '../../services/Util';
import { FaDownload } from 'react-icons/fa';


const AtendimentoDetailPage = () => {
    const { atendimentoid, pacienteid } = useParams();
    const [paciente, setPaciente] = useState<Paciente>();
    const [atendimento, setAtendimento] = useState<Atendimento>();
    const [examegeral, setExamegeral] = useState<Examegeral>();
    const [examecovid, setExamecovid] = useState<Examecovid>();
    const navigate = useNavigate();
    useEffect(() => {
        buscarDadosAtendimento();
    }, []);

    async function buscarDadosAtendimento() {
        try {
            if (pacienteid && atendimentoid) {
                let dadosexamegeral = (await findExamegeralByPacienteIdAndAtendimentoId(Number(pacienteid), Number(atendimentoid))).data;
                setExamegeral(dadosexamegeral[0]);
                if (dadosexamegeral.length > 0 && dadosexamegeral[0].atendimento) {
                    setAtendimento(dadosexamegeral[0].atendimento);
                }
                else {
                    setAtendimento((await findAtendimentoByPacienteIdAndAtendimentoId(Number(pacienteid), Number(atendimentoid))).data[0]);
                }
                if (dadosexamegeral.length > 0 && dadosexamegeral[0].atendimento?.paciente) {
                    setPaciente(dadosexamegeral[0].atendimento.paciente);
                }
                else {
                    setPaciente((await findByPacienteId(Number(pacienteid))).data[0]);
                }

                setExamecovid((await findExamecovidByPacienteIdAndAtendimentoId(Number(pacienteid), Number(atendimentoid))).data[0]);

            }
            else {
                navigate("/Atendimento");
            }
        }
        catch (e) {
            navigate("/Atendimento");
        }

    }

    function getCurrentLocaleDateAndTimeString(){
      let currentdate=new Date();
      return currentdate.toLocaleDateString()+" "+currentdate.toLocaleTimeString();
    }

    return (
        <main>
      <div id="relatorioatendimento">
        {/* Atendimento */}
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Atendimento de Paciente</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Código: {(atendimento)?atendimento.id:""}</td>
              <td>
                Data do atendimento:{" "}
                {(atendimento)?new Date(atendimento.datahoraatendimento).toLocaleDateString("pt-BR"):""}
              </td>
            </tr>
            <tr>
              <td>Paciente: {paciente?.nome || ""}</td>
              <td>
                Data de Nascimento:{" "}
                {(paciente)?new Date(paciente.datanascimento).toLocaleDateString("pt-BR"):""}
              </td>
            </tr>
          </tbody>
        </table>

          {/*Pressão*/}
          <h3 className="text-center">Exame Geral</h3>
          <br />
          <table>
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={3}>
                  Pressão
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho" colSpan={3}>
                  Valores de Referência
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho">Nomenclatura</th>
                <th className="tbcabecalho">Sistólica</th>
                <th className="tbcabecalho">Diastólica</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hipotenso</td>
                <td>Abaixo de 90</td>
                <td>Abaixo de 60</td>
              </tr>
              <tr>
                <td>Normotenso</td>
                <td>90-130</td>
                <td>60-85</td>
              </tr>
              <tr>
                <td>Normotenso Limítrofe</td>
                <td>130-139</td>
                <td>85-89</td>
              </tr>
              <tr>
                <td>Hipertenso Leve</td>
                <td>140-159</td>
                <td>90-99</td>
              </tr>
              <tr>
                <td>Hipertenso Moderado</td>
                <td>160-179</td>
                <td>100-109</td>
              </tr>
              <tr>
                <td>Hipertenso Grave</td>
                <td>Acima de 180</td>
                <td>Acima de 110</td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={3}>
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {(examegeral)?classificarPressaoSistolica(examegeral.pressaosistolica):""}
                </td>
                <td>{examegeral?.pressaosistolica || ""}</td>
                <td>{examegeral?.pressaodiastolica || ""}</td>
              </tr>
            </tbody>
          </table>

          <br />
          <br />

          {/*Pulsação*/}

          <table>
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Pulsação
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Valores de Referência
                </th>
              </tr>
              <tr>
                <th>Nomenclatura</th>
                <th className="tbcabecalho">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bradicárdico</td>
                <td>Abaixo de 60 bpm</td>
              </tr>
              <tr>
                <td>Normocárdico</td>
                <td>60-100 bpm</td>
              </tr>
              <tr>
                <td>Taquicárdico</td>
                <td>Acima de 100bpm</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>
              Adultos: 60 - 100 bpm; Crianças: 80 - 130bpm; Lactentes: 120 - 160
              bpm
            </p>
          </div>

          <table>
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                
                <td>
                  {(examegeral && paciente)?classificarFrequenciaCardiaca(examegeral.pulsacao, paciente.datanascimento):""}
                </td>
                <td>{examegeral?.pulsacao || ""}</td>
              </tr>
            </tbody>
          </table>

          <br />
          <br />

          {/*Respiração*/}

          <table>
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Respiração
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Valores de Referência
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho">Nomenclatura</th>
                <th className="tbcabecalho">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bradipnéico</td>
                <td>Abaixo de 14 irpm</td>
              </tr>
              <tr>
                <td>Eupnéico</td>
                <td>14-20 irpm</td>
              </tr>
              <tr>
                <td>Taquipnéico</td>
                <td>Acima de 20 irpm</td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {(examegeral)?classificarFrequenciaRespiratoria(examegeral.respiracao):""}
                </td>
                <td>{examegeral?.respiracao || ""}</td>
              </tr>
            </tbody>
          </table>

          <br />
          <br />
          {/*Temperatura*/}

          <table>
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Temperatura
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Valores de Referência
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho">Nomenclatura</th>
                <th className="tbcabecalho">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hipotermia</td>
                <td>Abaixo de 35°C</td>
              </tr>
              <tr>
                <td>Normotermia ou afebril</td>
                <td>35°C-37,2C</td>
              </tr>
              <tr>
                <td>Estado febril/subfebril ou febrícula</td>
                <td>37,2-37,7C</td>
              </tr>
              <tr>
                <td>Febre</td>
                <td>37,7°C-38,9C</td>
              </tr>
              <tr>
                <td>Pirexia</td>
                <td>38,9C-40°C</td>
              </tr>
              <tr>
                <td>Hiperpirexia</td>
                <td>Acima de 40°C</td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {(examegeral)?classificarTemperaturaCelsius(examegeral.temperatura):""}
                </td>
                <td>{examegeral?.temperatura || ""}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-center">Exame Covid</h3>
          <br/>
          <br/>
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Status</th>
                <th>Descrição</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Febre</td>
                <td>
                  {(examecovid?.febre)?"Sim":"Não"}
                </td>
                <td>Coriza</td>
                <td>
                  {(examecovid?.coriza)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Nariz entupido</td>
                <td>
                  {(examecovid?.narizentupido)?"Sim":"Não"}
                </td>
                <td>Cansaço</td>
                <td>
                  {(examecovid?.cansaco)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Tosse</td>
                <td>
                  {(examecovid?.tosse)?"Sim":"Não"}
                </td>
                <td>Dor de Cabeça</td>
                <td>
                  {(examecovid?.dordecabeca)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Dores no Corpo</td>
                <td>
                  {(examecovid?.doresnocorpo)?"Sim":"Não"}
                </td>
                <td>Mal Estar Geral</td>
                <td>
                  {(examecovid?.malestargeral)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Dor de Garganta</td>
                <td>
                  {(examecovid?.dordegarganta)?"Sim":"Não"}
                </td>
                <td>Dificuldade de Respirar</td>
                <td>
                  {(examecovid?.dificuldadederespirar)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Falta de Paladar</td>
                <td>
                  {(examecovid?.faltadepaladar)?"Sim":"Não"}
                </td>
                <td>Falta de Olfato</td>
                <td>
                  {(examecovid?.faltadeolfato)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Dificuldade de Locomoção</td>
                <td>
                  {(examecovid?.dificuldadedelocomocao)?"Sim":"Não"}
                </td>
                <td>Diarreia</td>
                <td>
                  {(examecovid?.diarreia)?"Sim":"Não"}
                </td>
              </tr>
              
            </tbody>
          </table>
          <table>
            
          <thead>
            <tr>
              <th>Resultado</th>
              <th>{(examecovid)?gerarResultadoExameCovid(examecovid):""}</th>
            </tr>
          </thead>
          </table>
          <br/>
          <p>Emitido em: {getCurrentLocaleDateAndTimeString()}</p>
        </div>
        <br/>
      {
        
        <div style={{ alignItems: "center" }}>
          <button onClick={()=>{generatePDF(document.querySelector("#relatorioatendimento"))}}><FaDownload/> Dowload Exame PDF</button>
        </div>
      }

        </main>
    )
}

export default AtendimentoDetailPage;