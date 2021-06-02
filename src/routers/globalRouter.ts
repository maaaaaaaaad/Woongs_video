import express from "express";

const globalRouter = express.Router();

globalRouter.get("/", (req, res) => {
  return res.send("Home");
});

export default globalRouter;
