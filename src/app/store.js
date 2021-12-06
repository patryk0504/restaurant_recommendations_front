import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import restaurantReducer from "../slices/restaurant";
import propertiesReducer from "../slices/properties";
import userReducer from "../slices/user";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  restaurant: restaurantReducer,
  properties: propertiesReducer,
  user: userReducer,
  // histogram: histogramReducer,
  // stats: statsReducer
}
export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
