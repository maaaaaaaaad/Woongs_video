import express, { Router } from "express";
import {
  getEdit,
  watch,
  getUpload,
  postUpload,
  deleteVideo,
  postEdit,
} from "../controllers/videoController";

const videoRouter: Router = express.Router();

videoRouter.route<string>("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id", watch);
videoRouter.route<string>("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
