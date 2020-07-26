import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderAction";

function OrderScreen(props) {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { name, email } = userInfo;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(props.match.params.id));
    return () => {};
  }, []);

  const payNowHandler = () => {};

  return loading ? (
    <div>Loading.....</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Leverings info</h3>
            <ul id="placeorder-info-list">
              Navn {userInfo.name}
              <li>Adresse: {order.shipping.adress}</li>
              <li>
                {order.shipping.postalCode} {order.shipping.city}{" "}
              </li>
              <li>Email {userInfo.email}</li>
              <li>
                {order.isDeliverd
                  ? "Levert den" + order.deliveredAt
                  : "Ikke levert"}
              </li>
            </ul>
          </div>
          <div>
            <h3>Betaling</h3>
            Betalings metode: {order.payment.paymentMethod}
            <div>
              {order.isPaid ? "Betalt den" + order.paidAt : "Ikke betalt"}
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
                order.orderItems.map((item, index) => (
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
                onClick={payNowHandler}
              >
                Betal nå
              </button>
            </li>
            <li>
              <h3>Ordre summering</h3>
            </li>
            <li>
              <div>Varer</div>
              <div>{order.itemsPrice}</div>
            </li>
            <li>
              <div>Moms</div>
              <div>{order.taxPrice}</div>
            </li>
            <li>
              <div>Shipping</div>

              <div>{order.shippingPrice}</div>
            </li>
            <li>
              <div>Totaltsum</div>

              <div>{order.totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default OrderScreen;
