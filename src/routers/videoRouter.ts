import express, { Router } from "express";
import {
  getEdit,
  watch,
  upload,
  deleteVideo,
  postEdit,
} from "../controllers/videoController";

const videoRouter: Router = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.route<string>("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
