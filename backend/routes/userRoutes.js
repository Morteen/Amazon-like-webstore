import express from "express";
import User from "../models/userModels";
const router = express.Router();

/*router.get("/api/users/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Morten",
      email: "mortenolsen4@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(user);
  } catch (error) {
    console.log({ msg: error.message });
    res.send({ msg: error.message });
  }
});
export default router;*/
router.get("/api/users/createadmin", async (req, res) => {
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
