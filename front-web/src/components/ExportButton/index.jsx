import { useEffect, useState } from "react";
import ReactExport from "react-export-excel";
import http from "../../http-common";
import vcfFileSession from "../../services/vcfFileSession";
import { HeaderFields, VariantsAttribsMap } from "../../utils/tokens";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportButton = ({
  fullheaders,
  headers,
  headersInfo,
  fileName,
  tableFilters,
}) => {
  const columnHeaders = Array.from(headers);
  const columnHeadersInfo = Array.from(headersInfo);
  const [variants, setVariants] = useState([]);
  const initValueOption = "-----";

  useEffect(() => {
    // if (exportar) {
    let filters = "";
    tableFilters.forEach(function (value, key) {
      if (
        key !== HeaderFields.INFO &&
        value !== "" &&
        value !== initValueOption
      ) {
        if (filters !== "") {
          filters += "&";
        }
        filters += key + "=" + value;
      } else {
        if (value !== "" && value !== initValueOption) {
          if (filters !== "") {
            filters += "&";
          }
          let infoKeyValue = value.split("=");
          filters += key + "=" + infoKeyValue[0] + "-" + infoKeyValue[1];
        }
      }
    });
    console.log("Filtres: ", filters);
    let requisicao = `/allvariantsbyfields?${filters}&idvcf=${vcfFileSession.getIdVcf()}`;
    http
      .get(requisicao)
      .then((response) => {
        const variants = response.data;
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
          let fullVariant = Object.assign({}, halfVariant, variant.infoCol);
          // console.log(fullVariant);
          variantData[index] = fullVariant;
        });
        setVariants(variantData);
        // console.log("Pegando mais dados do banco");
      })
      .catch(() => {
        console.log("N??o foi possivel Buscar Variantes no Banco");
      });
    // }
  }, [tableFilters]);

  const columns = () => {
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
        <button
          className="btn btn-md btn-primary shadow-none butao"
        >
          Exportar
        </button>
      }
    >
      <ExcelSheet data={variants} name="variantsDownload">
        {columns()}
      </ExcelSheet>
    </ExcelFile>
  );
};
