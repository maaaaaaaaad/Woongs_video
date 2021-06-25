import { Request, Response } from "express";
import { hashForm } from "../models/HashForm";
import User from "../models/UserForm";
import VideoModel, { VideoForm } from "../models/VideoForm";

type PostReqElements = {
  title: string;
  description: string;
  hashtags: any;
};

export const home = async (req: Request, res: Response) => {
  try {
    const videos = await VideoModel.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log("Error", error);
    return res.send("Error! not found data");
  }
};

export const watch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const selectedVideo = await VideoModel.findById(id).exec();
  const owner = await User.findById(selectedVideo?.owner);

  if (selectedVideo === null) {
    return res.status(404).render("404", { pageTitle: "Not Found" });
  } else {
    return res.render("watch", {
      pageTitle: `${selectedVideo.title}`,
      selectedVideo,
      owner,
    });
  }
};

export const search = async (req: Request, res: Response) => {
  const { keyword } = req.query;
  let videoFind: VideoForm[] = [];
  videoFind = await VideoModel.find({
    title: {
      $regex: new RegExp(`${keyword}`, "i"),
    },
  });
  return res.render("search", { pageTitle: `Search ${keyword}`, videoFind });
};

export const getUpload = (req: Request, res: Response) => {
  return res.render("upload", { pageTitle: `Upload` });
};

export const postUpload = async (req: Request, res: Response) => {
  const {
    session: { user: _id },
  } = req;
  const fileUrl = req.file?.path;
  const { title, description, hashtags }: PostReqElements = req.body;
  try {
    const videoData = new VideoModel({
      title,
      fileUrl,
      owner: _id,
      description,
      hashtags: hashForm(hashtags),
    });
    await videoData.save();
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: `Upload`,
      errorMessage: `Error! ${error._message}`,
    });
  }

  return res.redirect("/");
};

export const getEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const selectedVideo = await VideoModel.findById(id).exec();
  if (selectedVideo === null) {
    return res.status(404).render("404", { pageTitle: "Not Found" });
  }
  return res.render("edit", {
    pageTitle: `Edit ${selectedVideo.title}`,
    selectedVideo,
  });
};

export const postEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, hashtags }: PostReqElements = req.body;
  const selectedVideo = await VideoModel.exists({ _id: id });

  if (selectedVideo === false) {
    return res.status(400).render("404", { pageTitle: "Not Found" });
  }
  await VideoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashForm(hashtags),
  });

  return res.redirect(`/video/${id}`);
};

export const deleteVideo = async (req: Request, res: Response) => {
  const { id } = req.params;
  await VideoModel.findByIdAndDelete(id);
  return res.redirect("/");
};
