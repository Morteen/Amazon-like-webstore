import {
  ORDER_CREATE_REQUST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../constants/orderConstantes";

function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_CREATE_REQUST:
      return { loading: true };

    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export { orderCreateReducer };
