import http from "../../http-common";
import { useEffect, useState } from "react";
import Barchart from "../../components/Charts/BarChart";
import { DataSummaryOfChart } from "../DataSummaryOfChart";

import "../styles-global.css";
import vcfFileSession from "../../services/vcfFileSession";

export const QualityChart = () => {
  const [chartData, setChartData] = useState({
    labels: {
      categories: [],
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    http
      .get(`/summaryquality?idvcf=${vcfFileSession.getIdVcf()}`)
      .then((response) => {
        const data = response.data;
        const mySeries = data.map((x) => x.qualityCount);
        const myLabels = data.map((x) => x.quality.toString());
        // console.log(mySeries)
        setChartData({
          labels: {
            categories: myLabels,
            // hideOverlappingLabels: true,
            // minHeight: 500,
            // formatter: "numeric"
            // formatter: (val) => {
            //   return val
            // }
          },
          series: [
            {

              labels: ["labels"],
              data: mySeries,
            },
          ],
        });
      });
  }, []);

  return (
    <div className="box-statistics  p-3 d-flex flex-wrap align-content-start">
      <div className="box-chart">
        <Barchart
          labels={chartData.labels}
          series={chartData.series}
          titleLateral="Number of Variants"
          titleDown="QUAL Values"
        />
      </div>
      <DataSummaryOfChart />
    </div>
  );
};
