import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart from 'react-apexcharts';


export interface DonutChartProps{
  title:string;
  labels:string[];
  data:number[];
}
/*example
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
        props={series,options}
*/

type Props={donutchartprops:DonutChartProps};

const DonutChart = (props: Props) => {
  
  let options:ApexOptions={
    chart: {
      type: 'donut',
    },
    title:{
      text: props.donutchartprops.title,
      align:"center"
    },
    labels: props.donutchartprops.labels,
    
  }

  return (
    <div id="chart" className="grafico">
        <ReactApexChart series={props.donutchartprops.data} options={options} type="donut" />
    </div>
  )
}

export default DonutChart;

      
        
      
      
