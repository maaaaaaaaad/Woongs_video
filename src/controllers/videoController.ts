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
  const { title, description, hashtags } = req.body;
  try {
    const videoData = new VideoModel({
      title,
      description,
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

export const watch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const selectedVideo = await VideoModel.findById(id).exec();

  if (selectedVideo === null) {
    return res.render("404", { pageTitle: "Not Found" });
  } else {
    return res.render("watch", {
      pageTitle: `${selectedVideo.title}`,
      selectedVideo,
    });
  }
};

export const getEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const selectedVideo = await VideoModel.findById(id).exec();
  if (selectedVideo === null) {
    return res.render("404", { pageTitle: "Not Found" });
  }
  return res.render("edit", {
    pageTitle: `Edit ${selectedVideo.title}`,
    selectedVideo,
  });
};

export const postEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const selectedVideo = await VideoModel.exists({ _id: id });

  if (selectedVideo === false) {
    return res.render("404", { pageTitle: "Not Found" });
  }
  await VideoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((tag: string) => (tag.startsWith("#") ? tag : `#${tag}`)),
  });

  return res.redirect(`/video/${id}`);
};
