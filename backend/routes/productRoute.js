import express from "express";
import product from "../models/productModel";
import ProductScreen from "../../frontend/src/Screens/ProductScreen";

const router = express.Router();
router.get("/", async (req, res) => {
  const products = await product.find({});
  res.send(products);
});

router.post("/", async (req, res) => {
  const product = new ProductScreen({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numRew: req.body.numRew,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ msg: "Et nytt product er opprettet", data: newProduct });
  }
  return res.status(500).send({
    msg: "Error når man oppretter et nytt product productRoutes/router.post()",
  });
});

export default router;
