import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {setMessage} from "./message";
import UserService from "../services/user.service";
import EventBus from "../components/auth/EventBus";

export const getRates = createAsyncThunk(
    "user/rates",
    async ({restaurant_id}, thunkAPI) => {
        try {
            const data = await UserService.getRates(restaurant_id);
            return {data: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 401 || error.response.status === 422 || error.response.status === 500)) {
                EventBus.dispatch("logout");
            }
            return thunkAPI.rejectWithValue();
        }
    }
);

export const setRate = createAsyncThunk(
    "user/rates/set",
    async ({restaurant_id, rating}, thunkAPI) => {
        try {
            const response = await UserService.setRate(restaurant_id, rating);
            thunkAPI.dispatch(setMessage(response.message));
            return {data : response.rating};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 401 || error.response.status === 422 || error.response.status === 500)) {
                EventBus.dispatch("logout");
            }
            return thunkAPI.rejectWithValue();
        }
    }
);

export const getSimilarUsers = createAsyncThunk(
    "user/similar",
    async ({}, thunkAPI) => {
        try {
            const data = await UserService.getSimilarUsers();
            return {data: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 401 || error.response.status === 422 || error.response.status === 500)) {
                EventBus.dispatch("logout");
            }
            return thunkAPI.rejectWithValue();
        }
    }
);


const initialState = {
    rates : {"rating" : 0},
    similarUsers : []
};

const userSlice = createSlice({
    name: "user",
    initialState,
        extraReducers: {
            [getRates.pending]: (state, action) => {
              state.rates = {"rating" : 0}
            },
            [getRates.fulfilled]: (state, action) => {
                const data = action.payload.data;
                state.rates = data;
            },
            [setRate.fulfilled] : (state, action) => {
                state.rates = {"rating" : action.payload.data};
            },
            [getSimilarUsers.pending]: (state, action) => {
                state.similarUsers = []
            },
            [getSimilarUsers.fulfilled]: (state, action) => {
                state.similarUsers = action.payload.data;
            }
        }
});

const {reducer} = userSlice;
export default reducer;
