import express, { Router } from "express";
import {
  getEdit,
  watch,
  getUpload,
  postUpload,
  postEdit,
} from "../controllers/videoController";

const videoRouter: Router = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route<string>("/upload").get(getUpload).post(postUpload);
videoRouter
  .route<string>("/:id([0-9a-f]{24})/edit")
  .get(getEdit)
  .post(postEdit);

export default videoRouter;
