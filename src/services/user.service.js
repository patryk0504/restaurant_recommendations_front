import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getRates = (restaurant_id) => {
    return axios
        .get(API_URL + "/restaurant/" + restaurant_id +  "/rates",
            {headers : authHeader()},
            )
        .then((response) => {
            return response.data;
        })
}


const setRate = (restaurant_id, rating) => {
    return axios
        .post(API_URL + "/restaurant/" + restaurant_id + "/rate",
            {"rating" : rating},
            {headers : authHeader()},
            )
        .then((response) => {
            return response.data;
        })
}

const getSimilarUsers = () => {
    return axios
        .get(API_URL + "/users/similar",
            {headers : authHeader()}
            )
        .then((response)=>{
            return response.data;
        })
}

export default {getRates, setRate, getSimilarUsers};