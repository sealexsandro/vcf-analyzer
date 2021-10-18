import axios from "axios";
import { useEffect, useState } from "react";
import Charts from "react-apexcharts/src/react-apexcharts";
import { VariantTypes } from "../../../../utils/tokens";

export const BoxPlot = ({tagInfo}) => {
  // const [tagCampoInfo, setTagCampoInfo] = useState(tagInfo);
  // const [tagStatistics, setTagStatistics] = useState({
  //   idTagName: "",
  //   statisticsOfVariantType: [],
  // });
  const { tagField } = tagInfo;
  // const [statistics, setStatistics] = useState([]);
  const [eixos, setEixos] = useState([]);

  useEffect(() => {
    // console.log(tagField)
    axios
      .get(`http://localhost:8080/info-statistics?field_info=${tagField}&id=${1}`) // mudar essa requisicao
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
        // setStatistics(statisticsOfHeaderTag);
        // console.log(statisticsOfHeaderTag);
        // chartData();
      });
  }, [tagField]);

  // const chartData = () => {
  //   const data = [];
  //   // let boxplot = [];
  //   statistics?.forEach((statisticas, index) => {
  //     data[index] = {
  //       x: statisticas.dataName = VariantTypes.fullVariantsTypes? "Todas as Variações": statisticas.dataName,
  //       y: [
  //         statisticas.boxPlot.valorMinimo,
  //         statisticas.boxPlot.primeiroQuartil,
  //         statisticas.boxPlot.mediana,
  //         statisticas.boxPlot.terceiroQuartil,
  //         statisticas.boxPlot.valorMaximo,
  //       ],
  //     };
  //     console.log(data[index]);
  //   });
  //   //  setEixos(data);
  //   // console.log(data);
  //   return data;
  // };
  const series = [
    {
      name: "box",
      type: "boxPlot",
      data: eixos,
      //   data: [
      //     {
      //       x: "nnkanknfkd",
      //       y: [54, 66, 69, 75, 88],
      //     },
      //     {
      //       x: "gfasgasgad",
      //       y: [54, 66, 69, 75, 88],
      //     },
      // ]
      // data: [
      //   {
      //     x: "maria",
      //     y: [54, 66, 69, 75, 88],
      //   },
      //   {
      //     x: "joão",
      //     y: [43, 65, 69, 76, 81],
      //   },
      //   {
      //     x: "Enrique",
      //     y: [31, 39, 45, 51, 59],
      //   },
      //   {
      //     x: "Gaby",
      //     y: [39, 46, 55, 65, 71],
      //   },
      //   {
      //     x: "Mel",
      //     y: [29, 31, 35, 39, 44],
      //   },
      // ],
    },
    // {
    //   name: "outliers",
    //   type: "scatter",
    //   data: [
    //     {
    //       x: new Date("2017-01-02").getTime(),
    //       y: 32,
    //     },
    //     {
    //       x: new Date("2017-01-02").getTime(),
    //       y: 33,
    //     },
    //     {
    //       x: new Date("2018-01-01").getTime(),
    //       y: 25,
    //     },
    //     {
    //       x: new Date("2019-01-01").getTime(),
    //       y: 64,
    //     },
    //     {
    //       x: new Date("2020-01-01").getTime(),
    //       y: 27,
    //     },
    //     {
    //       x: new Date("2020-01-01").getTime(),
    //       y: 78,
    //     },
    //     {
    //       x: new Date("2021-01-01").getTime(),
    //       y: 15,
    //     },
    //   ],
    // },
  ];
  const options = {
    chart: {
      type: "boxPlot",
      height: 350,
    },
    colors: ["#008FFB", "#FEB019"],
    title: {
      text: "BoxPlot - Scatter Chart",
      align: "left",
    },
    xaxis: {
      type: "string",
      // tooltip: {
      //   formatter: function (val) {
      //     return new Date(val).getFullYear();
      //   },
      // },
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
  };

  return (
    <div>
      {/* { console.log(tagStatistics.statisticsOfVariantType)} */}
      <Charts options={options} series={series} type="boxPlot" height={350} />
    </div>
  );
};
