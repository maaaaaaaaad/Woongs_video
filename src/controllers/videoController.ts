import { Request, Response } from "express";
import VideoModel from "../models/Video";

export const home = async (req: Request, res: Response) => {
  try {
    const videos = await VideoModel.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log("Error", error);
    return res.send("Error! not found data");
  }
};

export const search = (req: Request, res: Response) => {
  return res.send("login");
};

export const upload = (req: Request, res: Response) => {
  return res.send("upload");
};

export const watch = (req: Request, res: Response) => {
  const { id } = req.params;

  return res.render("watch", { pageTitle: `Watch` });
};

export const getEdit = (req: Request, res: Response) => {
  const { id } = req.params;

  return res.render("edit", { pageTitle: `Edit` });
};

export const postEdit = (req: Request, res: Response) => {
  const id: string = req.params.id;
  const title: string = req.body.title;
  return res.redirect(`/video/${id}`);
};

export const deleteVideo = (req: Request, res: Response) => {
  console.log(req.params);
  return res.send("delete video");
};
