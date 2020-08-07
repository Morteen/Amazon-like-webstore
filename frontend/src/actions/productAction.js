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
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_RESET,
} from "../constants/productConstants";

//Når det er gjort på denne måten får man med både tidn det tar å laste og suksess med lasting av prod eller feil !

const listProducts = (
  category = "",
  searchKeyword = "",
  sortOrder = ""
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUST });
    const { data } = await axios.get(
      "http://localhost:64105/api/Products?category=" +
        category +
        "&searchKeyword=" +
        searchKeyword +
        "&sortOrder=" +
        sortOrder
    );
    setTimeout(() => {
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    }, 3000);
    //dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
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

const saveProducktReview = (review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userinfo },
    } = getState();
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, pyload: review });
    const { data } = await axios.post(
      "http://localhost:64105/api/Review",
      review
    ); /*,
{
  headers: {
    //Authorization: ' Bearer ' + userInfo.token
    Accept: "application/json",
  },
}*/
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, pyload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, pyload: error.message });
  }
};

export {
  listProducts,
  detailsProduct,
  saveProduct,
  deleteProduct,
  saveProducktReview,
};
