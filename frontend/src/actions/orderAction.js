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
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
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

const listMyOrders = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { UserId } = userInfo;

    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { data } = await Axios.get(
      "http://localhost:64105/api/Orders/" + UserId
    ); /** {
    headers: {
      Authorization: ' Bearer ' + userInfo.token
     
    },
  } */

    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(JSON.stringify("Log av error i orderDetails " + error));
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
};

const listOrders = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { UserId } = userInfo;

    dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await Axios.get(
      "http://localhost:64105/api/Orders"
    ); /** {
    headers: {
      Authorization: ' Bearer ' + userInfo.token
     
    },
  } */

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(JSON.stringify("Log av error i ORDER_LIST_FAIL " + error));
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
};

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    console.log("Log av orderid i deleteAction:" + orderId);
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { data } = await Axios.delete(
      "http://localhost:64105/api/DtoOrder/" + orderId
    ); /** {
    headers: {
      Authorization: ' Bearer ' + userInfo.token
     
    },
  } */

    console.log(
      "Log av returdata i ORDER_DELETE_REQUEST" + JSON.stringify(data)
    );
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    console.log(JSON.stringify("Log av error i ORDER_DELETE_FAIL" + error));
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
};

export {
  createOrder,
  detailsOrder,
  payOrder,
  listMyOrders,
  listOrders,
  deleteOrder,
};
