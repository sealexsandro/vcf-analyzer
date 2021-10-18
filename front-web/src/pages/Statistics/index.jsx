import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QualityChart } from "../../components/Charts/SpecificChart/QualityChart";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { SubMenu } from "../../components/SubMenu";
import { BoxPlot } from "../../components/Charts/GenericsChart/Boxplot";
import "./styles.css";
import { VariantTypesChart } from "../../components/Charts/SpecificChart/VariantTypesChart";

export const StatisticsCharts = () => {
  const [dataTagsInfo, setDataTagsInfo] = useState([]);
  const [selectedTagInfo, setSelectedTagInfo] = useState({
    tagField: "",
    number: "",
    type: "",
    description: "",
  });

  const [dashComponent, setDashComponent] = useState(0);

  const dashPageComponent = () => {
    if (dashComponent === 0) {
      return <QualityChart />;
    }
    if (dashComponent === 1) {
      return <VariantTypesChart />;
    }
    if (dashComponent === 2) {
      return <BoxPlot tagInfo={selectedTagInfo} />;
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/tagsbyidvcf?id=${1}`).then((response) => {
      const results = response.data;

      const tagsInfo = [];
      results.forEach((tag, index) => {
        tagsInfo[index] = {
          index: index,
          tagField: tag.idTag,
          number: tag.number,
          type: tag.type,
          description: tag.description,
        };
      });
      setDataTagsInfo(tagsInfo);
    });
  }, []);

  const pegou = () => {
    console.log("Funcionou");
  };

  const exibirGrafico = (tagData) => {
    setSelectedTagInfo({
      tagField: tagData.tagField,
      number: tagData.number,
      type: tagData.type,
      description: tagData.description,
    });
    setDashComponent(2);
  };

  return (
    <>
      <NavBar />
      <SubMenu />
      <div className="container-fluid pb-3 flex-grow-1 d-flex flex-column flex-sm-row overflow-auto ">
        <div className="row flex-grow-sm-1 flex-grow-1 ">
          <aside className="col-sm-2 flex-grow-sm-1 flex-shrink-1 flex-grow-0 sticky-top pb-sm-0 pb-3 col-aside">
            <div className="bg-light border rounded-3 p-1 h-100 sticky-top">
              <div
                href="/"
                className="d-flex justify-content-center align-items-center pb-2  text-black text-decoration-none "
              >
                <span className="fs-5 d-sm-inline text-truncate">
                  Estatísticas
                </span>
              </div>
              <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap  justify-content-center">
                <li className="">
                  <button
                    className="nav-link px-2 "
                    onClick={() => setDashComponent(0)}
                  >
                    Variant Quality Static
                  </button>
                </li>
                <li className="">
                  <button
                    className="nav-link px-2 "
                    onClick={() => setDashComponent(1)}
                  >
                    Variant Types
                  </button>
                </li>
                <li className="dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle px-2 text-truncate"
                    id="dropdown-li"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="" onClick={pegou}>
                      Info Statistics
                    </span>
                  </Link>
                  <ul
                    className="dropdown-menu text-small shadow barra-de-rolagem"
                    aria-labelledby="dropdown-li"
                  >
                    {dataTagsInfo?.map((tagData) => (
                      <li key={tagData.index}>
                        <button
                          className="dropdown-item"
                          onClick={() => exibirGrafico(tagData)}
                        >
                          {tagData.tagField}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </aside>
          <main className="col overflow-auto">
            <div className="box-statistics border h-100  p-3 d-flex flex-wrap align-content-start">
              <div className="box-chart">{dashPageComponent(dashComponent)}</div>
              <div className="box-statistics-data">alguma coisa aqui</div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};
