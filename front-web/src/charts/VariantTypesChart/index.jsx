import http from "../../http-common";
import { useEffect, useState } from "react";
import Barchart from "../../components/Charts/BarChart";
import vcfFileSession from "../../services/vcfFileSession";

export const VariantTypesChart = () => {
  const [snps, setSnps] = useState(0);
  const [indels, setIndels] = useState(0);
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
      .get(`/variant-types?id=${vcfFileSession.getIdVcf()}`)
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
        const myLabels = ["SNPs", "INDELs"];
        //     const myLabels = data.map((x) => x.quality.toString());
        setSnps(snp);
        setIndels(indels);
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
          titleLateral="Number of Variants"
          titleDown="Variants Types"
          sizeDataLabel="13px"
          sizeLabelFont="14px"
        />
      </div>
      {/* <DataSummaryOfChart /> */}
      <div className="border h-100 box-statistics-data movable-bar">
        <>
          <div className="d-flex justify-content-center align-items-center py-1 ">
            <span className="fs-6 text-truncate py-0">
              <b>Estatísticas</b>
            </span>
          </div>
          <hr />
          <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap  justify-content-center">
            <div className="">
              <li className="">
                <div>
                  <span className="">
                    <b>Número de SNPs:</b>{" "}
                  </span>
                  <span className="">{snps}</span>
                </div>
              </li>
              <br />
              <li className="">
                <div>
                  <span className="">
                    <b>Número de Indels:</b>{" "}
                  </span>
                  <span className="">{indels}</span>
                </div>
              </li>
              <br />
            </div>
          </ul>
        </>
  
      </div>
    </div>
  );
};
