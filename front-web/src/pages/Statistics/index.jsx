import { useState } from "react";
import { Link } from "react-router-dom";
import { QualityChart } from "../../charts/QualityChart";
import Barchart from "../../components/BarChart";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { SubMenu } from "../../components/SubMenu";
import "./styles.css";

export const StatisticsCharts = () => {
  const [metaDataInfo, setMetaDataInfo] = useState([]);

  // return (
  //   <>
  //     <NavBar />
  //     <div className="container">
  //       <SubMenu />
  //       <main>
  //         <div className="container-fluid d-flex flex-xl-row flex-column justify-content-between container-table">
  //           <div className="align-self-start">
  //             <div>
  //               <button className="button-add-filter btn btn-outline-info">
  //                 Variant quality distribution
  //               </button>
  //               <div class="dropdown">
  //                 <button
  //                   class="btn btn-secondary dropdown-toggle"
  //                   type="button"
  //                   id="dropdownMenuButton1"
  //                   data-bs-toggle="dropdown"
  //                   aria-expanded="false"
  //                 >
  //                   Dropdown button
  //                 </button>
  //                 <ul
  //                   class="dropdown-menu barra-de-rolagem"
  //                   aria-labelledby="dropdownMenuButton1"
  //                 >
  //                   <li>
  //                     <a class="dropdown-item" href="#">
  //                       Something else here
  //                     </a>
  //                   </li>
  //                   <li>
  //                     <a class="dropdown-item" href="#">
  //                       Something else here
  //                     </a>
  //                   </li>
  //                   <li>
  //                     <a class="dropdown-item" href="#">
  //                       Something else here
  //                     </a>
  //                   </li>
  //                   <li>
  //                     <a class="dropdown-item" href="#">
  //                       Something else here
  //                     </a>
  //                   </li>
  //                 </ul>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="col-sm-10 d-flex flex-column ">
  //             {/* {console.log(chartData)} */}

  //             {/* <Barchart labels={chartData.labels} series={chartData.series} /> */}
  //           </div>
  //         </div>
  //       </main>
  //     </div>
  //     <Footer />
  //   </>
  // );

  const pegou = () => {
    console.log("Funcionou");
  };

  return (
    <>
      <NavBar />
      <SubMenu />
      <div class="container-fluid pb-3 flex-grow-1 d-flex flex-column flex-sm-row overflow-auto ">
        <div class="row flex-grow-sm-1 flex-grow-0 ">
          <aside class="col-sm-2 flex-grow-sm-1 flex-shrink-1 flex-grow-0 sticky-top pb-sm-0 pb-3 col-aside">
            <div class="bg-light border rounded-3 p-1 h-100 sticky-top">
              <div
                href="/"
                class="d-flex justify-content-center align-items-center pb-2  text-black text-decoration-none "
              >
                <span class="fs-5 d-sm-inline text-truncate">Estatísticas</span>
              </div>
              <ul class="nav nav-pills flex-sm-column flex-row flex-nowrap  justify-content-center">
                <li class="">
                  <Link className="nav-link px-2 " to="#">
                    Variant Quality Statics
                  </Link>
                </li>
                <li class="dropdown">
                  <Link
                    href="#"
                    class="nav-link dropdown-toggle px-2 text-truncate"
                    id="dropdown-li"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span class="" onClick={pegou}>
                      Info Statistics
                    </span>
                  </Link>
                  <ul
                    class="dropdown-menu text-small shadow barra-de-rolagem"
                    aria-labelledby="dropdown-li"
                  >
                    <li>
                      <a class="dropdown-item" href="#">
                        New project...
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Sign out
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Sign out
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Sign out
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Sign out
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Sign out
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Sign out
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </aside>
          <main class="col overflow-auto ">
            <div class="border rounded-3 h-100  p-3">
              <h2>Main</h2>
              <p>
                Sriracha biodiesel taxidermy organic post-ironic, Intelligentsia
                salvia mustache 90's code editing brunch. Butcher polaroid VHS
                art party, hashtag Brooklyn deep v PBR narwhal sustainable
                mixtape swag wolf squid tote bag. Tote bag cronut semiotics, raw
                denim deep v taxidermy messenger bag. Tofu YOLO Etsy, direct
                trade ethical Odd Future jean shorts paleo. Forage Shoreditch
                tousled aesthetic irony, street art organic Bushwick artisan
                cliche semiotics ugh synth chillwave meditation. Shabby chic
                lomo plaid vinyl chambray Vice. Vice sustainable cardigan,
                Williamsburg master cleanse hella DIY 90's blog.
              </p>
              <p>
                Ethical Kickstarter PBR asymmetrical lo-fi. Dreamcatcher street
                art Carles, stumptown gluten-free Kickstarter artisan Wes
                Anderson wolf pug. Godard sustainable you probably haven't heard
                of them, vegan farm-to-table Williamsburg slow-carb readymade
                disrupt deep v. Meggings seitan Wes Anderson semiotics, cliche
                American Apparel whatever. Helvetica cray plaid, vegan brunch
                Banksy leggings +1 direct trade. Wayfarers codeply PBR selfies.
                Banh mi McSweeney's Shoreditch selfies, forage fingerstache food
                truck occupy YOLO Pitchfork fixie iPhone fanny pack art party
                Portland.
              </p>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};
