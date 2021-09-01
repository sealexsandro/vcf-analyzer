import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "../DashBoard/styles.css";
import DataTable from "../../components/DataTable";


function Dashboard() {

  return (
    <>
      <div className="container-fluid h-100">
        <div className="container-fluid d-flex flex-xl-row flex-column">
          <div className="col-sm-2 menu-dash" id="">
            <div className="d-flex flex-column">
              <ul className="">
                <li className="">
                  <a href="#">Tabela de Variantes</a>
                </li>
                <li>
                  <a href="#">Estatísticas</a>
                </li>
                <li>
                  <a href="#">Gráficos</a>
                </li>
              </ul>
            </div>
          </div>
          <main className="col-sm-9 d-flex flex-column">
            <DataTable />
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
