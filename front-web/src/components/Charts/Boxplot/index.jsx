import ReactApexChart from "react-apexcharts";
import { VariantTypes } from "../../../utils/tokens";

export const BoxPlot = ({ eixosBoxPlot, pontosEixoX, outliersBoxPlot }) => {
  const eixos = eixosBoxPlot;
  const outiliers = outliersBoxPlot;

  console.log("NOme do Ponto: ", eixos[0]);
  const series = [
    {
      name: "box",
      type: "boxPlot",
      data: eixos,
      zoom: {
        autoScaleYaxis: true
      }
    },

    {
      name: "outliers",
      type: "scatter",
      data: outiliers,
      zoom: {
        autoScaleYaxis: true
      }
    },
  ];
  const options = {
    chart: {
      type: "boxPlot",
      height: 350,
    },
    colors: ["#008FFB", "#FEB019"],
    title: {
      text: "BoxPlot INFO",
      align: "left",
    },

    xaxis: {
      type: "numeric",
      tickAmount: undefined,
      tickPlacement: 'between',
      
      overwriteCategories: pontosEixoX,
      // offsetX: 50,
      // offsetY: 0,
      // maxHeight: 300,
      crosshairs: {
        show: true,
        width: 10,
        position: 'back',
        opacity: 0.9,        
        stroke: {
            color: '#b6b6b6',
            width: 0,
            dashArray: 0,
        },
        fill: {
            type: 'solid',
            color: '#B1B9C4',
            gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
            },
        },
        dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 1,
            opacity: 0.4,
        },
    },
      tooltip: {
        formatter: function (val) {
          // return new Date(val).getFullYear();
          console.log("Value: ", val)
          if (val === 1) {
            return "All Variants Types";
          }
          if (val === 2) {
            return "SNP";
          }
          if (val === 3) {
            return "INDEL";
          }
          return val
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: true,   
    },
  };

  return (

    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="boxPlot"
        height={400}
      />
    </div>
  );
};
