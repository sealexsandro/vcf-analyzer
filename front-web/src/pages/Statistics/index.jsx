import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./styles.css";
import { StatisticsMenu } from "../../charts/StatisticsMenu";
import { chartComponents } from "../../utils/chartComponents";
import { NavBarWithMenu } from "../../components/NavbarWithMenu";

export const StatisticsCharts = () => {
  const [dataTagsInfo, setDataTagsInfo] = useState([]);
  const [selectedTagInfo, setSelectedTagInfo] = useState({
    tagField: "",
    number: "",
    type: "",
    description: "",
  });

  const [dashComponent, setDashComponent] = useState(chartComponents.VARIANT_QUALITY);

  // const dashPageComponent = () => {
  //   if (dashComponent === 0) {
  //     return <QualityChart />;
  //   }
  //   if (dashComponent === 1) {
  //     return <VariantTypesChart />;
  //   }
  //   if (dashComponent === 2) {
  //     return <BoxPlot tagInfo={selectedTagInfo} />;
  //   }
  // };

  useEffect(() => {
    axios.get(`http://localhost:8080/tagsInfobyidvcf?id=${1}`).then((response) => {
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
    setDashComponent(chartComponents.INFO_STATISTICS);
  };

  return (
    <>
      {/* <NavBar /> */}
      <NavBarWithMenu />
      {/* <SubMenu /> */}
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
                    onClick={() => setDashComponent(chartComponents.VARIANT_TYPES)}
                  >
                    Tipos de Variações
                  </button>
                </li>
                <li className="">
                  <button
                    className="nav-link px-2 "
                    onClick={() => setDashComponent(chartComponents.VARIANT_QUALITY)}
                  >
                    Quality de Variações
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
          <main className="col charts flex overflow-auto border h-100 box-main">
            {/* {dashPageComponent(dashComponent)} */}
            <StatisticsMenu chartComponent={dashComponent} tagInfo={selectedTagInfo}/>

            {/* <div className="box-statistics  p-3 d-flex flex-wrap align-content-start">
              <div className="box-chart movable-bar">
                <div className="charts">{dashPageComponent(dashComponent)}</div>
              </div>
              <div className="border h-100 box-statistics-data">
                <div className="d-flex justify-content-center align-items-center pb-2 ">
                  <span className="fs-6 text-truncate">Dados Estatísticos</span>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  animi, perspiciatis adipisci rerum veniam excepturi quisquam
                  magni error rem impedit odio repudiandae, temporibus tenetur
                  accusantium ducimus qui officia aliquam aperiam.
                </p>
              </div>
            </div> */}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};
