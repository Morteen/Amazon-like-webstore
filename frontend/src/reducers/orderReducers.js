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

function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_CREATE_REQUST:
      return { loading: true };

    case ORDER_CREATE_SUCCESS:
      console.log(
        "Dette er hva som kommer til orderredcer" +
          JSON.stringify(action.payload)
      );
      return { loading: false, order: action.payload, success: true };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

function orderDetailsReducer(
  state = {
    order: {
      orderItems: [],
      Shipping: {},
      payment: {},
    },
  },
  action
) {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };

    case ORDER_DETAILS_SUCCESS:
      console.log(
        "Dette er hva som kommer til orderredcer" +
          JSON.stringify(action.payload)
      );
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

function orderPayReducer(
  state = {
    order: {
      orderItems: [],
      Shipping: {},
      payment: {},
    },
  },
  action
) {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };

    case ORDER_PAY_SUCCESS:
      console.log(
        "Dette er hva som kommer til orderPayredcer" +
          JSON.stringify(action.payload)
      );
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export { orderCreateReducer, orderDetailsReducer, orderPayReducer };
