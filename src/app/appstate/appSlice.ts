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
    refreshServerIp: (state) => {
      axios
        .get("http://ec2-54-226-61-67.compute-1.amazonaws.com:3000/ip")
        .then(function (response) {
          state.data.currentServerIp = response.data;
        })
        .catch(function (error) {
          state.data.currentServerIp = "";
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      return;
    },
  },
});

export const { setAddAccountDialogOpen, setLoginAnonymouslyDialogOpen, refreshServerIp } = notificationsSlice.actions;

export default notificationsSlice.reducer;
