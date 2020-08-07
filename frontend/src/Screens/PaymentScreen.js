import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [inputError, setInputError] = useState();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod === "") {
      setInputError("Du må velge en betalingsmetode");
    } else {
      dispatch(savePayment({ paymentMethod }));
      props.history.push("placeorder");
    }
  };

  return (
    <div>
      {" "}
      <CheckoutSteps step1 step2 step3 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Betaling</h2>
            </li>
            <li>{inputError && <div className="alert">{inputError}</div>}</li>
            <li>
              <input
                type="radio"
                name="paymentMethod"
                id="paymentMethod"
                value="Paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="paymentMethod">PayPal</label>
            </li>
            <li>
              <input
                type="radio"
                name="paymentMethod"
                id="paymentMethod"
                value="Vipps"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="paymentMethod">Vipps</label>
            </li>
            <li>
              <input
                type="radio"
                name="paymentMethod"
                id="paymentMethod"
                value="postoppkrav"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="paymentMethod">Postoppkrav</label>
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
export default PaymentScreen;
