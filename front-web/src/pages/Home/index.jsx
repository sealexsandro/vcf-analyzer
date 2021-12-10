import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { UploadFile } from "../../components/UploadFile/UploadvcfFile";
import "./styles.css";

export function Home() {
  return (
    <>
      <NavBar />
      <div className="container-fluid container-uploadPage">
        <div className="d-flex align-items-center flex-column">
          <h2 className="">
            Selecione arquivos VCFs e gere análises:{" "}
          </h2>
          {/* <button className="btn btn-primary btn-lg">Upload</button> */}
          <div className="div-upload">
            <UploadFile />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
