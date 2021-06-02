import express from "express";
import { join } from "../controllers/userController";
import { popular } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", popular);
globalRouter.get("/join", join);

export default globalRouter;
