import React from "react";

import "./App.css";
const openMenu = () => {
  document.querySelector(".sidebar").classList.add("open");
};
const closeMenu = () => {
  document.querySelector(".sidebar").classList.remove("open");
};

function App() {
  return (
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>&#9776;</button>
          <a href="index.html">Amazona</a>
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
          <ul className="products">
            <li className="product">
              <img
                src="./images/d1.jpg"
                alt="Product"
                className="product-image"
              />
              <div className="product-name">
                <a href="#"> Test navn</a>
              </div>
              <div className="product-brand">Nice</div>
              <div className="product-price">60</div>
              <div className="product-rating">
                4.5 stjerner (110 anmeldelser)
              </div>
            </li>
            <li className="product">
              <img
                src="./images/d1.jpg"
                alt="Product"
                className="product-image"
              />
              <div className="product-name">
                <a href="#"> Test navn</a>
              </div>
              <div className="product-brand">Nice</div>
              <div className="product-price">60</div>
              <div className="product-rating">
                4.5 stjerner (110 anmeldelser)
              </div>
            </li>
            <li className="product">
              <img
                src="./images/d1.jpg"
                alt="Product"
                className="product-image"
              />
              <div className="product-name">
                <a href="#"> Test navn</a>
              </div>
              <div className="product-brand">Nice</div>
              <div className="product-price">60</div>
              <div className="product-rating">
                4.5 stjerner (110 anmeldelser)
              </div>
            </li>
          </ul>
        </div>
      </main>
      <footer className="footer">
        <p>utvikler Morten</p>
      </footer>
    </div>
  );
}

export default App;

/* <script>
      function closeMenu() {
        document.getElementById("mySidebar").style.display = "none";
      }
      function openMenu() {
        document.getElementById("mySidebar").style.display = "block";
      }
    </script>*/
