import React, { useEffect, useState } from "react";
import ReactDom from "ReactDom";
import Axios from "axios";
function paypalButton(props) {
  const [SdkReady, setSdkReady] = useState(false);

  const addPaypalSdk = async () => {
    const result = await Axios.get("api/config/paypal");
    const clientID = result.data;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.paypal.com/sdk/js?client-id=" + clientID;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalSdk();
    }
    return () => {};
  }, []);
  if (!SdkReady) {
    return <div>Loading....</div>;
  }
  const Button = window.paypal.buttons.driver("driver", { react, ReactDom });
}
export default paypalButton;
