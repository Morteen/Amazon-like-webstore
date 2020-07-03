import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HomeScreen(props) {
  const [products, setproduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "/api/products" //Henter data fra serveren
      );
      console.log(data);
      setproduct(data);
    };
    fetchData();
    return () => {
      "";
    };
  }, []);

  return (
    <ul className="products">
      {products.map((product, index) => (
        <li className="product" key={index}>
          <Link to={"/product/" + product._id}>
            <img src={product.image} alt="Product" className="product-image" />
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
  );
}
export default HomeScreen;
