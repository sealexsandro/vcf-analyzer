import axios from "axios";
import { Variante } from "../../types/variante";
import { variantPage } from "../../types/variante";
import { useEffect, useState } from "react";

export default function DataTable() {
  const [activePage, setActivePage] = useState(0);

  const [page, setPage] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/files`).then((response) => {
      const results = response.data;
      const variantData = [];
      results.forEach((variant, index) => {
        variantData[index] = {
          chrom: variant.chrom,
          position: variant.position,
          id: variant.id,
          reference: variant.reference,
          alteration: variant.alteration,
          quality: variant.quality,
          filter: variant.filter,
          format: variant.format,
        };
      });
      setPage(variantData);
    });
      
    // axios
    //   .get(
    //     `http://localhost:8080/files/sales?page=${activePage}&size=20&sort=date,desc`
    //   )
    //   .then((response) => {
    //     setPage(response.data);
    //   });
  }, []);

  return (
    <div className="table-responsive-sm">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">CHROM</th>
            <th scope="col">POS</th>
            <th scope="col">ID</th>
            <th scope="col">REF</th>
            <th scope="col">ALT</th>
            <th scope="col">QUAL</th>
          </tr>
        </thead>
        <tbody>
          {page?.map((data) => (
            <tr key={data.index}>
              <td>{data.chrom}</td>
              <td>{data.position}</td>
              <td>{data.id}</td>
              <td>{data.reference}</td>
              <td>{data.alteration}</td>
              <td>{data.quality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
