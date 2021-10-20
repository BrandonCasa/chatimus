import React from "react";
import HomePage from "./pages/home/HomePage";
import TopAppBar from "./features/topappbar/TopAppBar";
import BottomNavBar from "./features/bottomnavbar/BottomNavBar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import DarkModeA from "./themes/darkModeA/DarkModeA";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { setCurrentAccount } from "./app/accounts/accountsSlice";

function App() {
  const accounts = useAppSelector((state) => state.accounts.data.accounts);
  const currAccount = useAppSelector((state) => state.accounts.data.currAccount);
  const dispatch = useAppDispatch();

  return (
    <ThemeProvider theme={DarkModeA}>
      <div className="App">
        <header className="App-header">
          <TopAppBar />
        </header>
        <main className="App-main">
          <Route path="/" exact>
            <div></div>
          </Route>
          <Route path="/skillchat" exact>
            Chatimus
          </Route>
        </main>
        <footer className="App-footer">
          <BottomNavBar />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
