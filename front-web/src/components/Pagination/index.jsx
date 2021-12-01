import '../Pagination/styles.css';

const Pagination = (props) => {
  const { firstPage, numberPage, lastPage, totalPages, onPageChange } = props;
  return (
    <div className="d-flex flex-row-reverse container-page">
      <nav>
        <ul className="pagination">
          <li className={`page-item ${firstPage ? "disabled" : ""}`}>
            <button
              className="btn-page page-link"
              onClick={() => onPageChange(numberPage - 1)}
            >
              Anterior
            </button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">
              {totalPages > 0 ? `${ numberPage + 1} de ${totalPages}` : 0}
            </span>
          </li>
          <li className={`page-item btn-transition ${lastPage ? "disabled" : ""}`}>
            <button
              className="btn-page page-link"
              onClick={() => onPageChange(numberPage + 1)}
            >
              Próxima
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
