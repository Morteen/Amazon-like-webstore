import {
  ORDER_CREATE_REQUST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../constants/orderConstantes";
import Axios from "axios";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUST, payload: order });
    const {
      userSignin: { userInfo },
    } = getState();

    console.log("Log av ordre i createOrder: " + JSON.stringify(order));
    const {
      data: { data: newOrder },
    } = await Axios.post("http://localhost:51031/api/Order", order, {
      headers: {
        //Authorization: ' Bearer ' + userInfo.token
      },
    });
    console.log(JSON.stringify(newOrder));
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};
export { createOrder };
