import {
  getChangePassword,
  postChangePassword,
} from "./../controllers/userController";
import express from "express";
import {
  getEdit,
  postEdit,
  remove,
  logout,
  myProfile,
  startGithubLogin,
  callbackGithubLogin,
} from "../controllers/userController";
import {
  avatarUpload,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);

userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get(
  "/github/callbackUrl",
  publicOnlyMiddleware,
  callbackGithubLogin
);

userRouter.get("/:id", myProfile);
userRouter.get("/delete", remove);
export default userRouter;
