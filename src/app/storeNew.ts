import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import accountsReducer from "./accounts/accountsSlice";

const store = configureStore({
  reducer: {
    accountsData: accountsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
