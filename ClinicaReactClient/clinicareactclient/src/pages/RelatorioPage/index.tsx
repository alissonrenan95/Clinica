import React, { useEffect, useState } from "react";
import ReactApexChart, { ApexOptions } from "apexcharts";
import { findMonitorExamecovid, findMonitorFaixaEtariacovid } from "../../services/RelatorioServices";
import { mesesextenso } from "../../services/Utils";
import DonutChart, { DonutChartProps } from "../../components/Charts/DonutChart";


interface MonitorExameCovid{
  ano:number;
  mes:number;
  totalatendimentos:number;
  totalpossivelmenteinfectados:number;
  totalpotencialmenteinfectados:number;
}

interface RelatorioMonitorExameCovid{
  periodos: string[];
  totalatendimentos: number[];
  totalpossivelmenteinfectados: number[];
  totalpotencialmenteinfectados: number[];
}



const RelatorioPage = () => {

  const [dadosrelatorio, setDadosrelatorio] = useState<RelatorioMonitorExameCovid>({periodos:[], totalatendimentos:[],totalpossivelmenteinfectados:[],totalpotencialmenteinfectados:[]});

  const [donutchartpropsatendimentos, setDonutchartpropsatendimentos]=useState<DonutChartProps>();
  const [donutchartpropsfaixaetaria, setDonutchartpropsfaixaetaria]=useState<DonutChartProps>();

  useEffect(() => {
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

        setDadosrelatorio(dados);
        renderizarGrafico(dados,document.querySelector("#grafico"));

        //dados para grafico atendimentos por mes
        let series=dados.totalatendimentos;
        let options:ApexOptions={
          chart: {
            type: 'donut',
          },
          title:{
            text:"Atendimentos/Mês",
            align:"center"
          },
          labels: dados.periodos,
          
        }
        setDonutchartpropsatendimentos({series, options});

        //dados para grafico faixa etaria covid
        let dadosmonitorfaixaetariadb=(await findMonitorFaixaEtariacovid()).data;
        let headersfaixaetaria:string[]=[];
        let dadosgraficofaixaetaria:number[]=[]
        dadosmonitorfaixaetariadb.forEach((element:{faixaetaria:number,totalpotencialmenteinfectados:number}) => {
          headersfaixaetaria[headersfaixaetaria.length]=(element.faixaetaria-1)*10+1+" a "+(element.faixaetaria)*10+" anos";
          dadosgraficofaixaetaria[dadosgraficofaixaetaria.length]=element.totalpotencialmenteinfectados;
        });
        let seriesfaixaetaria=dadosgraficofaixaetaria;
        let optionsfaixaetaria:ApexOptions={
          chart: {
            type: 'donut',
          },
          title:{
            text:"Faixa Etária Potencialmente Infectados",
            align:"center"
          },
          labels: headersfaixaetaria,
        }
        setDonutchartpropsfaixaetaria({series:seriesfaixaetaria,options:optionsfaixaetaria});

        
      } catch (exception) {
        console.log(exception);
      }
    
    
    }
    fetchData();
  }, []);

  function renderizarGrafico(dadosrelatorio: RelatorioMonitorExameCovid, element:any){
    let myChart = new ReactApexChart(element, {
      chart: {
        type: "area",
      },
      series: [
        
        {
          name: "Total atendimentos",
          data: dadosrelatorio.totalatendimentos,
        },
        {
          name: "Possivelmente Infectados",
          data: dadosrelatorio.totalpossivelmenteinfectados,
        },
        {
          name: "Potencialmente Infectados",
          data: dadosrelatorio.totalpotencialmenteinfectados,
        },
      ],
      yaxis: {
        opposite: false,
      },
      xaxis: {
        name: "Período",
        categories: dadosrelatorio.periodos,
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Acompanhamento Covid',
        align: 'center'
      }
    });
    myChart.render();

  }


  


  return (
    <main>
      <div>
        <h1>Relatórios</h1>
      </div>
      
      <div className="graficos">
        <div id="grafico" className="grafico" ></div>
        {(donutchartpropsatendimentos)?<DonutChart donutchartprops={donutchartpropsatendimentos} />:<></>}
        {(donutchartpropsfaixaetaria)?<DonutChart donutchartprops={donutchartpropsfaixaetaria} />:<></>}
      </div>
    </main>
  );
};

export default RelatorioPage;