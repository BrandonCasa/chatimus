import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import HomePage from "./pages/home/HomePage";
import TopAppBar from "./features/topappbar/TopAppBar";
import BottomNavBar from "./features/bottomnavbar/BottomNavBar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TopAppBar />
      </header>
      <main className="App-main">
        <Route path="/" exact>
          Home
        </Route>
        <Route path="/skillchat" exact>
          Skillchat
        </Route>
      </main>
      <footer className="App-footer">
        <BottomNavBar />
      </footer>
    </div>
  );
}

export default App;
