import express from "express";

const userRouter = express.Router();

userRouter.get("/edit", (req, res) => {
  return res.send("Edit Profile");
});

export default userRouter;
