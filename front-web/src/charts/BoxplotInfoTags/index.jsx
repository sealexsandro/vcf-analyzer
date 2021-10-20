import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import { BoxPlot } from "../../components/Charts/Boxplot";
import { DataSummaryOfChart } from "../DataSummaryOfChart";

export const BoxplotInfoTag = ({ tagInfo }) => {
  const { tagField } = tagInfo;
  // const [statistics, setStatistics] = useState([]);
  const [eixos, setEixos] = useState([]);

  useEffect(() => {
    // console.log(tagField)
    axios
      .get(
        `http://localhost:8080/info-statistics?field_info=${tagField}&id=${1}`
      ) // mudar essa requisicao
      .then((response) => {
        const results = response.data;

        const statisticsOfHeaderTag = [];
        const eixosBoxPlot = [];
        results.forEach((statistics, index) => {
          statisticsOfHeaderTag[index] = {
            index: index,
            dataName: statistics.dataName,
            media: statistics.media,
            valorMinimo: statistics.valorMinimo,
            valorMaximo: statistics.valorMaximo,
            boxPlot: statistics.boxPlot,
          };
          eixosBoxPlot[index] = {
            x: statistics.dataName,
            y: [
              statistics.boxPlot.valorMinimo,
              statistics.boxPlot.primeiroQuartil,
              statistics.boxPlot.mediana,
              statistics.boxPlot.terceiroQuartil,
              statistics.boxPlot.valorMaximo,
            ],
          };
          // console.log(statisticsOfHeaderTag[index].boxPlot)
        });
        setEixos(eixosBoxPlot);
      });
  }, [tagField]);

  return (
    <div className="box-statistics  p-3 d-flex flex-wrap align-content-start">
      <div className="box-chart">
        <BoxPlot eixosBoxPlot={eixos} />
      </div>
      <DataSummaryOfChart />
    </div>
  );
};
