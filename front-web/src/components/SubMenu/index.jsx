import { Link } from "react-router-dom";
import './styles.css'

export const SubMenu = () => {
  return (
    <div className="container-fluid d-flex flex-row-reverse">
      <nav className="navbar">
        {/* <div className="d-flex flex-row"> */}
        <ul className="d-flex flex-row menu-list">
          <li className="item-lista">
            {/* <button
              type="button"
              className="btn btn-info btn-spacing"
              onClick={""}
            >
              Tabela de Variantes
            </button> */}
            <Link className="btn btn-info btn-spacing" to="/table-variants">
              Tabela de Variantes
            </Link>
          </li>
          <li className="item-lista">
            {/* <button
              type="button"
              className="btn btn-info btn-spacing"
              onClick={""}
            >
              Estatísticas
            </button> */}
            {/* <a href="#">Estatísticas</a> */}
            <Link className="btn btn-info btn-spacing" to="/statistics">
              Estatísticas
            </Link>
          </li>
        </ul>
        {/* </div> */}
      </nav>
    </div>
  );
};
