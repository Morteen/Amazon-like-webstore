import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen(props) {
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShipping({ adress, city, postalCode }));
    props.history.push("payment");
  };

  return (
    <div>
      {" "}
      <CheckoutSteps step1 step2 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>

            <li>
              <label htmlFor="adress">Adresse</label>
              <input
                type="Text"
                name="adress"
                id="adress"
                onChange={(e) => setAdress(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="city">By</label>
              <input
                type="Text"
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="postalCode">Postnummer</label>
              <input
                type="Text"
                name="postalCode"
                id="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
              ></input>
            </li>

            <li>
              <button type="submit" className="button primary">
                Gå videre
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default ShippingScreen;
