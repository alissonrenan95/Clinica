import React, { useEffect, useState } from "react";
import "./styles.css";
import { findMonitorExamecovid, findMonitorFaixaEtariaAtendimentos, findMonitorFaixaEtariaExamecovid } from "../../services/RelatorioServices";
import { mesesextenso } from "../../services/Utils";
import DonutChart, { DonutChartProps } from "../../components/Charts/DonutChart";
import { FaClinicMedical, FaHandHoldingMedical, FaMedkit, FaUsers } from "react-icons/fa";
import { AreaChartProps, AreaChartSerie } from "../../components/Charts/AreaChart";
import AreaChart from "../../components/Charts/AreaChart";

//formato que vem do banco de dados
interface MonitorExameCovid{
  ano:number;
  mes:number;
  totalatendimentos:number;
  totalpossivelmenteinfectados:number;
  totalpotencialmenteinfectados:number;
}

//formato pro relatório
interface RelatorioMonitorExameCovid{
  periodos: string[];
  totalatendimentos: number[];
  totalpossivelmenteinfectados: number[];
  totalpotencialmenteinfectados: number[];
}



const RelatorioPage = () => {

  const [resumeatendimentos,setResumeatendimentos]=useState<number>(0);
  const [resumepotencialmenteinfectados, setResumepotencialmenteinfectados]=useState<number>(0);
  const [resumepossivelmenteinfectados, setResumepossivelmenteinfectados]=useState<number>(0);
  const [areachartpropsacompanhamento, setAreachartpropsacompanhamento]=useState<AreaChartProps>();
  const [donutchartpropsatendimentos, setDonutchartpropsatendimentos]=useState<DonutChartProps>();
  const [donutchartpropsfaixaetariacovid, setDonutchartpropsfaixaetariacovid]=useState<DonutChartProps>();
  const [donutchartpropsfaixaetariaatendimentos,setDonutchartpropsfaixaetariaatendimentos]=useState<DonutChartProps>();

  useEffect(() => {
    
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data } = await findMonitorExamecovid();
      let dadosdb:MonitorExameCovid[]=data;
      let dados:RelatorioMonitorExameCovid={periodos:[], totalatendimentos:[],totalpossivelmenteinfectados:[],totalpotencialmenteinfectados:[]};
      dadosdb.map((dado) => {
        dados.periodos[dados.periodos.length] = dado.ano + "/" + mesesextenso[dado.mes];
        dados.totalatendimentos[dados.totalatendimentos.length] = dado.totalatendimentos;
        dados.totalpossivelmenteinfectados[dados.totalpossivelmenteinfectados.length] = dado.totalpossivelmenteinfectados;
        dados.totalpotencialmenteinfectados[dados.totalpotencialmenteinfectados.length] = dado.totalpotencialmenteinfectados;
      });
      dados.periodos.reverse();
      dados.totalatendimentos.reverse();
      dados.totalpossivelmenteinfectados.reverse();
      dados.totalpotencialmenteinfectados.reverse();

      let titleacompanhamentocovid="Acompanhamento Covid";
      let headersacompanhamentocovid:string[]=dados.periodos;
      let seriesacompanhamentocovid:AreaChartSerie[]=[
        {name:"Total Atendimentos",data:dados.totalatendimentos},
        {name:"Possivelmente Infectados", data:dados.totalpossivelmenteinfectados},
        {name:"Potencialmente Infectados", data:dados.totalpotencialmenteinfectados}];
      setAreachartpropsacompanhamento({title:titleacompanhamentocovid,labels:headersacompanhamentocovid,series:seriesacompanhamentocovid});

      
      //dados para grafico atendimentos por mes
      let nomegraficoatendimentos="Atendimentos/Mês";
      let series=dados.totalatendimentos;
      setDonutchartpropsatendimentos({title:nomegraficoatendimentos,labels:dados.periodos,data:series});

      //dados para resumeatendimentos;
      let totalatendimentos=series.reduce((prev:number, curr:number)=>{return prev+curr});
      setResumeatendimentos(totalatendimentos);

      

      //dados para grafico faixa etaria exame covid potencialmente infectados
      let nomegraficofaixaetaria="Faixa Etária Potencialmente Infectados";
      let dadosmonitorfaixaetariadb=(await findMonitorFaixaEtariaExamecovid()).data;
      let headersfaixaetaria:string[]=[];
      let dadosgraficofaixaetaria:number[]=[]
      dadosmonitorfaixaetariadb.forEach((element:{faixaetaria:number,totalpotencialmenteinfectados:number}) => {
        headersfaixaetaria[headersfaixaetaria.length]=(element.faixaetaria-1)*10+1+" a "+(element.faixaetaria)*10+" anos";
        dadosgraficofaixaetaria[dadosgraficofaixaetaria.length]=element.totalpotencialmenteinfectados;
      });
      let seriesfaixaetaria=dadosgraficofaixaetaria;
      setDonutchartpropsfaixaetariacovid({title:nomegraficofaixaetaria, labels:headersfaixaetaria, data:seriesfaixaetaria});

      //dados para resumepotencialmenteinfectados;
      let totalpotencialmenteinfectados=seriesfaixaetaria.reduce((prev:number, curr:number)=>{return prev+curr});
      setResumepotencialmenteinfectados(totalpotencialmenteinfectados);

      //dados para grafico faixa etaria atendimentos
      let nomegraficofaixaetariaatendimentos="Faixa Etária Atendimentos";
      let dadosmonitorfaixaetariaatendimentosdb=(await findMonitorFaixaEtariaAtendimentos()).data;
      let headersfaixaetariaatendimentos:string[]=[];
      let dadosgraficofaixaetariaatendimentos:number[]=[]
      dadosmonitorfaixaetariaatendimentosdb.forEach((element:{faixaetaria:number,totalatendimentos:number}) => {
        headersfaixaetariaatendimentos[headersfaixaetariaatendimentos.length]=(element.faixaetaria-1)*10+1+" a "+(element.faixaetaria)*10+" anos";
        dadosgraficofaixaetariaatendimentos[dadosgraficofaixaetariaatendimentos.length]=element.totalatendimentos;
      });
      let seriesfaixaetariaatendimentos=dadosgraficofaixaetariaatendimentos;
      setDonutchartpropsfaixaetariaatendimentos({title:nomegraficofaixaetariaatendimentos, labels:headersfaixaetariaatendimentos, data:seriesfaixaetariaatendimentos});

      

    } catch (exception) {
      console.log(exception);
    }
  
  
  }

  return (
    <main>
      <div className="bg-main">
        
      </div>
      <div>
        <h1 className="header-report">Relatórios</h1>
      </div>
      <div className="resumes">
          <div className="resume"><div><p>Total Atendimentos</p><h3>{resumeatendimentos}</h3></div><div className="fundo-redondo"><FaClinicMedical /></div></div>
          <div className="resume"><div><p>Potenc. Infectados</p><h3>{resumepotencialmenteinfectados}</h3></div><div className="fundo-redondo"><FaHandHoldingMedical /></div></div>
          <div className="resume"><div><p>Possiv. Infectados</p><h3>{resumepossivelmenteinfectados}</h3></div><div className="fundo-redondo"><FaUsers /></div></div>
      </div>
      <div className="graficos">
        
        {(areachartpropsacompanhamento)?<AreaChart areachartprops={areachartpropsacompanhamento}/>:<></>}
        {(donutchartpropsatendimentos)?<DonutChart donutchartprops={donutchartpropsatendimentos} />:<></>}
        {(donutchartpropsfaixaetariacovid)?<DonutChart donutchartprops={donutchartpropsfaixaetariacovid} />:<></>}
        {/*(donutchartpropsfaixaetariaatendimentos)?<DonutChart donutchartprops={donutchartpropsfaixaetariaatendimentos} />:<></>*/}
      </div>
    </main>
  );
};

export default RelatorioPage;