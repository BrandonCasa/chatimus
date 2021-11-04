import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import accountsReducer from "./accounts/accountsSlice";
import notificationsReducer from "./notifications/notificationsSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    notifications: notificationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
