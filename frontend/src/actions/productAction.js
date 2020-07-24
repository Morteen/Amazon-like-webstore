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
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";

//Når det er gjort på denne måten får man med både tidn det tar å laste og suksess med lasting av prod eller feil !
const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUST });
    const { data } = await axios.get("http://localhost:64105/api/Products/");
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
        "http://localhost:64105/api/Products/" + product._id,
        product
      );
      console.log("Log fra response på saveProduct " + JSON.stringify(data));
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      console.log("Vi kommer hit før det blir server error");
      const { data } = await axios.post(
        "http://localhost:64105/api/Products",
        product,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
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
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(
      "http://localhost:64105/api/Products/" + productId
    );
    console.log("Log fra action" + JSON.stringify(data));
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
  }
};

const deleteProduct = (productId) => async (dispatch) => {
  console.log("Log av productid i product action " + productId);
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete(
      "http://localhost:64105/api/Products/" + productId
    );

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export { listProducts, detailsProduct, saveProduct, deleteProduct };
