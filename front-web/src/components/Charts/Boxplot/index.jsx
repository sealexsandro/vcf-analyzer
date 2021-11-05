import ReactApexChart from "react-apexcharts";

export const BoxPlot = ({ eixosBoxPlot }) => {
  const eixos = eixosBoxPlot;

  // const fullVariantsTypes = 0;
  // const indels = 1;

  const series = [
    {
      name: "box",
      type: "boxPlot",
      data: eixos,
    // {
    //   name: "outliers",
    //   type: "scatter",
    //   data: [
    //     { x: 0, y: 29 },
    //     { x: 0, y: 28 },
    //     // { x: 1, y: 29 },
    //     // { x: 1, y: 28 },
    
    //   ],
    },
  ];
  const options = {
    chart: {
      type: "boxPlot",
      height: 350,
    },
    colors: ["#008FFB", "#FEB019"],
    title: {
      text: "BoxPlot - Scatter Chart",
      align: "left",
    },
    // xaxis: {
    //   // type: "numeric",
    //   // categories: [maria,joao],
    //   // tickAmount: 1,
    //   labels: {
    //     formatter: function (val) {
    //       // console.log("Valor: -> " + val);
    //       if (val === 0) {
    //         return maria;
    //       } else if (val === 1) {
    //         return joao;
    //       }
    //     },
    //   },
    //   tooltip: {
    //     formatter: function (val) {
    //       // val = parseInt(val);
    //       // console.log("Valor 2: -> " + val);
    //       // if (val === 0) {
    //       //   return maria;
    //       // }
    //       // if (val === 1) {
    //       //   return joao;
    //       // }

    //       return parseInt(val);
    //     },
    //   },
    // },
    tooltip: {
      shared: false,
      intersect: true,
    },
  };

  return (
    // <div>
    //   <>
    //     {eixos && (
    //       <Charts
    //         options={options}
    //         series={series}
    //         type="boxPlot"
    //         height={350}
    //       />
    //     )}
    //   </>
    // </div>
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="boxPlot"
        height={350}
      />
    </div>
  );
};
