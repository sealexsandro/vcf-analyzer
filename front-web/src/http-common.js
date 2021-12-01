import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080",
    // baseURL: "https://vcf-teste.herokuapp.com/",
    headers:{
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*',
    },
});

