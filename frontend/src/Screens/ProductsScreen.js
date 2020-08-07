import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts, saveProduct } from "../actions/productAction";
import { deleteProduct } from "../actions/productAction";
import Axios from "axios";
import Loader from "../components/Loader";

function ProductsScreen(props) {
  const [modalVisable, setmodalVisable] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const { loadingSave, success, sucessSave, errorSave } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const { loadingDelete, sucessDelete, errorDelete } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { isAdmin } = userInfo;
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (sucessSave) {
      setmodalVisable(false);
    }
    dispatch(listProducts());

    return () => {
      //
    };
  }, [sucessSave, sucessDelete]);
  const openModal = (product) => {
    setmodalVisable(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setBrand(product.brand);
    setImage(product.image);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];

    const bodyFormData = new FormData();

    bodyFormData.append("image", file);
    for (var [key, value] of bodyFormData.entries()) {
      console.log(key, value);
    }
    setUploading(true);
    Axios.post("http://localhost:64105/api/Image", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log("Server response på formData:" + response.data);
        setImage(response.data);
        setUploading(false);
      })
      .catch((error) => {
        console.log("Log av error i fileupload:" + error);
        setUploading(false);
      });
  };

  return isAdmin ? (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Varer</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Legg til en ny vare
        </button>
      </div>
      {modalVisable && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>{id ? "Endre produktet" : "Legg inn et nytt produkt"}</h2>
              </li>
              <li>
                {loadingSave && <Loader />}
                {errorSave && <div className="error">{error}</div>}
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
                <label htmlFor="price">Pris</label>
                <input
                  value={price}
                  type="number"
                  name="price"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Bildenavn</label>
                <input
                  value={image}
                  type="text"
                  name="image"
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>

                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Laster opp bilde !</div>}
              </li>

              <li>
                <label htmlFor="brand">Merke</label>
                <input
                  value={brand}
                  type="text"
                  name="brand"
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="category">Kategori</label>
                <input
                  value={category}
                  type="text"
                  name="category"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="countInStock">Antall på lager</label>
                <input
                  value={countInStock}
                  type="number"
                  name="countInStock"
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="description">Beskrivelse av produktet</label>
                <textarea
                  value={description}
                  name="description"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>

              <li>
                <button type="submit" className="button primary">
                  {id ? "Endre" : "Legg inn"}
                </button>
                <button
                  className="button seconary"
                  onClick={() => setmodalVisable(false)}
                >
                  Tilbake
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Navn</th>
              <th>Pris</th>
              <th> Kategori </th>
              <th>Merke</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>

                <td> {product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Endre
                  </button>{" "}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
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
  ) : (
    <div>Dette er en admin side gå tilbake</div>
  );
}
export default ProductsScreen;
