import { PieChart } from "../../components/Charts/PieChart";
import '../PieChartInfo/styles.css'

export const PieChartInfo = ({ tagInfoCol }) => {
  return (
    <div className="box-statistics-pie  p-3 d-flex flex-wrap align-content-start">
      <div className="box-chart-pie">
        <PieChart tagInfoCol={tagInfoCol} />
      </div>
      {console.log("Renderização")}
      <div className="border h-100 box-statistics-data-pie movable-bar p-3">
        {tagInfoCol && (
          <>
            <div className="d-flex justify-content-center align-items-center pb-2 ">
              <span className="fs-6 text-truncate">
                <b>Statistics of all {tagInfoCol.tagField}s</b>
              </span>
            </div>
            <hr />
            <div>
              <p>
                <b> Description of {tagInfoCol.tagField}:</b>{" "}
                {tagInfoCol.description}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
