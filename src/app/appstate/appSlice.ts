import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AppStateData {
  addAccountDialogOpen: boolean;
  loginAnonymouslyDialogOpen: boolean;
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
  },
});

export const { setAddAccountDialogOpen, setLoginAnonymouslyDialogOpen } = notificationsSlice.actions;

export default notificationsSlice.reducer;
