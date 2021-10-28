import React from "react";
import HomePage from "./pages/home/HomePage";
import TopAppBar from "./features/topappbar/TopAppBar";
import BottomNavBar from "./features/bottomnavbar/BottomNavBar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { setCurrentAccount } from "./app/accounts/accountsSlice";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { Provider, useSelector } from "react-redux";
import themeDarkModeA from "./themes/DarkModeA";

function App() {
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
            <Route path="/skillchat" exact>
              Chatimus
            </Route>
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
