import { Request, Response } from "express";

export const popular = (req: Request, res: Response) =>
  res.render("home", { pageTitle: "Home" });

export const search = (req: Request, res: Response) => {
  return res.send("login");
};

export const upload = (req: Request, res: Response) => {
  return res.send("upload");
};

export const see = (req: Request, res: Response) => {
  console.log(req.params);
  return res.send(`Video watch ${req.params.id}`);
};

export const edit = (req: Request, res: Response) => {
  console.log(req.params);
  return res.send("Video Edit");
};

export const deleteVideo = (req: Request, res: Response) => {
  console.log(req.params);
  return res.send("delete video");
};
