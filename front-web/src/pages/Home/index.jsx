import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { UploadFile } from "../../components/UploadFile/UploadvcfFile";
import Dashboard from "../DashBoard";
import "./styles.css";

function Home() {
  return (
    <>
      <NavBar />
      <div className="container">
        {/* <div className="d-flex align-items-center flex-column">
          <h2 className="">
            Faça o Upload de arquivos VCFs e gere Análises Detalhadas:{" "}
          </h2> */}
          {/* <button className="btn btn-primary btn-lg">Upload</button> */}
          <UploadFile />
          {/* <Dashboard /> */}
        {/* </div> */}
      </div>
      <Footer />
    </>
  );
}

export default Home;
