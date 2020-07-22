import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderAction";

function OrderScreen(props) {


  useEffect(() => {
    detailsOrder(props.match.params.id)
    return () => {
      cleanup
    }
  }, [])

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return ( <div>
  {loading?<div>Loading...</div>:error?<div>{error}</div>
   
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
              <li>
                {order.IsDeliverd
                  ? "Levert den: " + order.DeliveredAt
                  : "Ikke levert"}
              </li>
            </ul>
          </div>
          <div>
            <h3>Betaling</h3>
            Betalings metode: {cart.payment.paymentMethod}
            <div>
              {order.isPayed ? "Betalt den: " + order.payedAt : "Ikke betalt"}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Handlevogn</h3>
                <div>Pris pr stykk</div>
              </li>

              {order.orderItems.length === 0 ? (
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

              <div>{shippingPrice}</div>
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
export default OrderScreen;
