import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart from 'react-apexcharts';


export interface AreaChartProps {
    title: string;
    labels: string[];
    series: AreaChartSerie[];
}

export interface AreaChartSerie {
    name: string,
    data: number[];
}

type Props = { areachartprops: AreaChartProps };

const AreaChart = (props: Props) => {

    let options: ApexOptions = {

        series: props.areachartprops.series,
        chart: {
            type: 'area'
        },
        title: {
            text: props.areachartprops.title,
            align: "center"
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: props.areachartprops.labels,
        },

        yaxis: {
            opposite: false,
        },
    };


    return (
            <ReactApexChart options={options} series={props.areachartprops.series} type="area" />
    )
}
export default AreaChart;