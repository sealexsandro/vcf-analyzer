import { HeaderFields } from "../../utils/tokens";
import "../DataTable/styles.css";

export const DataTable = ({
  variantsPage,
  visibleColumns,
  visibleColumnsInfo,
}) => {
  const variants = variantsPage;
  const displayCols = visibleColumns;
  const displayColsInfo = visibleColumnsInfo;
  const displayColsList = Array.from(displayCols);
  const displayColsInfoList = Array.from(displayColsInfo);

  const contFullSamples = (samples) => {
    const samplesVector = samples.split(",");
    const contSamples = samplesVector.length;
    return contSamples;
  };

  return (
    <>
      {displayColsList.length > 0 && (
        <div className="col d-flex flex-column variants-table">
          <table className="table table-bordered">
            <thead>
              <tr>
                {displayColsList.map(
                  (header) =>
                    header[1] && (
                      <th scope="col" className="text-center text-table">
                        {header[0]}
                      </th>
                    )
                )}
                {displayColsInfoList.map(
                  (header) =>
                    header[1] && (
                      <th scope="col" className="text-center text-table">
                        {header[0]}
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {variants?.map((data) => (
                <tr key={data.index}>
                  {displayCols.get(HeaderFields.CHROM) && (
                    <td className="text-table text-align">{data.chrom}</td>
                  )}
                  {displayCols.get(HeaderFields.POS) && (
                    <td className="text-table text-align">{data.position}</td>
                  )}
                  {displayCols.get(HeaderFields.ID) && (
                    <td className="text-table text-align">{data.idVariant}</td>
                  )}
                  {displayCols.get(HeaderFields.REF) && (
                    <td className="text-table text-align">{data.reference}</td>
                  )}
                  {displayCols.get(HeaderFields.ALT) && (
                    <td className="text-table text-align">{data.alteration}</td>
                  )}
                  {displayCols.get(HeaderFields.QUAL) && (
                    <td className="text-table text-align">{data.quality}</td>
                  )}
                  {displayCols.get(HeaderFields.FILTER) && (
                    <td className="text-table">{data.filter}</td>
                  )}
                  {displayCols.get(HeaderFields.FORMAT) && (
                    <td className="text-table text-align">{data.format}</td>
                  )}
                  {displayCols.get(HeaderFields.SAMPLES) && (
                    <td className="text-table">
                      {contFullSamples(data.samples) > 5 ? (
                        <div className="scrollable">{data.samples} </div>
                      ) : (
                        <div>{data.samples} </div>
                      )}
                    </td>
                  )}
                  {displayColsInfoList.map(
                    (field) =>
                      field[1] && (
                        <th scope="col" className="text-center text-table">
                          <td className="text-table">
                            {data.infoCol.get(field[0])}
                          </td>
                        </th>
                      )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
