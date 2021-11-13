import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

interface AppStateData {
  addAccountDialogOpen: boolean;
  loginAnonymouslyDialogOpen: boolean;
  currentServerIp: string;
}

// Define a type for the slice state
interface AppState {
  data: AppStateData;
}

// Define the initial state using that type
const initialState: AppState = {
  data: {
    addAccountDialogOpen: false,
    loginAnonymouslyDialogOpen: false,
    currentServerIp: "",
  },
};

export const notificationsSlice = createSlice({
  name: "appstate",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAddAccountDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.data.addAccountDialogOpen = action.payload;
      return;
    },
    setLoginAnonymouslyDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.data.loginAnonymouslyDialogOpen = action.payload;
      return;
    },
    refreshServerIp: (state, action: PayloadAction<string>) => {
      state.data.currentServerIp = action.payload;
      return;
    },
  },
});

export const { setAddAccountDialogOpen, setLoginAnonymouslyDialogOpen, refreshServerIp } = notificationsSlice.actions;

export default notificationsSlice.reducer;
