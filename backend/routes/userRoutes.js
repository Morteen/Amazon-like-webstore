import express from "express";
import User from "../models/userModels";
import { getToken } from "../util";

const router = express.Router();

router.post("signin", async (req, res) => {
  const signInUser = await User.findOne({
    email: req.body.email,
    password: reqbody.password,
  });
  if (signInUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(404).send({ msg: "Feil med brukernavn eller passord" });
  }
});

router.post("register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();

  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(404).send({ msg: "Ugyldig bruker opplysninger" });
  }
});

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Morten",
      email: "mortenolsen4@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;
