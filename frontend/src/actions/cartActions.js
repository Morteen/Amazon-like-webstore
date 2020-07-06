import axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems)); //lagrerebestillingens i cookies hvis man refrecher browseren
  } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
  console.log("Log av productId i removefromCart " + productId);
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems)); //lagrerebestillingens i cookies hvis man refrecher browseren
};

export { addToCart, removeFromCart };
