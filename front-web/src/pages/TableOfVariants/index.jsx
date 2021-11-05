import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap-tabs";
import { DataTable } from "../../components/DataTable";
import Footer from "../../components/Footer";
import { NavBarWithMenu } from "../../components/NavbarWithMenu";

import {
  convertStringForNumber,
  isNumberList,
  sortNumbers,
} from "../../utils/verifications";
import "../TableOfVariants/styles.css";

export const TableOfVariants = () => {
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [fullFieldsValues, setFullFieldsValues] = useState({
    alteration: [],
    chrom: [],
    filter: [],
    quality: [],
    reference: [],
  });

  const [infoValues, setInfoValues] = useState([]);

  const [selectchrom, setSelectChrom] = useState("");
  const [selectReference, setSelectReference] = useState("");
  const [selectAlteration, setSelectAlteration] = useState("");
  const [selectFilter, setSelectFilter] = useState("");
  const [selectFieldInfoKey, setSelectFieldInfoKey] = useState("");
  const [selectInfoFieldValue, setSelectInfoFieldValue] = useState("");
  const [infoFieldKeyAndValue, setInfoFieldKeyAndValue] = useState("");


  const handleClose = () => setShowModalFilter(false);
  const handleShow = () => setShowModalFilter(true);

  const loadAttribVariants = () => {
    axios
      .get(`http://localhost:8080/variants-by-unique-attributes?id=${1}`)
      .then((response) => {
        const result = response.data;

        setFullFieldsValues({
          alteration: result.alteration,
          chrom: result.chrom,
          filter: result.filter,
          quality: result.quality,
          reference: result.reference,
        });
      });
  };

  const loadFildsAndValuesColInfo = () => {
    axios
      .get(`http://localhost:8080/info-attributes?id=${1}`)
      .then((response) => {
        const result = response.data;
        const infoFields = [];

        let index = 0;
        for (var key in result) {
          let values = result[key];
          let listValuesOrdenados = [];
          if (isNumberList(values)) {
            for (let i = 0; i < values.length; i++) {
              const elem = convertStringForNumber(values[i]);
              listValuesOrdenados[i] = elem;
            }
            listValuesOrdenados.sort(sortNumbers);
          } else {
            listValuesOrdenados = values.sort();
          }
          infoFields[index] = {
            infoField: key,
            value: listValuesOrdenados,
          };
          index += 1;
        }
        setInfoValues(infoFields);
      });
  };

  useEffect(() => {
    loadAttribVariants();
    loadFildsAndValuesColInfo();
  }, []);

  const renderModal = () => {
    return (
      <>
        {showModalFilter && (
          <Modal
            size="lg"
            show={showModalFilter}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Filtros</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tabs
                onSelect={(index, label) => console.log(label + " selected")}
              >
                <Tab label="Anotações">
                  <div className="d-flex flex-column filtros">
                    <div className="d-flex flex-row"></div>
                    <hr />
                    {/* --------------------- */}

                    <div className="d-flex flex-row">
                      <label className="label-filtro">Todos os Campos</label>

                      <button className="btn btn-info col select-filter">
                        Filtrar
                      </button>
                    </div>
                    <hr />
                  </div>
                </Tab>
                <Tab label="SQL Personalizado">Tab 2 content</Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-info" onClick={() => handleClose}>
                Close
              </button>
              {/* <button className="btn btn-info">Understood</button> */}
            </Modal.Footer>
          </Modal>
        )}
      </>
      // </div>
    );
  };

  const configureKeyAnValueOfInfoField = (infoKey) => {
    setSelectFieldInfoKey(infoKey);
    // infoValues.forEach((field) => {
    //   if (field.infoField === infoKey) {
    //     if (field.value.length > 0) {
    //      setSelectInfoFieldValue(field.value[0]);
    //       setInfoFieldKeyAndValue(`${infoKey}=${field.value[0]}`);
    //     }
    //   }
    // });
  };

  const configureValueOfInfoField = (infoValue) => {
    if (infoValue !== "") {
      setSelectInfoFieldValue(infoValue);
      setInfoFieldKeyAndValue(`${selectFieldInfoKey}=${infoValue}`);
    }
  };

  const filtros = () => {
    <div className="alert alert-success" role="alert">
      <strong>Aqui tem um filtro por alguma coisa</strong>
      <button type="button" className="btn-close" aria-label="Close">
        {/* <span aria-hidden="true">×</span> */}
      </button>
    </div>;
  };

  const limparFilters = () => {
    setSelectChrom("");
    setSelectReference("");
    setSelectAlteration("");
    setSelectFilter("");
    setSelectFieldInfoKey("");
    setSelectInfoFieldValue("");
    setInfoFieldKeyAndValue("");
  };
  return (
    <>
      <NavBarWithMenu />

      {/* DAQUI PARA BAIXO É O SUBMENU */}
      <div className="container-fluid d-flex flex-row ">
        <div className="col container-menu">
          <nav className="d-flex navbar navbar-light bg-light">
            <h5 className="d-flex titulo-menu">Tabela de Variantes</h5>
            <ul className="lista-de-botoes d-flex flex-row menu-list">
              <li className="item-lista">
                <button
                  className="btn btn-md btn-primary shadow-none butao"
                  onClick={() => setShowModalFilter(true)}
                >
                  Add Coluna
                </button>
              </li>

              <li className="item-lista">
                <button className="btn btn-md btn-primary shadow-none butao">
                  Exportar
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* <main> */}
      <div className="container-fluid pb-3 flex-grow-1 d-flex flex-column flex-sm-row overflow-auto ">
        <div className="row flex-grow-sm-1 flex-grow-1 ">
          <main className="flex container-main">
            <div className="p-3 d-flex flex-wrap flex-row container-main">
              {/* Container de Filtros */}
              <div className="p-2 d-flex flex-wrap flex-row border h-100 container-filter">
                <div className="column-filter pb-3">
                  <div className="d-flex justify-content-center label-filtro">
                    <label className="">Filtros</label>
                  </div>
                  <div className="d-flex flex-column pb-3">
                    <label className="label-filter">Chrom</label>
                    <select
                      defaultValue=""
                      value={selectchrom}
                      onChange={(e) => {
                        setSelectChrom(e.target.value);
                      }}
                      className="select-filter"
                    >
                      <option key={0}></option>
                      {fullFieldsValues.chrom?.map((attrib, index) => (
                        <option className="option-filter" key={index + 1}>
                          {attrib}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex flex-column pb-3">
                    <label className="label-filter">Reference</label>
                    <select
                      defaultValue=""
                      value={selectReference}
                      onChange={(e) => {
                        setSelectReference(e.target.value);
                      }}
                      className="select-filter"
                    >
                      <option key={0}></option>
                      {fullFieldsValues.reference?.map((attrib, index) => (
                        <option className="option-filter" key={index + 1}>
                          {attrib}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex flex-column pb-3">
                    <label className="label-filter">Alteration</label>
                    <select
                      defaultValue=""
                      value={selectAlteration}
                      onChange={(e) => {
                        setSelectAlteration(e.target.value);
                      }}
                      className="select-filter"
                    >
                      <option className="option-filter" key={0}></option>
                      {fullFieldsValues.alteration?.map((attrib, index) => (
                        <option className="option-filter" key={index + 1}>
                          {attrib}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex flex-column pb-3">
                    <label className="label-filter">Filter</label>
                    <select
                      defaultValue=""
                      value={selectFilter}
                      onChange={(e) => {
                        setSelectFilter(e.target.value);
                      }}
                      className="select-filter"
                    >
                      <option className="option-filter" key={0}></option>
                      {fullFieldsValues.filter?.map(
                        (filter, index) =>
                          filter !== "." && (
                            <option key={index + 1}>{filter}</option>
                          )
                      )}
                    </select>
                  </div>

                  <div className="d-flex flex-column pb-2">
                    <label className="label-filter">Campo Info</label>
                    <div className="d-flex flex-row">
                      <select
                        defaultValue=""
                        // onChange={(e) => setSelectFieldInfoKey(e.target.value)}
                        value={selectFieldInfoKey}
                        onChange={(e) => {
                          configureKeyAnValueOfInfoField(e.target.value);
                        }}
                        className="select-filter"
                      >
                        <option key={0}></option>
                        {infoValues?.map((field, index) => (
                          <option className="option-filter" key={index + 1}>
                            {field.infoField}
                          </option>
                        ))}
                      </select>
                      <select defaultValue="" className="select-filter">
                        <option className="option-filter">=</option>
                      </select>

                      <select
                        defaultValue=""
                        value={selectInfoFieldValue}
                        onChange={(e) => {
                          configureValueOfInfoField(e.target.value);
                        }}
                        className="select-filter label-filter"
                      >
                        <option className="option-filter" key={0}></option>
                        {infoValues?.map(
                          (field) =>
                            field.infoField === selectFieldInfoKey &&
                            field.value.length > 0 &&
                            field.value.map((value, index) => (
                              <option className="option-filter" key={index + 1}>
                                {value}
                              </option>
                            ))
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center  flex-row">
                    <button
                      className="button-limpar-filtrar btn btn-outline-info "
                      onClick={() => limparFilters()}
                    >
                      Limpar Filtros
                    </button>
                  </div>
                </div>
              </div>
              {/* Fim do Container de Filtros */}

              <div className="col d-flex flex-column variants-table">
                <DataTable
                  chrom={selectchrom}
                  reference={selectReference}
                  alteration={selectAlteration}
                  filter={selectFilter}
                  infoFieldKeyAndValue={infoFieldKeyAndValue}
                />
              </div>
            </div>
          </main>
        </div>
        {showModalFilter && renderModal()}
        {/* {console.log(selectchrom)}
        {console.log(selectReference)}
        {console.log(selectAlteration)}
        {console.log(selectFieldInfoKey)}
        {console.log(selectInfoFieldValue)} */}
      </div>
      <Footer />
    </>
  );
};
