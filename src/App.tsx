import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import BottomNavBar from "./features/bottomnavbar/BottomNavBar";
import TopAppBar from "./features/topappbar/TopAppBar";
import HomePage from "./pages/home/HomePage";
import themeDarkModeA from "./themes/DarkModeA";
import Cookies from "universal-cookie";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { refreshServerIp, setLoginAnonymouslyDialogOpen } from "./app/appstate/appSlice";
import { getExistingAccountAsync } from "./app/accounts/accountsSlice";

function App() {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts.data.accounts);
  const cookies = new Cookies();

  React.useEffect(() => {
    dispatch(refreshServerIp("44.194.181.255"));
    if (cookies.get("anonymousAccountExists")) {
      // Proceed to add the account to the list as it already exists
      const data = {
        serverIp: "44.194.181.255",
        uuid: cookies.get("anonymousUUID"),
        numAccounts: accounts.length,
      };
      dispatch(getExistingAccountAsync(data));
    }
  }, []);

  return (
    <ThemeProvider theme={themeDarkModeA}>
      <CssBaseline />
      <Router>
        <div className="App">
          <header>
            <TopAppBar />
          </header>
          <main style={{ padding: 8, flexGrow: 1 }}>
            <Route path="/" exact>
              Welcome to Chatimus
            </Route>
            <Route path="/hub" exact>
              {
                // @ts-ignore
                //this.state.dbLoaded.toString()
              }
              <HomePage />
            </Route>
            <Route path="/servers" exact></Route>
          </main>
          <footer>
            <BottomNavBar />
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
