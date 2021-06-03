import { Request, Response } from "express";

export const popular = (req: Request, res: Response) => {
  return res.send("Popular");
};

export const see = (req: Request, res: Response) => {
  return res.send("Video see");
};

export const edit = (req: Request, res: Response) => {
  return res.send("Video Edit");
};

export const search = (req: Request, res: Response) => {
  return res.send("login");
};

export const upload = (req: Request, res: Response) => {
  return res.send("upload");
};

export const deleteVideo = (req: Request, res: Response) => {
  return res.send("delete video");
};
