import axios from "axios";

import {
  PRODUCT_LIST_REQUST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_FAIL,
} from "../constants/productConstants";

//Når det er gjort på denne måten får man med både tidn det tar å laste og suksess med lasting av prod eller feil !
const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUST });
    const { data } = await axios.get("http://localhost:51031/api/Products/");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  console.log("Log fra saveProduct " + JSON.stringify(product));
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });

    const {
      userSignin: { userInfo },
    } = getState();

    if (product._id) {
      const { data } = await axios.put(
        "http://localhost:51031/api/Products?name=" +
          product.name +
          "&category=" +
          product.category +
          "&image=" +
          product.image +
          "&price=" +
          product.price +
          "&brand=" +
          product.brand +
          "&countInStock=" +
          product.countInStock +
          "description=" +
          product.description,
        {
          header: {
            "Content-Type": "text/plain",
            "Access-Control": "  Allow-Origin",
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.post(
        "http://localhost:51031/api/Products?name=" +
          product.name +
          "&category=" +
          product.category +
          "&image=" +
          product.image +
          "&price=" +
          product.price +
          "&brand=" +
          product.brand +
          "&countInStock=" +
          product.countInStock +
          "description=" +
          product.description,
        {
          header: {
            "Content-Type": "text/plain",
            "Access-Control": "  Allow-Origin",
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_SAVE_FAIL,
      payload: error.message,
    });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  console.log("Log av productid i product action " + productId);
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(
      "http://localhost:51031/api/Products/" + productId
    );

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
  }
};

export { listProducts, detailsProduct, saveProduct };
