import './styles.css';

const NavBar = () => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-2 mb-4 border-bottom">
      <div className="container">
        <nav className="my-2 my-md-0 mr-md-3">
          <div className="d-flex flex-md-row align-items-center">
            <img src={"/images/analise.png"} alt="analyzer" width="90" className=""/>
            <h3 className="">VCF Analyzer</h3>
          </div>
           
          {/* <Link to="/">
            <img src={logo} alt="DevSuperior" width="150" />
          </Link> */}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
