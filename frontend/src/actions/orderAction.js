import {
  ORDER_CREATE_REQUST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../constants/orderConstantes";
import Axios from "axios";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUST /*payload: order*/ });
    const {
      userSignin: { userInfo },
    } = getState();

    //console.log("Log av ordre i createOrder: " + JSON.stringify(order));
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
export { createOrder };
