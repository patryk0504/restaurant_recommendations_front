import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import {setMessage} from "./message";
import AuthService from "../services/auth.service";
import RestaurantService from "../services/restaurant.service";
import EventBus from "../components/auth/EventBus";


export const getRestaurants = createAsyncThunk(
    "restaurant/list",
    async ({}, thunkAPI) => {
        try {
            const data = await RestaurantService.getRestaurants();
            return {data: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 401 || error.response.status === 422)) {
                EventBus.dispatch("logout");
            }
            return thunkAPI.rejectWithValue();
        }
    }
);

export const getRestaurantRecommendationInCity = createAsyncThunk(
    "restaurant/recommendation/city",
    async ({restaurant_id}, thunkAPI) => {
        try {
            const data = await RestaurantService.getRestaurantRecommendationInCity(restaurant_id);
            return {data: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 401 || error.response.status === 422)) {
                EventBus.dispatch("logout");
            }
            return thunkAPI.rejectWithValue();
        }
    }
);


export const getRestaurantRecommendationAllCountry = createAsyncThunk(
    "restaurant/recommendation/country",
    async ({restaurant_id}, thunkAPI) => {
        try {
            const data = await RestaurantService.getRestaurantRecommendationAllCountry(restaurant_id);
            return {data: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 401 || error.response.status === 422)) {
                EventBus.dispatch("logout");
            }
            return thunkAPI.rejectWithValue();
        }
    }
);

export const getRestaurantRecommendationByUsers = createAsyncThunk(
    "restaurant/recommendation/users",
    async ({restaurant_id}, thunkAPI) => {
        try {
            const data = await RestaurantService.getRestaurantRecommendationByUsers({});
            return {data: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 401 || error.response.status === 422)) {
                EventBus.dispatch("logout");
            }
            return thunkAPI.rejectWithValue();
        }
    }
);

export const setRestaurantId = createAction(
    "restaurant/setRestaurantId",
    ({restaurant_id}) => {
        return {
            payload: {
                restaurant_id: restaurant_id
            }
        }
    });

export const setRecommendedArea = createAction(
    "restaurant/setRecommendedArea",
    (area) => {
        return {
            payload: {
                recommendedArea: area
            }
        }
    });


const initialState = {
    restaurants: [],
    recommended: [],
    recommendedByUser: [],
    recommendedFound: true,
    recommendedByRestaurantID: null,
    recommendedAreaCountry: null, //true - country, false - city
};

const restaurantSlice = createSlice({
    name: "restaurant",
    initialState,
    extraReducers: {
        [setRestaurantId]: (state, action) => {
            state.recommendedByRestaurantID = action.payload.restaurant_id;
        },
        [setRecommendedArea]: (state, action) => {
            state.recommendedAreaCountry = action.payload.recommendedArea.area;
        },
        [getRestaurants.fulfilled]: (state, action) => {
            const data = action.payload.data;
            state.restaurants = data;
        },
        [getRestaurantRecommendationInCity.pending]: (state, action) => {
            state.recommended = [];
        },
        [getRestaurantRecommendationInCity.fulfilled]: (state, action) => {
            const data = action.payload.data.recommended;
            const status = action.payload.data.status;
            if (status === "success") {
                state.recommended = data;
                state.recommendedFound = true;
            } else {
                state.recommendedFound = false;
            }
        },
        [getRestaurantRecommendationAllCountry.pending]: (state, action) => {
            state.recommended = [];
        },
        [getRestaurantRecommendationAllCountry.fulfilled]: (state, action) => {
            const data = action.payload.data.recommended;
            const status = action.payload.data.status;
            if (status === "success") {
                state.recommended = data;
                state.recommendedFound = true;
            } else {
                state.recommendedFound = false;
            }
        },
        [getRestaurantRecommendationByUsers.pending]: (state, action) => {
            state.recommendedByUser = [];
        },
        [getRestaurantRecommendationByUsers.fulfilled]: (state, action) => {
            const data = action.payload.data.recommended;
            const status = action.payload.data.status;
            if (status === "success") {
                state.recommendedByUser = data;
                state.recommendedFound = true;
            } else {
                state.recommendedFound = false;
            }
        }
    }
});

const {reducer} = restaurantSlice;
export default reducer;
