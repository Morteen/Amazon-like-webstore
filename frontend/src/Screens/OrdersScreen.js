import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listOrders, deleteOrder } from "../actions/orderAction";

function OrdersScreen(props) {
  const [modalVisable, setmodalVisable] = useState(false);
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());

    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="content content-margined">
      <div className="order-header">
        <h3>Orders</h3>
      </div>

      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>OrdreId</th>
              <th>Dato</th>
              <th>Total pris</th>
              <th>kunde </th>
              <th>Betalt</th>
              <th>Betalt dato</th>
              <th>Levert</th>
              <th>Levert dato</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._Id}>
                <td>{order._Id}</td>
                <td>{order.CreatedAt}</td>
                <td>{order.TotalPrice}</td>
                <td>{order.UserInfo.name}</td>
                <td> {order.IsPaid ? "Ja" : "Nei"}</td>
                <td>{order.PaidAt}</td>
                <td>{order.IsDeliverd ? "Ja" : "Nei"}</td>
                <td>{order.DeliveredAt}</td>
                <td>
                  <Link to={"/order/" + order._Id} className="button secondary">
                    Detaljer
                  </Link>
                  {"  "}
                  <button
                    className="button secondary delete"
                    onClick={() => deleteHandler(order._Id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default OrdersScreen;
