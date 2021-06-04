import express from "express";
import {
  getEdit,
  watch,
  upload,
  deleteVideo,
  postEdit,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", getEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

videoRouter.post("/:id(\\d+)/edit", postEdit);

export default videoRouter;
