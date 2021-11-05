import axios from "axios";
import { useEffect, useState } from "react";
import Barchart from "../../components/Charts/BarChart";
import { DataSummaryOfChart } from "../DataSummaryOfChart";
// import { Link } from "react-router-dom";

import "../styles-global.css";

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
  // const [categories, setCategories] = useState();
  // const [data, setData] = useState([]);
  // const [cont, setCont] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/quality-summary`).then((response) => {
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
            // name: (val) => {
            //   return val;
            // },
            labels: ["lmml"],
            data: mySeries,
          },
        ],
      });
      // setData(mySeries);
      // console.log("Imprimiu AQUI 123");
    });
  }, []);

  return (
   
    <div className="box-statistics  p-3 d-flex flex-wrap align-content-start">
       {console.log("Passou AQUI 123")}
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
