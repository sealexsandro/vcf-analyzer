import { Link } from "react-router-dom";
import "../NavBar/styles.css";

const NavBar = () => {
  return (
    <div className=" d-flex flex-column flex-md-row align-items-center p-3 px-md-3 mb-3 bg-white border-bottom box-shadow">
      <div className="d-flex logo">
        {/* <h5 className="my-0 mr-md-auto font-weight-normal">VCF Analyzer</h5> */}
        <Link to="/" className="logo">
          <h5 className="my-0 mr-md-auto font-weight-normal titulo-logo">
            VCF Analyzer
          </h5>
        </Link>
      </div>
    </div>
    // <nav className="navbar navbar-expand-lg navbar-geral">
    //   <Link
    //     to="/"
    //     className="container-fluid justify-content-start navbar-brand logo"
    //   >
    //     <img
    //       src={"/images/analise.png"}
    //       alt="analyzer"
    //       width="60"
    //       className=""
    //     />
    //     <h3 className="tituloLogo">VCF Analyzer</h3>
    //   </Link>
    // </nav>
  );
};

export default NavBar;
