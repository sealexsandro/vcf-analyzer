import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import http from "../../http-common";
import { DataTable } from "../../components/DataTable";
import { ExportButton } from "../../components/ExportButton";
import Footer from "../../components/Footer";
import { NavBarWithMenu } from "../../components/NavbarWithMenu";
import Pagination from "../../components/Pagination";
import vcfFileSession from "../../services/vcfFileSession";
import { findVisibleColumns } from "../../utils/displayColumns";
import { HeaderFields, HeaderFieldsList } from "../../utils/tokens";

import {
  convertStringForNumber,
  isNumberList,
  sortNumbers,
} from "../../utils/verifications";
import "../TableOfVariants/styles.css";

export const TableOfVariants = () => {
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [fullFieldsValues, setFullFieldsValues] = useState({});

  const [infoValues, setInfoValues] = useState([]);

  // const [selectchrom, setSelectChrom] = useState("");
  // const [selectReference, setSelectReference] = useState("");
  // const [selectAlteration, setSelectAlteration] = useState("");
  // const [selectFilter, setSelectFilter] = useState("");
  const [selectFieldInfoKey, setSelectFieldInfoKey] = useState("");
  const [selectInfoFieldValue, setSelectInfoFieldValue] = useState("");

  const [activePage, setActivePage] = useState(0);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [numberPage, setNumberPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [variantsPage, setVariantsPage] = useState([]);
  const [allVisibleColumns, setAllVisibleColumns] = useState(new Map());
  const [visibleCols, setVisibleCols] = useState(new Map());
  const [visibleColsInfo, setVisibleColsInfo] = useState(new Map());

  const [tableFilters, setTableFilters] = useState(new Map());

  const handleClose = () => setShowModalFilter(false);
  const handleShow = () => setShowModalFilter(true);
  const initValueOption = "-----";

  const loadAttribVariants = () => {
    http
      .get(`/variants-by-unique-attributes?id=${vcfFileSession.getIdVcf()}`)
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
    // const keys = [];
    http
      .get(`/info-attributes?id=${vcfFileSession.getIdVcf()}`)
      .then((response) => {
        const result = response.data;
        const infoFields = [];
        const keys = [];

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

  useEffect(() => {
    let filters = "";
    tableFilters.forEach(function (value, key) {
      if (key !== HeaderFields.INFO && value !== "" && value !== initValueOption) {
        if(filters !== ""){
          filters += "&";
        }
        filters += key + "=" + value;
      } else {
        if (value !== "" && value !== initValueOption) {
          if(filters !== ""){
            filters += "&";
          }
          let infoKeyValue = value.split("=");
          filters += key + "=" + infoKeyValue[0] + "-" + infoKeyValue[1];
        }
      }
    });
    let requisicao = `/pagevariantsbyfields?page=${activePage}&sort=idvcf&size=10&${filters}&idvcf=${vcfFileSession.getIdVcf()}`;
    http
      .get(
        requisicao
      )
      .then((response) => {
        const results = response.data;
        // console.log(results)
        setFirstPage(results.first);
        setLastPage(results.last);
        setNumberPage(results.number);
        setTotalPages(results.totalPages);
        const variants = results.content;
        const variantData = [];

        variants.forEach((variant, index) => {
          // console.log(variant)
          variantData[index] = {
            index: index,
            chrom: variant.chrom,
            position: variant.position,
            idVariant: variant.idVariant,
            reference: variant.reference,
            alteration: variant.alteration,
            quality: variant.quality,
            filter: variant.filter,
            format: variant.format,
            samples: variant.samples,
            infoCol: new Map(Object.entries(variant.infoCol)),
          };
        });
        setVariantsPage(variantData);
      });
  }, [activePage, tableFilters]);

  useEffect(() => {
    http
      .get(`tagsInfobyidvcf?id=${vcfFileSession.getIdVcf()}`)
      .then((response) => {
        const results = response.data;
        console.log("ID DO ARQU: ",vcfFileSession.getIdVcf())

        // let allColumns = displayColumns();
        let visibleCols = findVisibleColumns();

        // let markColsInfo = new Map();
        let colsInfo = new Map();

        results.forEach((tag, index) => {
          colsInfo.set(tag.idTag, false);
        });
        setVisibleColsInfo(colsInfo);
        // allColumns.set(HeaderFields.INFO, markColsInfo);
        // setAllColumns(allColumns);
        setVisibleCols(visibleCols);
        setAllVisibleColumns(new Map([...visibleCols, ...colsInfo]));
        // console.log("Colunas visiveis: ", allVisibleColumns)
      });
  }, []);

  const changePage = (numberOfPage) => {
    setActivePage(numberOfPage);
  };

  const makeColumnVisible = (nameColumn) => {
    // console.log(nameColumn);
    if (visibleCols.get(nameColumn)) {
      visibleCols.set(nameColumn, false);
      allVisibleColumns.set(nameColumn, false);
    } else {
      visibleCols.set(nameColumn, true);
      allVisibleColumns.set(nameColumn, true);
    }
    console.log("Colunas visiveis: ", allVisibleColumns);
  };

  const makeColumnInfoVisible = (nameColumn) => {
    console.log(nameColumn);
    if (visibleColsInfo.get(nameColumn)) {
      visibleColsInfo.set(nameColumn, false);
      allVisibleColumns.set(nameColumn, false);
    } else {
      visibleColsInfo.set(nameColumn, true);
      allVisibleColumns.set(nameColumn, true);
    }
    console.log("Colunas visiveis: ", allVisibleColumns);
  };

  const checkVisibility = (column) => {
    if (column !== HeaderFields.INFO) {
      return visibleCols.get(column);
    }
    return false;
  };

  const checkVisibilityInfoCol = (column) => {
    if (column !== HeaderFields.INFO) {
      return visibleColsInfo.get(column);
    }
    return false;
  };

  const renderModal = () => {
    return (
      <>
        {showModalFilter && (
          <Modal
            // size="sm"
            dialogClassName="modal-90w"
            show={showModalFilter}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title className="container-fluid">Colunas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <div className="d-flex flex-column filtros"> */}
              <div className="container-fluid">
                <div className="d-flex flex-row visible-columns">
                  <div className="container p-2">
                    <ul className="list-infofields">
                      {HeaderFieldsList.map(
                        (header) =>
                          header !== HeaderFields.INFO && (
                            <li>
                              <label>
                                <input
                                  type="checkbox"
                                  defaultChecked={checkVisibility(header)}
                                  onChange={() => makeColumnVisible(header)}
                                />
                                {header}
                              </label>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                  <div className="container-fluid p-2">
                    <label>Campos INFO</label>
                    <ul className="columns-scrollable border h-100">
                      {infoValues?.map((field, index) => (
                        <li className="">
                          <label>
                            <input
                              type="checkbox"
                              defaultChecked={checkVisibilityInfoCol(
                                field.infoField
                              )}
                              onChange={() =>
                                makeColumnInfoVisible(field.infoField)
                              }
                            />
                            {field.infoField}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-info" onClick={() => handleClose()}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  };

  const configureValueOfInfoField = (infoValue) => {
    if (infoValue !== "") {
      setSelectInfoFieldValue(infoValue);
      const keyAndValue = `${selectFieldInfoKey}=${infoValue}`;
      // setInfoFieldKeyAndValue(keyAndValue);
      let filters = tableFilters;
      filters.set(HeaderFields.INFO, keyAndValue);
      setTableFilters(new Map([...filters]));
    }
  };

  const limparFilters = () => {
    setSelectFieldInfoKey("");
    setSelectInfoFieldValue("");
    let filters = tableFilters;

    tableFilters.forEach(function (value, key) {
      filters.set(key, "");
    });
    setTableFilters(new Map([...filters]));
  };

  const addTableFilter = (key, value) => {
    let filters = tableFilters;
    filters.set(key, value);
    setTableFilters(new Map([...filters]));
  };
  return (
    <>
      <NavBarWithMenu />

      {/* DAQUI PARA BAIXO É O SUBMENU */}
      <div className="d-flex flex-row navbar-light bg-light">
        {/* <div className="col container-menu"> */}
          {/* <nav className="col d-flex navbar navbar-light bg-light"> */}
          <nav className="col d-flex navbar container-menu">
            <h5 className="d-flex titulo-menu">Tabela de Variantes</h5>
            <ul className="lista-de-botoes d-flex flex-row menu-list">
              <li className="item-lista">
                <button
                  className="btn btn-md btn-primary shadow-none butao"
                  onClick={() => handleShow()}
                >
                  Add Coluna
                </button>
              </li>

              <li className="item-lista">
                {allVisibleColumns.size > 0 && variantsPage.length > 0 ? (
                  <ExportButton
                    fullheaders={allVisibleColumns}
                    headers={visibleCols}
                    headersInfo={visibleColsInfo}
                    fileName={"Meu arquivo"}
                    tableFilters = {tableFilters}
                  />
                ) : (
                  <button className="btn btn-md btn-primary shadow-none butao">
                    Exportar
                  </button>
                )}
              </li>
            </ul>
          </nav>
        {/* </div> */}
      </div>
      {/* <main> */}
      <div className="container-fluid pb-3 flex-grow-1 d-flex flex-column overflow-auto">
        <div className="row flex-grow-sm-1 flex-grow-1 table-and-filters">
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
                      // value={selectchrom}
                      // onChange={(e) => {
                      //   setSelectChrom(e.target.value);
                      // }}
                      value={tableFilters.get(HeaderFields.CHROM)}
                      onChange={(e) => {
                        addTableFilter(HeaderFields.CHROM, e.target.value);
                      }}
                      className="select-filter"
                    >
                      <option key={0}>{initValueOption}</option>
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
                      // value={selectReference}
                      // onChange={(e) => {
                      //   setSelectReference(e.target.value);
                      // }}
                      value={tableFilters.get(HeaderFields.REF)}
                      onChange={(e) => {
                        addTableFilter(HeaderFields.REF, e.target.value);
                      }}
                      className="select-filter"
                    >
                      <option key={0}>{initValueOption}</option>
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
                      // value={selectAlteration}
                      // onChange={(e) => {
                      //   setSelectAlteration(e.target.value);
                      // }}
                      value={tableFilters.get(HeaderFields.ALT)}
                      onChange={(e) => {
                        addTableFilter(HeaderFields.ALT, e.target.value);
                      }}
                      className="select-filter"
                    >
                      <option className="option-filter" key={0}>{initValueOption}</option>
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
                      // value={selectFilter}
                      // onChange={(e) => {
                      //   setSelectFilter(e.target.value);
                      // }}
                      value={tableFilters.get(HeaderFields.FILTER)}
                      onChange={(e) => {
                        addTableFilter(HeaderFields.FILTER, e.target.value);
                      }}
                      className="select-filter"
                    >
                      <option className="option-filter" key={0}>{initValueOption}</option>
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
                        // defaultValue=""
                        // onChange={(e) => setSelectFieldInfoKey(e.target.value)}
                        value={selectFieldInfoKey}
                        onChange={(e) => {
                          setSelectFieldInfoKey(e.target.value);
                        }}
                        className="select-filter"
                      >
                        <option key={0}>{initValueOption}</option>
                        {infoValues?.map((field, index) => (
                          <option className="option-filter" key={index + 1}>
                            {field.infoField}
                          </option>
                        ))}
                      </select>
                      <label className="label-igualdade">=</label>

                      <select
                        value={selectInfoFieldValue}
                        onChange={(e) => {
                          configureValueOfInfoField(e.target.value);
                        }}
                        className="select-filter label-filter"
                      >
                        <option className="option-filter" key={0}>{initValueOption}</option>
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

              {variantsPage.length > 0 && visibleCols.size > 0 ? (
                <div className="col d-flex flex-column container-table">
                  <DataTable
                    variantsPage={variantsPage}
                    visibleColumns={visibleCols}
                    visibleColumnsInfo={visibleColsInfo}
                  />
                  <Pagination
                    firstPage={firstPage}
                    numberPage={numberPage}
                    lastPage={lastPage}
                    totalPages={totalPages}
                    onPageChange={changePage}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </main>
        </div>
        {showModalFilter && renderModal()}
      </div>
      <Footer />
    </>
  );
};
