import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProducktReview } from "../actions/productAction";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [imageName, setImageName] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const { product, loading, error } = productDetails;

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const productSaveReview = useSelector((state) => state.productSaveReview);
  const { success: productSaveSuccess } = productSaveReview;
  let image = null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Din vurdering er lagt til");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProducktReview({
        productId: props.match.params.id,
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const test = () => {
    image = product.image;

    return image;
  };
  const changePicHandler = () => {
    if (image) {
      image = image.substring(0, 10) + "2.jpg";
    }

    console.log(image);
  };

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
        <div>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="Product" />
            </div>

            <div className="details-info">
              <ul>
                <li>
                  <h4> {product.name}</h4>
                </li>
                <li>
                  <a href="#reviwes">
                    <Rating
                      value={product.rating}
                      text={product.numRew + " anmeldere"}
                    />
                  </a>
                </li>

                <li>
                  Pris:<b> {product.price}</b>kr
                </li>
                <li></li>
                <li>
                  Beskrivelse
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>

            <div className="details-action">
              <ul>
                <li>Pris:{product.price}</li>
                <li>
                  Status:{" "}
                  {product.countInStock > 0 ? " På lager" : "Ikke på lager"}{" "}
                </li>
                <li>
                  Antall:
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <button
                      className="button primary"
                      onClick={handleAddToCart}
                    >
                      Legg til i vognen
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className="content-margined">
            <h2>Kunde vurderinger</h2>
            {!product.reviews.length && (
              <div>Ingen kunder har vurdert dette produktet</div>
            )}
            <ul className="review" id="reviews">
              {product.reviews.map((review, index) => (
                <li key={index}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>

                  <div>{review.comment}</div>
                </li>
              ))}
              <li>
                <h3>Lage en produkt kommentar</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Dårlig</option>
                          <option value="2">2- Brukbar</option>
                          <option value="3">3- God</option>
                          <option value="4">4- Veldig bra</option>
                          <option value="5">5- Verdens klasse!!</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Kommentar</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Logg inn</Link> for å skrive en
                    kommentar.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductScreen;
