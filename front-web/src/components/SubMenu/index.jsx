import { Link } from "react-router-dom";
import "./styles.css";

export const SubMen = () => {
  return (
    <div className="container-fluid d-flex flex-row ">
      <div className="col container-menu">
        <nav className="d-flex navbar navbar-light bg-light nav-menu">
          <h5 className="d-flex">Tabela de Variantes</h5>
          <ul className="lista-de-botoes d-flex flex-row menu-list">
            {/* <li className="item-lista">
              <Link className="btn btn-info btn-spacing" to="/table-variants">
                Tabela de Variantes
              </Link>
            </li> */}
            <li className="item-lista">
              <Link className="btn btn-info btn-spacing botoes">Filtrar Variantes</Link>
            </li>
            <li className="item-lista">
              <Link className="btn btn-info btn-spacing botoes">
                Add Coluna
              </Link>
            </li>

            <li className="item-lista">
              <Link className="btn btn-info btn-spacing botoes">Exportar</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
