import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import accountsReducer from "./accounts/accountsSlice";
import notificationsReducer from "./notifications/notificationsSlice";

const store = configureStore({
  reducer: {
    accountsData: accountsReducer,
    notificationsData: notificationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
