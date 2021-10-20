import Chart from "react-apexcharts";

export default function Barchart({
  labels,
  series,
  sizeDataLabel,
  titleLateral,
  titleDown,
  sizeLabelFont,
}) {
  const chartData = {
    labels: labels,
    series: series,
  };

  const options = {
    // chart: {
    //   height: 500,
    //   type: "bar",
    // },
    plotOptions: {
      bar: {
        // horizontal: true,
        // vertical: true,
        // distributed: true,
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "";
      },
      offsetY: 2,
      style: {
        fontSize: sizeDataLabel ? sizeDataLabel : "12px",
        colors: ["#304758"],
      },
    },
    yaxis: {
      title: {
        text: titleLateral,
        offsetX: -7,
        offsetY: -20,
        style: {
          color: undefined,
          fontSize: "15px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-title",
        },
      },
      // labels: {
      //   show: true,
      //   formatter: function (val) {
      //     return val + "%";
      //   },
      // },
    },
    title: {
      text: titleDown,
      floating: false,
      offsetY: 363,
      align: "center",
      style: {
        color: "#444",
      },
    },
  };

  return (
    
        <Chart
          options={{
            ...options,
            xaxis: {
              ...chartData.labels,
              labels: {
                style: {
                  colors: [],
                  fontSize: sizeLabelFont ? sizeLabelFont : "12px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 380,
                  cssClass: "apexcharts-xaxis-label",
                },
                offsetX: 0,
                offsetY: -3,
              },
              tooltip: {
                enabled: true,
                // formatter: (val) => {
                //   return val + "g";
                // },
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: 0,
                },
                x: {
                  show: true,
                  format: "dd MMM",
                  formatter: (seriesName) => seriesName,
                },
                //   y: {
                //     formatter: (seriesName) => seriesName,
                //     // title: {
                //     //     formatter: (seriesName) => seriesName,
                //     // },
                // },
              },
              yaxis: {
                labels: {
                  show: true,
                  formatter: function (val) {
                    return val + "%";
                  },
                },
              },
            },
          }}
          series={chartData.series}
          type="bar"
          height="380"
        />
  );
}
