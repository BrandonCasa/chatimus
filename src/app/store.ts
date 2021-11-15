import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "./accounts/accountsSlice";
import appStateReducer from "./appstate/appSlice";
import notificationsReducer from "./notifications/notificationsSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    notifications: notificationsReducer,
    appstate: appStateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
