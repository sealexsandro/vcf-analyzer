import { Link } from "react-router-dom";
import "../NavBar/styles.css";

const NavBar = () => {
  return (
    // <div className="d-flex flex-column flex-md-row align-items-center mb-4 border-bottom">
    // <div className="container navbar-geral">
    <nav className="navbar navbar-expand-lg navbar-geral">
      <Link
        to="/"
        className="container-fluid justify-content-start navbar-brand logo"
      >
        <img
          src={"/images/analise.png"}
          alt="analyzer"
          width="60"
          className=""
        />
        <h3 className="tituloLogo">VCF Analyzer</h3>
      </Link>
      
      {/* <Link to="/">
            <img src={logo} alt="DevSuperior" width="150" />
          </Link> */}
    </nav>
  );
};

export default NavBar;
