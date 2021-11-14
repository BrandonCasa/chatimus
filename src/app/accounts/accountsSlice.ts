import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../../app/store";
import axios from "axios";
import Cookies from "universal-cookie";
import { useAppDispatch } from "../hooks";

export interface AccountInfo {
  username: string;
  uuid: string;
  email: string;
  hasPfp: boolean;
  pfpBase64: string;
}
// Status
// 0=ONLINE, 1=OFFLINE, 2=LIGHTLY_DISTURB, 3=DO_NOT_DISTURB
export interface AccountState {
  loggedIn: boolean;
  status: number;
}

export interface Account {
  accInfo: AccountInfo;
  accState: AccountState;
}

export interface AccountRequest {
  accType: string;
  username: string;
  serverIp: string;
  email?: string;
  passSalt?: string;
  passHash?: string;
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

export const createAccountAsync = createAsyncThunk("accounts/createAccountAsync", async (payload: any, { dispatch }) => {
  const newAcc = {
    accType: payload.accType,
    username: payload.username,
    email: payload.email,
    passSalt: payload.passSalt,
    passHash: payload.passHash,
    uuid: "",
    hasPfp: payload.hasPfp,
    pfpBase64: payload.pfpBase64,
  };
  const cookies = new Cookies();
  let axiosResultA = await axios.post(`http://${payload.serverIp}:3000/api/accounts/create`, newAcc);
  console.log(axiosResultA.data);
  cookies.set("anonymousAccountExists", true);
  cookies.set("anonymousUUID", axiosResultA.data.uuid);
  let newUUID = axiosResultA.data.uuid;
  console.log("Saved New User");
  const newUser: Account = {
    accInfo: {
      username: payload.username,
      uuid: newUUID,
      email: "",
      hasPfp: payload.hasPfp,
      pfpBase64: payload.pfpBase64,
    },
    accState: {
      loggedIn: true,
      status: 0,
    },
  };
  dispatch(addAccount(newUser));
  return;
});

export const getExistingAccountAsync = createAsyncThunk("accounts/getExistingAccountAsync", async (payload: any, { dispatch }) => {
  // @ts-ignore
  let axiosResultA = await axios.get(`http://${payload.serverIp}:3000/api/accounts/get`, {
    params: {
      uuid: payload.uuid,
    },
  });
  const existingUser: Account = {
    accInfo: {
      username: axiosResultA.data.username,
      uuid: axiosResultA.data.uuid,
      email: axiosResultA.data.email,
      hasPfp: axiosResultA.data.hasPfp,
      pfpBase64: axiosResultA.data.pfpBase64,
    },
    accState: {
      loggedIn: true,
      status: 0,
    },
  };
  dispatch(addAccount(existingUser));
  return;
});

export const accountsSlice = createSlice({
  name: "accounts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Add a reducer that will change the profile picture of the currently selected account
    setPfp: (state, action: PayloadAction<string>) => {
      state.data.accounts[state.data.currAccount].accInfo.pfpBase64 = action.payload;
      state.data.accounts[state.data.currAccount].accInfo.hasPfp = true;
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      console.log(action.payload);
      state.data.accounts.push(action.payload);
    },
    removeAccount: (state, action: PayloadAction<number>) => {
      if (state.data.currAccount === action.payload) {
        state.data.currAccount -= 1;
      }
      state.data.accounts.splice(action.payload, 1);
    },
    setCurrentAccount: (state, action: PayloadAction<number>) => {
      if (state.data.accounts.length > action.payload) {
        state.data.currAccount = action.payload;
      }
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
    /*
    createAccount: (state, action: PayloadAction<AccountRequest>) => {
      const newAcc = {
        accType: action.payload.accType,
        username: action.payload.username,
        email: action.payload.email || "",
        passSalt: action.payload.passSalt || "",
        passHash: action.payload.passHash || "",
        uuid: "",
      };
      const cookies = new Cookies();
      let newUUID = "";
      axios
        .post(`http://${action.payload.serverIp}:3000/api/accounts/create`, newAcc)
        .then((res) => {
          console.log(res.data);
          cookies.set("anonymousAccountExists", true);
          cookies.set("anonymousUUID", res.data.uuid);
          newUUID = res.data.uuid;
          console.log("Saved New User");
        })
        .finally(() => {
          const newUser: Account = {
            accInfo: {
              username: action.payload.username,
              uuid: newUUID,
              email: "",
              hasPfp: false,
              pfpBase64: "",
            },
            accState: {
              loggedIn: true,
              status: 0,
            },
          };
          return;
        });
    },
    */
  },
  extraReducers: (builder) => {
    builder.addCase(createAccountAsync.fulfilled, (state, action) => {
      // Add user to the state array
      // @ts-ignore
    });
  },
});

export const { addAccount, removeAccount, setCurrentAccount, setUsername, setEmail, setStatus, setLoggedIn } = accountsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectAccounts = (state: RootState) => state.accounts.data;

export default accountsSlice.reducer;
