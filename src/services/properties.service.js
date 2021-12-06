import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getCuisines = () => {
    return axios
        .get(API_URL + "/cuisine/list",
            {headers : authHeader()},
            )
        .then((response) => {
            return response.data;
        })
}

export default {getCuisines};