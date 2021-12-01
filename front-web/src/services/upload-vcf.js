import http from "../http-common";

class UploadFileService{

    upload(vcfFile, onUploadProgress){
        let formData = new FormData();

        formData.append("file", vcfFile);

        return http.post("/upload", formData, {
            headers:{
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            },
            onUploadProgress,
        });
    }
    
}

export default new UploadFileService();