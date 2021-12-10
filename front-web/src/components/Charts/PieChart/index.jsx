import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import http from "../../../http-common";
import vcfFileSession from "../../../services/vcfFileSession";
import Chart from "react-apexcharts";

export const PieChart = ({ tagInfoCol }) => {
  const { tagField } = tagInfoCol;
  const tagInfo = tagInfoCol;
  const [infoData, setInfoData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    series: [],
  });

  useEffect(() => {
    http.get(`/info-summary?field_info=${tagField}&id=1`).then((response) => {
      const results = response.data;
      let data = [];
      console.log("Results: ", results);
      results.forEach((infoSummary, index) => {
        data[index] = {
          index: index,
          infoName: infoSummary.infoName,
          variantType: infoSummary.variantType,
          infoValue: infoSummary.infoValue,
          infoCount: infoSummary.infoCount,
        };
        console.log("Dados: ", data);
      });
      // setInfoData(data);
      const myLabels = data.map(
        (x) => `Amount of ${tagField} equal to ${x.infoValue}`
      );
      const mySeries = data.map((x) => x.infoCount);
      setChartData({ labels: myLabels, series: mySeries });
    });
  }, [tagField]);

  // console.log("Labels: ", myLabels)
  // console.log("Series: ", mySeries)

  const options = {
    chart: {
      width: 500,
      type: "pie",
    },
 
    responsive: [
      {
        breakpoint: 500,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "top",
          },
        },
      },
    ],
  };
  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="pie"
      width="500"
      height="500"
    />
  );
};
