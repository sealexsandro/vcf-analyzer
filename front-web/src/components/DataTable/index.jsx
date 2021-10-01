import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import VcfAnalized from "../../services/vcf-analized";


export const DataTable = () => {
  const [activePage, setActivePage] = useState(0);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  // const [totalElements, setTotalElements] = useState(0);
  const [numberPage, setNumberPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [page, setPage] = useState([]);

  useEffect(() => {
    axios
      // .get(`http://localhost:8080/files?page=${activePage}&sort=id&size=10`)
      .get(`http://localhost:8080/filesgetbyid?id=${1}&page=${activePage}&sort=id&size=10`)
      .then((response) => {
        const results = response.data;

        setFirstPage(results.filter);
        setLastPage(results.last);
        setNumberPage(results.number);
        setTotalPages(results.totalPages);

        const variants = results.content;
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
        console.log(variantData);
      });
  }, [activePage]);

  const changePage = (numberOfPage) => {
    console.log("Ativou: ", numberOfPage);

    setActivePage(numberOfPage);
  };

  return (
    <>
      <div className="table-responsive-sm">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                CHROM
              </th>
              <th scope="col" className="text-center">
                POS
              </th>
              <th scope="col" className="text-center">
                ID
              </th>
              <th scope="col" className="text-center">
                REF
              </th>
              <th scope="col" className="text-center">
                ALT
              </th>
              <th scope="col" className="text-center">
                QUAL
              </th>
              <th scope="col" className="text-center">
                Samples
              </th>
            </tr>
          </thead>
          <tbody>
            {page?.map((data) => (
              <tr key={data.index}>
                <td>{data.chrom}</td>
                <td>{data.position}</td>
                <td>{data.idVariant}</td>
                <td>{data.reference}</td>
                <td>{data.alteration}</td>
                <td>{data.quality}</td>
                <td>{data.sample}</td>
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
