import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import "./App.css";

function Home() {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="d-flex align-items-start">
          <h2 className="">Faça o Upload de arquivos VCF: </h2>
          <button className="btn btn-primary btn-lg">Upload</button>
        </div>
        <div>
          <h2>VCFs de Exemplo</h2>
        </div>
       
      </div>
      <Footer />
    </>
  );
}

export default Home;
