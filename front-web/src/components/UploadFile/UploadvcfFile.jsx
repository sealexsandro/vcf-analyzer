import { useState } from "react";
import UploadFileService from "../../services/upload-vcf";
import "./styles.css";
import { Redirect } from "react-router-dom";
import VcfAnalized from "../../services/vcfFileSession";
import vcfFileSession from "../../services/vcfFileSession";

export const UploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState("");
  const [valueInput, setValueInput] = useState("");

  const [currentFile, setCurrentFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  // const [fileInfos, setFileInfos] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const selectFile = (event) => {
    message && setMessage("");
    setValueInput(event.target.value);
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];
    setValueInput("");
    setProgress(0);
    setCurrentFile(currentFile);

    UploadFileService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        // setMessage(response.data.message);
        vcfFileSession.setIdVcf(response.data);
        console.log(vcfFileSession.getIdVcf())
        // setTimeout(() => {
        //   setRedirect(true);
        // }, 1000);
        setRedirect(true);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Não foi possivel fazer o upload!");
        setCurrentFile("");
        setSelectedFiles("");
      });

    setSelectedFiles("");
  };

  const redirectPage = () => {
    return <Redirect path to="/table-variants" />;
  };
  return (
    <div className="d-flex flex-column justify-content-center">
      <div>
        <label htmlFor="arquivoVcf" id="labelInput">
          Selecionar VCF
        </label>
        <input
          type="file"
          onChange={selectFile}
          accept="text/x-vcard"
          id="arquivoVcf"
          value={valueInput}
        />
      </div>

      {/* <div className="d-flex justify-content-center"> */}
      {selectedFiles && (
        <div className="card divCardUpload">
          <div className="card-body d-flex justify-content-around">
            <div className="divNomeArquivo">{selectedFiles[0].name}</div>
            <div className="divButaoUpload">
              <button
                className={
                  selectedFiles
                    ? "btn btn-success butaoUpload"
                    : "butaoDesativado"
                }
                onClick={upload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
      </div>
      {/* </div> */}

      <div className="alert alert-light" role="alert">
        {message}
      </div>
      {redirect && redirectPage()}

      {/* <div className="card">
        <div className="card-header">List of Files</div>
        <ul className="list-group list-group-flush">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <li className="list-group-item" key={index}>
                <a href={file.url}>{file.name}</a>
              </li>
            ))}
        </ul>
      </div> */}
    </div>
  );
};
