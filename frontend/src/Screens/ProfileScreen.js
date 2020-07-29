import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, update } from "../actions/userAction";
import { listMyOrders } from "../actions/orderAction";

function ProfileScreen(props) {
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success: successUpdate, error } = userUpdate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { UserId } = userInfo;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  };
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(update(UserId, name, email, password));
  };
  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {};
  }, [successUpdate]);

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Endre kunde opplysninger her</h2>
              </li>
              <li>
                {loading && <div>Laster...</div>}
                {error && <div>{error}</div>}
                {successUpdate && (
                  <div>Oppdateringen av profilen er lagret</div>
                )}
              </li>
              <li>
                <label htmlFor="name">Navn</label>
                <input
                  value={name}
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="password">Passord</label>
                <input
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </li>

              <li>
                <button type="submit" className="button primary">
                  Oppdater
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="button secondary full-width"
                  onClick={handleLogout}
                >
                  {" "}
                  Logg ut
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="profile-orders content-margined">
        {loadingOrders ? (
          <div>Loading....</div>
        ) : errorOrders ? (
          <div>{errorOrders}</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Dato</th>
                <th>Total pris</th>
                <th>Betalt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._Id}>
                  <td>{order._Id}</td>
                  <td>Tenger en verdi her</td>
                  <td>{order.TotalPrice}</td>
                  <td>{order.IsPaid ? "Ja" : "Nei"}</td>
                  <td>
                    <Link to={"/order/" + order._Id}>Ordre detaljer</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default ProfileScreen;