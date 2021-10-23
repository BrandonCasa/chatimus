import React from "react";
import HomePage from "./pages/home/HomePage";
import TopAppBar from "./features/topappbar/TopAppBar";
import BottomNavBar from "./features/bottomnavbar/BottomNavBar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { setCurrentAccount } from "./app/accounts/accountsSlice";

function App() {
  const themeA = {
    components: {
      compList: {
        "::-webkit-scrollbar": {
          height: 13,
          width: 13,
        },
        "::-webkit-scrollbar-thumb": {
          background: "#b3afb3",
          borderRadius: 9,
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#b3afb3",
        },
        "::-webkit-scrollbar-track": {
          background: "#373737",
          borderRadius: 9,
          boxShadow: "inset 0px 0px 0px 0px #f0f0f0",
        },
      },
    },
  };
  const [theTheme, setTheTheme] = React.useState(themeA);

  return (
    <div className="App">
      <header>
        <TopAppBar />
      </header>
      <main style={{ padding: 8, flexGrow: 1 }}>
        <Route path="/" exact>
          <HomePage theTheme={theTheme} />
        </Route>
        <Route path="/skillchat" exact>
          Chatimus
        </Route>
      </main>
      <footer>
        <BottomNavBar />
      </footer>
    </div>
  );
}

export default App;
