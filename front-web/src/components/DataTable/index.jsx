import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
// import VcfAnalized from "../../services/vcf-analized";
import "../DataTable/styles.css";

export const DataTable = (filters) => {
  const {
    chrom,
    reference,
    alteration,
    filter,
    infoFieldKeyAndValue,
  } = filters;
  // console.log(filters)
  const [activePage, setActivePage] = useState(0);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  // const [totalElements, setTotalElements] = useState(0);
  const [numberPage, setNumberPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState([]);

  const [columnsOfTable, setColumnsOfTable] = useState([]);

  useEffect(() => {
    let  requisicao = `http://localhost:8080/getfilesbyfilds?page=${activePage}&sort=id&size=10&chrom=${chrom}&position=${-1}&reference=${reference}&alteration=${alteration}&info_field=${infoFieldKeyAndValue}&id=${1}`;
    axios
      .get(
        requisicao
        // `http://localhost:8080/filesgetbyid?id=${1}&page=${activePage}&sort=id&size=10`
      )
      .then((response) => {
        const results = response.data;

        console.log(results.first)
        console.log(results.last);
        console.log(results.number);
        console.log(results.totalPages);

        setFirstPage(results.first);
        setLastPage(results.last);
        setNumberPage(results.number);
        setTotalPages(results.totalPages);

        const variants = results.content;
        console.log(variants)
        const variantData = [];
        variants.forEach((variant, index) => {
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
            sample: variant.sample,
          };
          
        });
        setPage(variantData);
        // console.log(variantData);
      });
  }, [activePage, alteration, chrom, infoFieldKeyAndValue, reference]);

  const changePage = (numberOfPage) => {
    // console.log("Ativou: ", numberOfPage);

    setActivePage(numberOfPage);
  };

  const contFullSamples = (samples) => {
    const samplesVector = samples.split(",");
    const contSamples = samplesVector.length;
    // console.log(contSamples);
    return contSamples;
  };

  return (
    <>
      <div className="table-responsive-sm variant-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" className="text-center text-table">
                CHROM
              </th>
              <th scope="col" className="text-center text-table">
                POS
              </th>
              <th scope="col" className="text-center text-table">
                ID
              </th>
              <th scope="col" className="text-center text-table">
                REF
              </th>
              <th scope="col" className="text-center text-table">
                ALT
              </th>
              <th scope="col" className="text-center text-table">
                QUAL
              </th>
              <th scope="col" className="text-center text-table">
                SAMPLES
              </th>
            </tr>
          </thead>
          <tbody>
            {page?.map((data) => (
              <tr key={data.index}>
                <td className="text-table">{data.chrom}</td>
                <td className="text-table">{data.position}</td>
                <td className="text-table">{data.idVariant}</td>
                <td className="text-table">{data.reference}</td>
                <td className="text-table">{data.alteration}</td>
                <td className="text-table">{data.quality}</td>
                <td className="text-table">
                  {contFullSamples(data.sample) > 5 ? (
                    <div className="scrollable">{data.sample} </div>
                  ) : (
                    <div>
                      {/* {console.log("Senao")} */}
                      {data.sample}{" "}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        firstPage={firstPage}
        numberPage={numberPage}
        lastPage={lastPage}
        totalPages={totalPages}
        onPageChange={changePage}
      />
    </>
  );
};
