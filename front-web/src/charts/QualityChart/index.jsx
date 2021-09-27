import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Barchart from "../../components/BarChart";

import './style.css';

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
      // console.log(mySeries);
    });
  }, []);

  return (
    <div className="container-fluid d-flex flex-xl-row flex-column justify-content-between container-table">
      <div className="align-self-start">
        <div>
          <button className="button-add-filter btn btn-outline-info">
            Variant quality distribution
          </button>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown button
            </button>
            <ul class="dropdown-menu barra-de-rolagem" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-sm-10 d-flex flex-column ">
        {/* {console.log(chartData)} */}

        <Barchart labels={chartData.labels} series={chartData.series} />
      </div>
    </div>
  );
};
