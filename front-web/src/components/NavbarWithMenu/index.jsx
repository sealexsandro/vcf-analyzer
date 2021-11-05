import { Link } from "react-router-dom";
import "../NavbarWithMenu/styles.css";

export const NavBarWithMenu = () => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-2 bg-white border-bottom box-shadow nav-container">
      <div className="container-fluid d-flex align-items-center div-navbar ">
        <Link to="/" className="logo">
          <h5 className="my-0 mr-md-auto font-weight-normal titulo-logo">
            VCF Analyzer
          </h5>
        </Link>

        <nav className="my-2 my-md-0 mr-md-3">
          <Link className="p-2 text-black-50 menu-link text-botoes" to="/table-variants">
            Variantes
          </Link>

          <Link className="p-2 text-black-50 menu-link text-botoes" to="/statistics">
            Estatísticas
          </Link>
        </nav>
      </div>
      {/* <div className="container-fluid d-flex  div-navbar">
       
      </div> */}
    </div>
  );
};
