import { Link } from "react-router-dom";
import "../NavBar/styles.css";

const NavBar = () => {
  return (
    <div className=" d-flex flex-column flex-md-row align-items-center p-2 px-md-3 mb-1 border-bottom box-shadow nav-color">
      <div className="d-flex logo">
        {/* <h5 className="my-0 mr-md-auto font-weight-normal">VCF Analyzer</h5> */}
        <Link to="/" className="logo">
          <h5 className="my-0 mr-md-auto text-white  titulo-logo">
            VCF Analyzer
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
