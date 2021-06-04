import express from "express";
import { edit, remove, logout, watch } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/:id", watch);

export default userRouter;
