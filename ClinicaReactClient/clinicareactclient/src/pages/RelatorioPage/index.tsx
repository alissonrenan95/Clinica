import React, { useEffect, useState } from "react";
import ReactApexChart from "apexcharts";
import { findMonitorExamecovid } from "../../services/RelatorioServices";


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
  let mesesextenso = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];


  

  const [dadosrelatorio, setDadosrelatorio] = useState<RelatorioMonitorExameCovid>({periodos:[], totalatendimentos:[],totalpossivelmenteinfectados:[],totalpotencialmenteinfectados:[]});

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
        let myChart = new ReactApexChart(document.querySelector("#grafico"), {
          chart: {
            type: "area",
          },
          series: [
            {
              name: "Total atendimentos",
              data: dados.totalatendimentos,
            },
            {
              name: "Possivelmente Infectados",
              data: dados.totalpossivelmenteinfectados,
            },
            {
              name: "Potencialmente Infectados",
              data: dados.totalpotencialmenteinfectados,
            },
          ],
          yaxis: {
            opposite: false,
          },
          xaxis: {
            name: "Período",
            categories: dados.periodos,
          },
          dataLabels: {
            enabled: false,
          },
          title: {
            text: '',
            align: 'center'
          }
        });
        myChart.render();
      } catch (exception) {
        console.log(exception);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="container">
      <h1 className="title">Relatório</h1>
      <br/><br/>
      <div id="grafico"></div>
    </main>
  );
};

export default RelatorioPage;