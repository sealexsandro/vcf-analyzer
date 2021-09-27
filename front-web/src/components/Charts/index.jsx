import axios from "axios";
import { useEffect, useState } from "react";
import Barchart from "../BarChart";

export const Charts = () => {
  const { chartData, setChartData } = useState({
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
    axios.get(`localhost:8080/quality-summary`).then((response) => {
      const data = response.data;
      const myLabels = data.map((x) => x.quality);
      const mySeries = data.map((x) => x.qualityCount);

      setChartData({
        labels: {
          categories: myLabels,
        },
        series: [
          {
            name: "% Sucess",
            data: mySeries,
          },
        ],
      });
    });
  }, []);

  const qualityChart = () => {
    return chartData;
  };

  return (
    <div className="container-fluid d-flex flex-xl-row flex-column justify-content-between container-table">
      <div className="align-self-start">
        <div>
          <button className="button-add-filter btn btn-outline-info">
            Barchart
          </button>
        </div>
      </div>
      <div className="col-sm-10 d-flex flex-column ">
        <Barchart />
      </div>
    </div>
  );
};
