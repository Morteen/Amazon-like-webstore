import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderAction";

function PlaceorderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { id, name } = userInfo;
  if (!shipping.adress) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const ShippingPrice = itemsPrice > 1000 ? 0 : 150;
  const taxPrice = itemsPrice * 0.25;
  const totalPrice = itemsPrice + ShippingPrice;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._Id);
    }
  }, [success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        userInfo,
        orderItems: cartItems,
        shipping,
        itemsPrice,
        ShippingPrice,
        taxPrice,
        totalPrice,
        // paymentMethod: payment.paymentMethod,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Leverings info</h3>
            <ul id="placeorder-info-list">
              Navn {userInfo.name}
              <li>Adresse: {cart.shipping.adress}</li>
              <li>
                {cart.shipping.postalCode} {cart.shipping.city}{" "}
              </li>
              <li>Email {userInfo.email}</li>
            </ul>
          </div>
          <div>
            <h3>Betaling</h3>
            Betalings metode: {cart.payment.paymentMethod}
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Handlevogn</h3>
                <div>Pris pr stykk</div>
              </li>

              {cartItems.length === 0 ? (
                <div>Vognen er tom</div>
              ) : (
                cartItems.map((item, index) => (
                  <li key={index}>
                    <div className="cart-image">
                      <img src={item.image} alt="Produkt" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>{item.name}</Link>
                      </div>

                      <div>Antall: {item.qty}</div>
                    </div>
                    <div className="cart-price">{item.price} </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={placeOrderHandler}
              >
                Send ordre
              </button>
            </li>
            <li>
              <h3>Ordre summering</h3>
            </li>
            <li>
              <div>Varer</div>
              <div>{itemsPrice}</div>
            </li>
            <li>
              <div>Moms</div>
              <div>{taxPrice}</div>
            </li>
            <li>
              <div>Shipping</div>

              <div>{ShippingPrice}</div>
            </li>
            <li>
              <div>Totaltsum</div>

              <div>{totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default PlaceorderScreen;
