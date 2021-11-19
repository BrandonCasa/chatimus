import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import Cookies from "universal-cookie";
const BCrypt = require("bcryptjs");

const saltRounds = 10;

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
  status: number;
  selectedTheme: string;
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
  if (payload.accType === "anonymous") {
    let salt = BCrypt.genSaltSync(saltRounds);
    let secretHash = BCrypt.hashSync(payload.secretQuestion + payload.secretAnswer, salt);

    const newAcc = {
      accType: payload.accType,
      username: payload.username,
      email: payload.email,
      passHash: payload.passHash,
      hasPfp: false,
      pfpBase64: "",
      selectedTheme: payload.selectedTheme,
      secretHash: secretHash,
    };
    const cookies = new Cookies();
    let axiosResultA;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      axiosResultA = await axios.post(`http://selfrtx.com:3001/api/accounts/create`, newAcc);
    } else {
      axiosResultA = await axios.post(`https://selfrtx.com:3000/api/accounts/create`, newAcc);
    }
    console.log(axiosResultA.data);
    let savedAccounts = cookies.get("savedAccounts");
    if (savedAccounts !== undefined) {
      savedAccounts.accounts.push({
        accType: payload.accType,
        uuid: axiosResultA.data.uuid,
      });
      cookies.set("savedAccounts", savedAccounts);
    } else {
      cookies.set("savedAccounts", {
        accounts: [
          {
            accType: payload.accType,
            uuid: axiosResultA.data.uuid,
          },
        ],
      });
    }
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
        status: 0,
        selectedTheme: payload.selectedTheme,
      },
    };
    await dispatch(addAccount(newUser));
    await dispatch(setCurrentAccount(payload.numAccounts));
  } else {
    // other account types
  }
  return;
});

export const getExistingAccountAsync = createAsyncThunk("accounts/getExistingAccountAsync", async (payload: any, { dispatch }) => {
  // @ts-ignore
  if (payload.method === "uuid") {
    let axiosResultA;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      axiosResultA = await axios.get(`http://selfrtx.com:3001/api/accounts/get/uuid`, {
        params: {
          accType: payload.accType,
          uuid: payload.uuid,
        },
      });
    } else {
      axiosResultA = await axios.get(`https://selfrtx.com:3000/api/accounts/get/uuid`, {
        params: {
          accType: payload.accType,
          uuid: payload.uuid,
        },
      });
    }
    const existingUser: Account = {
      accInfo: {
        username: axiosResultA.data.username,
        uuid: axiosResultA.data.uuid,
        email: axiosResultA.data.email,
        hasPfp: axiosResultA.data.hasPfp,
        pfpBase64: axiosResultA.data.pfpBase64,
      },
      accState: {
        status: 0,
        selectedTheme: axiosResultA.data.selectedTheme,
      },
    };
    await dispatch(addAccount(existingUser));
    await dispatch(setCurrentAccount(payload.numAccounts));
    return;
  } else {
    let axiosResultA: AxiosResponse<any, any>;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      axiosResultA = await axios.get(`http://selfrtx.com:3001/api/accounts/get/secret`, {
        params: {
          accType: payload.accType,
          secretQuestion: payload.secretQuestion,
          secretAnswer: payload.secretAnswer,
          username: payload.username,
        },
      });
    } else {
      axiosResultA = await axios.get(`https://selfrtx.com:3000/api/accounts/get/secret`, {
        params: {
          accType: payload.accType,
          secretQuestion: payload.secretQuestion,
          secretAnswer: payload.secretAnswer,
          username: payload.username,
        },
      });
    }
    const existingUser: Account = {
      accInfo: {
        username: axiosResultA.data.username,
        uuid: axiosResultA.data.uuid,
        email: axiosResultA.data.email,
        hasPfp: axiosResultA.data.hasPfp,
        pfpBase64: axiosResultA.data.pfpBase64,
      },
      accState: {
        status: 0,
        selectedTheme: axiosResultA.data.selectedTheme,
      },
    };
    await dispatch(addAccount(existingUser));
    await dispatch(setCurrentAccount(payload.numAccounts));
    const cookies = new Cookies();

    let savedAccounts = cookies.get("savedAccounts");
    if (savedAccounts !== undefined) {
      if (savedAccounts.accounts.findIndex((acc: any) => acc.uuid === axiosResultA.data.uuid) === -1)
        savedAccounts.accounts.push({
          accType: axiosResultA.data.accType,
          uuid: axiosResultA.data.uuid,
        });
      cookies.set("savedAccounts", savedAccounts);
    } else {
      cookies.set("savedAccounts", {
        accounts: [
          {
            accType: axiosResultA.data.accType,
            uuid: axiosResultA.data.uuid,
          },
        ],
      });
    }
    return;
  }
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
      let foundAcc = state.data.accounts.find((acc) => acc.accInfo.uuid === action.payload.accInfo.uuid);
      if (foundAcc === undefined) {
        state.data.accounts.push(action.payload);
      } else {
        state.data.currAccount = state.data.accounts.indexOf(foundAcc);
      }
    },
    removeAccount: (state, action: PayloadAction<number>) => {
      const cookies = new Cookies();

      let savedAccounts = cookies.get("savedAccounts");
      let currState = current(state);
      let savedAccountIndex = savedAccounts.accounts.findIndex((acc: any) => acc.uuid === currState.data.accounts[currState.data.currAccount].accInfo.uuid);
      savedAccounts.accounts.splice(savedAccountIndex, 1);
      cookies.set("savedAccounts", savedAccounts);
      state.data.currAccount -= 1;
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
  },
  extraReducers: (builder) => {
    builder.addCase(createAccountAsync.fulfilled, (state, action) => {
      // Add user to the state array
      // @ts-ignore
    });
  },
});

export const { addAccount, removeAccount, setCurrentAccount, setUsername, setEmail, setStatus } = accountsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectAccounts = (state: RootState) => state.accounts.data;

export default accountsSlice.reducer;
