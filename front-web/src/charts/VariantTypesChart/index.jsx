import axios from "axios";
import { useEffect, useState } from "react";
import Barchart from "../../components/Charts/BarChart";
import { DataSummaryOfChart } from "../DataSummaryOfChart";

export const VariantTypesChart = () => {
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
    axios
      .get(`http://localhost:8080/variant-types?id=${2}`)
      .then((response) => {
        const result = response.data;

        const { snp, indel } = result;

        // const variacoes = [];
        // result.forEach((variacao, index) => {
        //   variacoes[index] = {
        //     index: index,
        //     snp: variacao.snp,
        //     indel: variacao.indel,
        //     type: tag.type,
        //     description: tag.description,
        //   };
        // });

        console.log(snp);
        console.log(indel);
        const mySeries = [snp, indel];
        const myLabels = ["SNP", "INDEL"];
        //     const myLabels = data.map((x) => x.quality.toString());

        setChartData({
          labels: {
            categories: myLabels,
          },
          series: [
            {
              labels: ["lmml"],
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
          sizeDataLabel="14px"
          sizeLabelFont="15px"
        />
      </div>
      <DataSummaryOfChart />
    </div>
  );
};
