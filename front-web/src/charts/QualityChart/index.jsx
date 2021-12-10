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

  const [highestValue, setHighestValue]  = useState(0);
  const [lowerValue, setLowerValue]  = useState(0);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    http
      .get(`/summaryquality?idvcf=${vcfFileSession.getIdVcf()}`)
      .then((response) => {
        const data = response.data;
        const mySeries = data.map((x) => x.qualityCount);
        const myLabels = data.map((x) => x.quality.toString());
        // console.log(mySeries)
        const listValues = data.map((x) => x.quality);
        console.log(listValues)
        setHighestValue(Math.max.apply(null, listValues));
        setLowerValue(Math.min.apply(null, listValues));

        //calcular media
        let numberOfItems = 0;
        let soma = 0;
        listValues.forEach((item, index) => {
          soma += mySeries[index] * item;
          numberOfItems += mySeries[index];
        });

        setAverage((soma / numberOfItems).toFixed(2));

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
      <>
        <div className="border h-100 box-statistics-data movable-bar p-3">
          {
            <>
              <div className="d-flex justify-content-center align-items-center pb-2 ">
                <span className="fs-6 text-truncate">
                  <b>Variant Quality Distribution</b>
                </span>
              </div>
              <hr />
              <div>
                <p>
                  <b> Description:</b>{" "}
                  {
                    <p>
                      {" "}
                      A Phred-scaled quality score assigned by the variant
                      caller. Higher scores indicate higher confidence in the
                      variant (and lower probability of errors).
                    </p>
                  }
                </p>
              </div>
              <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap  justify-content-center">
              
              <div className="">
                <li className="">
                  <div>
                    <span className="">
                      <b>Highest quality value:</b>{" "}
                    </span>
                    <span className="">{highestValue}</span>
                  </div>
                </li>
                <br />
                <li className="">
                  <div>
                    <span className="">
                      <b>Average:</b>{" "}
                    </span>
                    <span className="">{average}</span>
                  </div>
                </li>
                <br/>
                <li className="">
                  <div>
                    <span className="">
                      <b>Lower quality value:</b>{" "}
                    </span>
                    <span className="">{lowerValue}</span>
                  </div>
                </li>
                <br />
              </div>
              </ul>
            </>
          }
        </div>
      </>
    </div>
  );
};
