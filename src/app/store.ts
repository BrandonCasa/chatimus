import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import accountsReducer from "./accounts/accountsSlice";
import notificationsReducer from "./notifications/notificationsSlice";
import appStateReducer from "./appstate/appSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    notifications: notificationsReducer,
    appstate: appStateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
