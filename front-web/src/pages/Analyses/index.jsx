import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { VcfTable } from "../../components/VcfTable";
import { Charts } from "../../components/Charts";
import { QualityChart } from "../../charts/QualityChart";
import { Quality } from "../../charts/QualityChart/quality";
import { SubMenu } from "../../components/SubMenu";

export function Dashboard() {
  const [dashComponent, setDashComponent] = useState(0);

  const dashPageComponent = () => {
    if (dashComponent === 0) {
      return <VcfTable />;
    }
    if (dashComponent === 1) {
      return <Quality />;
    }
    if (dashComponent === 2) {
      return <QualityChart />;
    }
  };
  return (
    <>
      <NavBar />
      <div className="container">
        <SubMenu />
        {/* navbar menu */}
        {/* <div className="container-nav d-flex flex-row-reverse">
          <nav className="navbar">
            <ul className="d-flex flex-row menu-list">
              <li className="item-lista">
                <button
                  type="button"
                  className="btn btn-info btn-spacing"
                  onClick={() => setDashComponent(0)}
                >
                  Tabela de Variantes
                </button>
                {/* <Link className="btn btn-info btn-spacing" to="/vcftable">
                  Tabela de Variantes
                </Link> 
              </li>
              <li className="item-lista">
              <button
                  type="button"
                  className="btn btn-info btn-spacing"
                  onClick={() => setDashComponent(1)}
                >
                  Estatísticas
                </button>
                {/* <a href="#">Estatísticas</a> */}
                {/* <Link className="btn btn-info btn-spacing" to="/">
                  Estatísticas
                </Link> 
              </li>
              <li className="item-lista">
                {/* <a href="#">Gráficos</a> */}
                {/* <Link className="btn btn-info btn-spacing" to="/charts">
                  Gráficos
                </Link> 
                {/* <Barchart /> 
                <button
                  type="button"
                  value="charts"
                  className="btn btn-info btn-spacing"
                  onClick={() => setDashComponent(2)}
                >
                  Gráficos
                </button>
              </li>
            </ul>
            {/* </div> 
          </nav>
        </div> */}
        <main>{dashPageComponent()}</main>
      </div>
      <Footer />
    </>
  );
}
