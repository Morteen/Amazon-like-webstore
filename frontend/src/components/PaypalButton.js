import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { createOrder } from "../actions/orderAction";
function PaypalButton(props) {
  const [SdkReady, setSdkReady] = useState(false);

  const addPaypalSdk = async () => {
    const result = await Axios.get("http://localhost:64105/api/PaymentConfig");

    const clientID = result.data.clientID;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.paypal.com/sdk/js?client-id=" + clientID;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  const createOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: { currency_code: "USD", value: props.amount },
        },
      ],
    });

  const onApprove = (data, actions) =>
    actions.order
      .capture()
      .then((details) => props.onSuccess(data, details))
      .catch((err) =>
        console.log("Logg av error i onApprove PaypalButton " + err)
      );

  useEffect(() => {
    if (!window.paypal) {
      addPaypalSdk();
    }
    return () => {};
  }, []);
  if (!SdkReady) {
    return <div>Loading....</div>;
  }
  const Button = window.paypal.Buttons.driver("react", { React, ReactDOM });
  return (
    <Button
      {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}
export default PaypalButton;
