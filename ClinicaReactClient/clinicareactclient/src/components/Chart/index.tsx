/*
import React, {useEffect} from 'react'
import ReactApexChart from 'react-apexcharts'

export interface RelatorioMonitorExameCovid{
  periodos: string[];
  totalatendimentos: number[];
  totalpossivelmenteinfectados: number[];
  totalpotencialmenteinfectados: number[];
}




type Props = {dadosrelatorio:RelatorioMonitorExameCovid};

const Chart = (props: Props) => {

  useEffect(()=>{
      renderizarGrafico(props.dadosrelatorio, document.querySelector("#grafico"));
  },[props.dadosrelatorio])

  return (
    <div id="grafico">

    </div>
  )
}

export default Chart;




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
      text: '',
      align: 'center'
    }
  });
  myChart.render();


  
  function renderizarGrafico2(headersrelatorio:string[],dadosrelatorio:MonitorExameCovid[], element:any){
    
    let series=headersrelatorio.map(header=>{
      return(
        {
          name: header,
          data: []
        })
    })
    dadosrelatorio.map((dadorelatorio)=>{
      let keys=Object.keys(dadosrelatorio);
      keys.forEach((key:string,index:number)=>{
        series[index].data[series[index].data.length]=dadorelatorio[key];
      })
      for(let key in dadorelatorio=>{
        dadorelatorio[key]

      })
    })
    
    let myChart = new ReactApexChart(element, {
      chart: {
        type: "area",
      },

      
      series: [
        headersrelatorio.forEach(header=>{
          return(
            {
              name: header,
              data: dadosrelatorio.totalatendimentos,
            })
        })
      ]
      ,
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
        text: '',
        align: 'center'
      }
    });
    myChart.render();
  }


}*/