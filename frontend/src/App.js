import React from "react";
import "./App.css";

import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";

const openMenu = () => {
  document.querySelector(".sidebar").classList.add("open");
};
const closeMenu = () => {
  document.querySelector(".sidebar").classList.remove("open");
};

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>

            <Link to="/">Amazona</Link>
          </div>
          <div className="header-links">
            <a href="signin.html">Sign In</a>
            <a href="cart.html"> Cart</a>
          </div>
        </header>
        <aside className="sidebar">
          <h3>kategorier</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html"> Skjorter</a>
            </li>
            <li>
              <a href="index.html"> Bukser</a>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">
          <p>utvikler Morten</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
