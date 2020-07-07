import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userAction";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
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
              Registrer deg
            </button>
          </li>

          <li>
            <button className="button primary">
              <Link to="/signin">Har du allerede en konto</Link>
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default RegisterScreen;
