// auth service
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL + "/auth/";

const register = (username, password) => {
    return axios.post(API_URL + "register",
        {
            username,
            password
        })
        .then((response) => {
            if (response.data.status === 'fail') {
                throw new Error(response.data.message);
            }
            return response.data;
        });
}

const login = (username, password) => {
    return axios
        .post(API_URL + "login",
            {
                username,
                password
            })
        .then((response) => {
            if (response.data.auth_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            if (response.data.status === 'fail') {
                throw new Error(response.data.message);
            }
            return response.data;
        });
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {register, login, logout, getCurrentUser};