import { useEffect, useState } from "react";
import { VariantTypes } from "../../utils/tokens";
import "../styles-global.css";

export const DataSummaryOfChart = ({ statistics, tagInfoCol }) => {
  // console.log(tagInfoCol);
  const tagInfo = tagInfoCol;
  const [media, setMedia] = useState(0);
  const [mediana, setMediana] = useState(0);
  const [valorMinimo, setValorMinimo] = useState(0);
  const [valorMaximo, setValorMaximo] = useState(0);

  useEffect(() => {
    if (statistics) {
      statistics.forEach((element, index) => {
        if (element.dataName === VariantTypes.FULL_VARIANT_TYPE) {
          // setDataName(element.dataName);
          setMedia(element.media);
          setMediana(element.mediana);
          setValorMinimo(element.valorMinimo);
          setValorMaximo(element.valorMaximo);
          return;
        }
      });
    }
  }, [statistics]);

  return (
    <div className="border h-100 box-statistics-data movable-bar p-3">
      {tagInfo && (
        <>
          <div className="d-flex justify-content-center align-items-center pb-2 ">
            <span className="fs-6 text-truncate">
              <b>Statistics of all {tagInfo.tagField}s</b>
            </span>
          </div>
          <hr />
          <div>
            <p>
              <b> Description of {tagInfo.tagField}:</b> {tagInfo.description}
            </p>
          </div>
          <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap  justify-content-center">
            {tagInfo && (
              <div className="">
                <li className="">
                  <div>
                    <span className="">
                      <b>Average of all {tagInfo.tagField}s:</b>{" "}
                    </span>
                    <span className="">{media}</span>
                  </div>
                </li>
                <br />
                <li className="">
                  <div>
                    <span className="">
                      <b>Median of all {tagInfo.tagField}s:</b>{" "}
                    </span>
                    <span className="">{mediana}</span>
                  </div>
                </li>
                <br />
                <li className="">
                  <div>
                    <span className="">
                      <b>Highest value of {tagInfo.tagField}:</b>{" "}
                    </span>
                    <span className="">{valorMaximo}</span>
                  </div>
                </li>
                <br />
                <li className="">
                  <div>
                    <span className="">
                      <b>Lower value of {tagInfo.tagField}:</b>{" "}
                    </span>
                    <span className="">{valorMinimo}</span>
                  </div>
                </li>
                <br />
              </div>
            )}
          </ul>
        </>
      )}
    </div>
  );
};
