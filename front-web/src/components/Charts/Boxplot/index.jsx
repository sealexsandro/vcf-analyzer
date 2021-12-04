import ReactApexChart from "react-apexcharts";

export const BoxPlot = ({ eixosBoxPlot, pontosEixoX, outliersBoxPlot }) => {
  const eixos = eixosBoxPlot;
  const outiliers = outliersBoxPlot;

  const series = [
    {
      name: "box",
      type: "boxPlot",
      data: eixos,
      zoom: {
        enabled: false,
      },
    },

    {
      name: "outliers",
      type: "scatter",
      data: outiliers,
      zoom: {
        enabled: false,
        type: "xy",
      },
      toolbar: {
        show: false,
      },
    },
  ];
  const options = {
    chart: {
      type: "boxPlot",
      height: 350,
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    // boxPlot:{

    // },

    colors: ["#008FFB", "#FEB019"],
    title: {
      text: "BoxPlot INFO",
      align: "left",
    },

    xaxis: {
      type: "numeric",
      // tickAmount: "dataPoints",
      // tickPlacement: "between",

      overwriteCategories: {
        formatter: function (val) {
          // return new Date(val).getFullYear();
          console.log("Value: ", val);
          if (val === 1) {
            return "All Variants Types";
          }
          if (val === 2) {
            return "SNP";
          }
          if (val === 3) {
            return "INDEL";
          }
          return "";
        },
      },
      min: 0.6,
      max: 3.1,
      labels: {
        style: {
          colors: [],
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
          paddingLeft: "50px",
        },
        // offsetX: 17,
        offsetY: 0,
      },
      crosshairs: {
        show: true,
        opacity: 0.9,
        stroke: {
          color: "#b6b6b6",
          width: 12,
          dashArray: 0,
        },
        fill: {
          type: "solid",
          color: "#B1B9C4",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        formatter: function (val) {
          // return new Date(val).getFullYear();
          // console.log("Value: ", val);
          if (val === 1) {
            return "All Variants Types";
          }
          if (val === 2) {
            return "SNP";
          }
          if (val === 3) {
            return "INDEL";
          }
          return val;
        },
      },
    },
    yaxis: {
      show: true,
      showAlways: true,
      showForNullSeries: true,
      seriesName: undefined,
      opposite: false,
      reversed: false,
      logarithmic: false,
      tickAmount: 5,
      axisBorder: {
        show: true,
        color: "#78909C",
        offsetX: -10,
        offsetY: 0,
      },
    },
    tooltip: {
      shared: false,
      intersect: false,
      //   fixed: {
      //     enabled: true,
      //     position: 'topRight',
      //     offsetX: 0,
      //     offsetY: 0,
      // },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="boxPlot"
        height={400}
        // width={530}
      />
    </div>
  );
};
