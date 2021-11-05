import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import { BoxPlot } from "../../components/Charts/Boxplot";
import { DataSummaryOfChart } from "../DataSummaryOfChart";

export const BoxplotInfoTag = ({ tagInfo }) => {
  const { tagField } = tagInfo;
  const [fullStatistics, setFullStatistics] = useState([]);
  const [eixos, setEixos] = useState([]);
  const [outliers, setOutliers] = useState([]);

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
          // console.log(statistics.dataName)
          statisticsOfHeaderTag[index] = {
            index: index,
            dataName: statistics.dataName,
            media: statistics.media,
            mediana: statistics.mediana,
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
        console.log(statisticsOfHeaderTag);
        setEixos(eixosBoxPlot);
        setFullStatistics(statisticsOfHeaderTag);
      });
  }, [tagField]);

  return (
    <div className="box-statistics  p-3 d-flex flex-wrap align-content-start">
      <div className="box-chart">
        {eixos && <BoxPlot eixosBoxPlot={eixos} />}
      </div>
      {console.log("Renderização")}
      <DataSummaryOfChart statistics={fullStatistics} tagInfoCol={tagInfo} />
    </div>
  );
};
