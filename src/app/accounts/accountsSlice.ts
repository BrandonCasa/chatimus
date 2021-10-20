import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface AccountInfo {
  username: string;
  uniqueId: number;
  email: string;
  hasPfp: boolean;
}

export interface AccountState {
  loggedIn: boolean;
  status: number;
}

export interface Account {
  accInfo: AccountInfo;
  accState: AccountState;
}

export interface AccountsData {
  accounts: Account[];
  currAccount: number;
}

// Define a type for the slice state
interface AccountsState {
  data: AccountsData;
}

// Define the initial state using that type
const initialState: AccountsState = {
  data: {
    accounts: [],
    currAccount: -1,
  },
};

export const accountsSlice = createSlice({
  name: "accounts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Account>) => {
      state.data.accounts.push(action.payload);
    },
    removeAccount: (state, action: PayloadAction<number>) => {
      if (state.data.currAccount === action.payload) {
        state.data.currAccount -= 1;
      }
      state.data.accounts.splice(action.payload, 1);
    },
    setCurrentAccount: (state, action: PayloadAction<number>) => {
      //if (state.data.accounts.length > action.payload) {
      //  state.data.currAccount = action.payload;
      //}
      state.data.currAccount = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.data.accounts[state.data.currAccount].accInfo.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.data.accounts[state.data.currAccount].accInfo.email = action.payload;
    },
    setStatus: (state, action: PayloadAction<number>) => {
      state.data.accounts[state.data.currAccount].accState.status = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.data.accounts[state.data.currAccount].accState.loggedIn = action.payload;
    },
  },
});

export const { addAccount, removeAccount, setCurrentAccount, setUsername, setEmail, setStatus, setLoggedIn } = accountsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAccounts = (state: RootState) => state.accounts.data;

export default accountsSlice.reducer;
