import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import "./App.scss";
import { getExistingAccountAsync } from "./app/accounts/accountsSlice";
import { refreshServerIp } from "./app/appstate/appSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import BottomNavBar from "./features/bottomnavbar/BottomNavBar";
import TopAppBar from "./features/topappbar/TopAppBar";
import HomePage from "./pages/home/HomePage";
import themeDarkModeA from "./themes/DarkModeA";

function App() {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts.data.accounts);
  const cookies = new Cookies();

  React.useEffect(() => {
    dispatch(refreshServerIp("44.194.181.255"));
    let savedAccounts = cookies.get("savedAccounts");
    console.log(savedAccounts);
    if (savedAccounts !== undefined) {
      savedAccounts.accounts.forEach((acc: any) => {
        const data = {
          method: "uuid",
          accType: "anonymous",
          uuid: acc.uuid,
          numAccounts: accounts.length,
        };
        dispatch(getExistingAccountAsync(data));
      });
    }
    // IMPLEMENT MULTIPLE STORED COOKIES FOR ALL ANONYMOUS ACCOUNTS
    /*
    if (cookies.get("anonymousAccountExists")) {
      // Proceed to add the account to the list as it already exists
      const data = {
        method: "uuid",
        uuid: cookies.get("anonymousUUID"),
        numAccounts: accounts.length,
      };
      dispatch(getExistingAccountAsync(data));
    }
    */
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
