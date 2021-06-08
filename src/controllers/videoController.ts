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

export const getUpload = (req: Request, res: Response) => {
  return res.render("upload", { pageTitle: `Upload` });
};

export const postUpload = async (req: Request, res: Response) => {
  const { title, discription, hashtags } = req.body;
  try {
    const videoData = new VideoModel({
      title,
      discription,
      hashtags: hashtags.split(",").map((tag: string) => `#${tag}`),
    });
    await videoData.save();
  } catch (error) {
    return res.render("upload", {
      pageTitle: `Upload`,
      errorMessage: `Error! ${error._message}`,
    });
  }

  return res.redirect("/");
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
