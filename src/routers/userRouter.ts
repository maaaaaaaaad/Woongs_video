import express from "express";
import {
  edit,
  remove,
  logout,
  watch,
  startGithubLogin,
  callbackGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/:id", watch);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/callbackUrl", callbackGithubLogin);

export default userRouter;
