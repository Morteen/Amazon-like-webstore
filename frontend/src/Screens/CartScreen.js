import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  // search ? er en If som sjekker søke url og finner antall som står til høyre for =, hvis dette ikke finnes brukes 1

  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    console.log("Log av productId " + productId);
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Handlevogn</h3>
            <div>Pris</div>
          </li>

          {cartItems.length === 0 ? (
            <div>Vognen er tom</div>
          ) : (
            cartItems.map((item) => (
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="Produkt" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>

                  <div>
                    Antall
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    {console.log(
                      "Log av items.product fra cartScreen " + item.product
                    )}
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                      className="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">{item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} varer) : Sum:{" "}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} kr
        </h3>
        <button className="button primary" disabled={cartItems.length === 0}>
          Forttsett til Betaling
        </button>
      </div>
    </div>
  );
}
export default CartScreen;
