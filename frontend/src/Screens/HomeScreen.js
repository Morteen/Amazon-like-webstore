import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productAction";
import Rating from "../components/Rating";
import Loader from "../components/Loader";

function HomeScreen(props) {
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));
    return () => {
      "";
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const translateCategory = (category) => {
    if (category === "shirt") {
      return "Skjorter";
    } else if (category === "pants") {
      return "Bukser";
    }
  };

  return (
    <div>
      {category && (
        <h2 className="categories">{translateCategory(category)}</h2>
      )}
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          {" "}
          Sorteret etter{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Nyest</option>
            <option value="lowest">lavest</option>
            <option value="highest">Høyest</option>
          </select>
        </li>
      </ul>

      {loading ? ( //Loading må være med her siden det er asynk og man få undefined feil på map funksjonen
        <Loader />
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <ul className="products">
          {products.map((product, index) => (
            <li className="product" key={index}>
              <Link to={"/product/" + product._id}>
                <img
                  src={product.image}
                  alt="Product"
                  className="product-image"
                />
              </Link>

              <div className="product-name">
                <Link to={"/product/" + product._id}> {product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">{product.price} kr</div>
              <div className="product-rating">
                <Rating
                  value={product.rating}
                  text={product.numRew + " anmeldere"}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default HomeScreen;
