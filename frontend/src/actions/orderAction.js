import {
  ORDER_CREATE_REQUST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from "../constants/orderConstantes";
import Axios from "axios";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUST /*payload: order*/ });
    const {
      userSignin: { userInfo },
    } = getState();

    console.log("Log av ordre i createOrder: " + JSON.stringify(order));
    const { data } = await Axios.post(
      "http://localhost:64105/api/DtoOrder",
      order /*,
      {
        headers: {
          //Authorization: ' Bearer ' + userInfo.token
          Accept: "application/json",
        },
      }*/
    );

    console.log("Log av retur data " + JSON.stringify(data));
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(JSON.stringify("Log av error " + error));
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { data } = await Axios.get(
      "http://localhost:64105/api/DtoOrder/" + orderId
    ); /** {
    headers: {
      Authorization: ' Bearer ' + userInfo.token
     
    },
  } */

    console.log("Log av returdata i orderDetails" + JSON.stringify(data));
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(JSON.stringify("Log av error i orderDetails " + error));
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const { data } = await Axios.put(
      "http://localhost:64105/api/DtoOrder/" + order._Id + "/pay",
      paymentResult
    ); /** {
    headers: {
      Authorization: ' Bearer ' + userInfo.token
     
    },
  } */

    console.log("Log av returdata i orderDetails" + JSON.stringify(data));
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    console.log(JSON.stringify("Log av error i orderDetails " + error));
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
};

export { createOrder, detailsOrder, payOrder };
