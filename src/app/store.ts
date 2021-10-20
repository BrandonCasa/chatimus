import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import accountsReducer from "./accounts/accountsSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
