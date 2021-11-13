import axios from "axios";
import * as FileSaver from "file-saver";
import { useEffect, useState } from "react";
import ReactExport from "react-data-export";
import * as XLSX from "xlsx";
import {
  HeaderFields,
  VariantsAttribs,
  VariantsAttribsMap,
} from "../../utils/tokens";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportButton = ({
  fullheaders,
  headers,
  headersInfo,
  data,
  fileName,
}) => {
  const allColumns = Array.from(fullheaders);
  const columnHeaders = Array.from(headers);
  const columnHeadersInfo = Array.from(headersInfo);
  const [variants, setVariants] = useState([]);
  // console.log(VariantsAttribsMap.get(HeaderFields.CHROM));
  // console.log(VariantsAttribs.get(HeaderFields.POS));

  //  console.log(columnHeaders.get(HeaderFields.FILTER) );

  // columnHeaders?.map((header) => header[1] && console.log(VariantsAttribsMap.get(header[0])));

  useEffect(() => {
    // let requisicao = `http://localhost:8080/tagsbyidvcf?id=${1}`;
    let requisicao = `http://localhost:8080/allvariants?&idvcf=${1}`;
    axios
      .get(requisicao)
      .then((response) => {
        const variants = response.data;
        // const variants = results.content;
        const variantData = [];

        console.log(response.data);
        variants.forEach((variant, index) => {
          // console.log(variant);

          let halfVariant = {
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
            // infoCol: new Map(Object.entries(variant.infoCol)),
          };
          // let infoCol = Object.fromEntries(variant.infoCol);
          let fullVariant = Object.assign({}, halfVariant, variant.infoCol);
          console.log(fullVariant)
          variantData[index] = fullVariant;
          
        });
        setVariants(variantData);
        // console.log("Pegando mais dados do banco");
      })
      .catch(() => {
        console.log("Não foi possivel Buscar Variantes no Banco");
      });
  }, []);

  // if (data.length > 0) {
  //   let index = 0;
  //   data.forEach((variant) => {
  //     let infoCol = variant.infoCol;
  //     let attribInfoCol = Object.fromEntries(infoCol);
  //     let newVariant = Object.assign({}, variant, attribInfoCol);
  //     newVariant.infoCol = undefined;
  //     dataVariants[index] = newVariant;
  //     index += 1;
  //   });
  // }

  const columns = () => {
    // return allColumns?.map(
    //   (header) =>
    //     header[1] && (
    //       console.log(header[1])
    //       // <ExcelColumn
    //       //   label={header[0]}
    //       //   value={VariantsAttribsMap.get(header[0])}
    //       // />
    //     )
    // );
    let columns = [];
    // if (allColumns.length <= 0) return;
    columnHeaders.forEach((header) => {
      header[1] &&
        columns.push(
          <ExcelColumn
            label={header[0]}
            value={VariantsAttribsMap.get(header[0])}
          />
        );
      // columnNames.push(column.name)
    });
    columnHeadersInfo.forEach((header) => {
      header[1] &&
        columns.push(<ExcelColumn label={header[0]} value={header[0]} />);
      // columnNames.push(column.name)
    });
    return columns;
  };

  return (
    <ExcelFile
      element={
        <button className="btn btn-md btn-primary shadow-none butao">
          Exportar
        </button>
      }
    >
      <ExcelSheet data={variants} name={fileName}>
        {columns()}

      </ExcelSheet>
    </ExcelFile>
  );
};

// export const ExportButton = ({ variantData, fileName }) => {
//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";

//   const exportToCSV = (variantData, fileName) => {
//     if (variantData !== null) {
//       const ws = XLSX.utils.json_to_sheet(variantData);
//       console.log(ws)
//       const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//       const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//       const data = new Blob([excelBuffer], { type: fileType });
//       FileSaver.saveAs(data, fileName + fileExtension);
//     }
//   };

//   return (
//     <button
//       className="btn btn-md btn-primary shadow-none butao"
//       onClick={(e) => exportToCSV(variantData, fileName)}
//     >
//       Exportar
//     </button>
//   );
// };
