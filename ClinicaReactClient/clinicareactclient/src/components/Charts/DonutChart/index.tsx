import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart from 'react-apexcharts';


export interface DonutChartProps{
  series:number[];
  options?:ApexOptions
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

  return (
    <div id="chart" className="grafico">
        <ReactApexChart series={props.donutchartprops.series} options={props.donutchartprops.options} type="donut" />
    </div>
  )
}

export default DonutChart;

      
        
      
      
