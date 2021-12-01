import { Link } from "react-router-dom";
import "../NavbarWithMenu/styles.css";

export const NavBarWithMenu = () => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-2 px-md-4 mb-1 nav-color border-bottom box-shadow nav-container">
      <div className="container-fluid d-flex align-items-center div-navbar ">
        <Link to="/" className="logo">
          <h5 className="my-0 mr-md-auto font-weight-normal text-white titulo-logo">
            VCF Analyzer
          </h5>
        </Link>

        <nav className="my-2 my-md-0 mr-md-3">
          <Link className="p-2 menu-link text-white text-botoes" to="/table-variants">
            Variantes
          </Link>

          <Link className="p-2 menu-link text-white text-botoes" to="/statistics">
            Estatísticas
          </Link>
        </nav>
      </div>
      {/* <div className="container-fluid d-flex  div-navbar">
       
      </div> */}
    </div>
  );
};
