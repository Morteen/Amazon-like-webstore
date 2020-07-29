import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productAction";

function HomeScreen(props) {
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {
      "";
    };
  }, []);

  return (
    <div className="content">
      {category && <h2>{category}</h2>}
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </form>
        </li>
      </ul>
      {} loading ? ( //Loading må være med her siden det er asynk og man får
      undifined feil på map funksjonen
      <div>Loading....</div>) : error ? (<div>{error}</div>) : (
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
              {product.rating} Stjerner fra {product.numRew}
            </div>
          </li>
        ))}
      </ul>
      )
    </div>
  );
}
export default HomeScreen;
