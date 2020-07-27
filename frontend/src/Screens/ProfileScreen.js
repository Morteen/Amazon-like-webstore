import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, update } from "../actions/userAction";

function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatchEvent(logout());
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ name, email, password }));
  };

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Registrer deg her</h2>
              </li>
              <li>
                {loading && <div>Laster...</div>}
                {error && <div>{error}</div>}
              </li>
              <li>
                <label htmlFor="name">Navn</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="password">Passord</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="rePassword">Gjenta passord</label>
                <input
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  onChange={(e) => setRePassword(e.target.value)}
                ></input>
              </li>

              <li>
                <button type="submit" className="button primary">
                  Oppdater
                </button>
              </li>

              <li>
                <button
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
      <div className="profile-orders"></div>
    </div>
  );
}
export default ProfileScreen;
