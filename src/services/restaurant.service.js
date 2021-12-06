import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/restaurant/";

const getRestaurants = () => {
    return axios
        .get(API_URL + "list",
            {headers: authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

const getRestaurantRecommendationInCity = (restaurant_id) => {
    return axios
        .get(API_URL + restaurant_id + "/recommendations/city",
            {headers: authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

const getRestaurantRecommendationAllCountry = (restaurant_id) => {
    return axios
        .get(API_URL + restaurant_id + "/recommendations/country",
            {headers: authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

const getRestaurantRecommendationByUsers = () => {
    return axios
        .get(API_URL + "recommendations/rating",
            {headers: authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

export default {
    getRestaurants,
    getRestaurantRecommendationInCity,
    getRestaurantRecommendationAllCountry,
    getRestaurantRecommendationByUsers
};