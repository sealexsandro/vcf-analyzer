import axios from "../axiosConfig";

class UploadFileService{

    upload(vcfFile, onUploadProgress){
        let formData = new FormData();

        formData.append("file", vcfFile);

        return axios.post("/upload", formData, {
            headers:{
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            },
            onUploadProgress,
        });
    }
    
}

export default new UploadFileService();