import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productAction";

function ProductScreen(props) {
  console.log(
    "UseSelector log: " + useSelector((state) => JSON.stringify(state))
  );
  console.log(
    "UseSelector log: " + useSelector((state) => state.productDetails)
  );

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(1));
    return () => {
      //
    };
  }, []);

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Tilbake</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt="Product" />
            {console.log(product.image)}
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4> {product.name}</h4>
              </li>
              <li>
                {product.rating} Stjerner ({product.numRew} anmeldelser)
              </li>

              <li>
                Pris:<b> {product.price}</b>kr
              </li>
              <li>
                Beskrivelse
                <div>{product.description}</div>
              </li>
            </ul>
          </div>

          <div className="details-action">
            <ul>
              <li>Pris:{product.price}</li>
              <li>Status:{product.status}</li>
              <li>
                Antall:
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>7</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </li>
              <li>
                {" "}
                <button className="button primary"> Legg til i vognen </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductScreen;
