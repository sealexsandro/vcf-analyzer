import http from "../../http-common";
import { useEffect, useState } from "react/cjs/react.development";
import { BoxPlot } from "../../components/Charts/Boxplot";
import { DataSummaryOfChart } from "../DataSummaryOfChart";
import { CodeVariantTypesMap } from "../../utils/tokens";
import vcfFileSession from "../../services/vcfFileSession";

export const BoxplotInfoTag = ({ tagInfo }) => {
  const { tagField } = tagInfo;
  const [fullStatistics, setFullStatistics] = useState([]);
  const [eixos, setEixos] = useState([]);
  const [pontosNoEixoX, setPontosNoEixoX] = useState([]);
  const [outliers, setOutliers] = useState([]);

  useEffect(() => {
    // console.log(tagField)
    http
      .get(`/info-statistics?field_info=${tagField}&id=${vcfFileSession.getIdVcf()}`) // mudar essa requisicao
      .then((response) => {
        const results = response.data;
        const statisticsOfHeaderTag = [];
        const eixosBoxPlot = [];
        const pontoNoEixoX = [];
        const outliersBoxPlot = [];
        let indexOutliers = 0;
        results.forEach((statistics, index) => {
          // console.log(statistics)
          statisticsOfHeaderTag[index] = {
            index: index,
            dataName: statistics.dataName,
            // nickName: CodeVariantTypesMap.get(statistics.dataName),
            media: statistics.media,
            mediana: statistics.mediana,
            valorMinimo: statistics.valorMinimo,
            valorMaximo: statistics.valorMaximo,
            boxPlot: statistics.boxPlot,
          };
          eixosBoxPlot[index] = {
            x: CodeVariantTypesMap.get(statistics.dataName),
            y: [
              statistics.boxPlot.valorMinimo,
              statistics.boxPlot.primeiroQuartil,
              statistics.boxPlot.mediana,
              statistics.boxPlot.terceiroQuartil,
              statistics.boxPlot.valorMaximo,
            ],
          };
          pontoNoEixoX[index] = statistics.dataName;

          
          statistics.boxPlot.outliersMaioresQueOValorMaximoDoBigode.forEach(num => {         
            outliersBoxPlot[indexOutliers] = {
              x: CodeVariantTypesMap.get(statistics.dataName),
              y: num,
            };
            indexOutliers += 1;
            // console.log(num)
          });
          // console.log(statistics.boxPlot.outliersMaioresQueOValorMaximoDoBigode)
        });
        console.log(statisticsOfHeaderTag);
        setPontosNoEixoX(pontoNoEixoX);
        setOutliers(outliersBoxPlot)
        setEixos(eixosBoxPlot);
        setFullStatistics(statisticsOfHeaderTag);
      });
  }, [tagField]);

  return (
    <div className="box-statistics  p-3 d-flex flex-wrap align-content-start">
      <div className="box-chart">
        {eixos && <BoxPlot eixosBoxPlot={eixos}  pontosEixoX={pontosNoEixoX} outliersBoxPlot={outliers}/>}
      </div>
      {console.log("Renderização")}
      <DataSummaryOfChart
        statistics={fullStatistics}
        tagInfoCol={tagInfo}
      />
    </div>
  );
};
