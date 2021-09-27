import { TableFilter } from "../TableFilter";
import { DataTable } from "../DataTable";

export const VcfTable = () => {
  return (
    <div className="container-fluid d-flex flex-xl-row flex-column justify-content-between container-table">
      <div className="align-self-start">
        <TableFilter />
      </div>
      <div className="col-sm-10 d-flex flex-column ">
        <DataTable />
      </div>
    </div>
  );
};
