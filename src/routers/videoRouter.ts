import express from "express";

const videoRouter = express.Router();

videoRouter.get("/watch", (req, res) => {
  return res.send("Video Watch");
});

export default videoRouter;
