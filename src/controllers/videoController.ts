import { Request, Response } from "express";

type VideoInfo = {
  id: number;
  title: string;
  rating: number;
  comments: number;
  createdAt: string;
  views: number;
};

type Videos = Array<VideoInfo>;

let videos: Videos = [
  {
    id: 1,
    title: "fir Video",
    rating: 4,
    comments: 21,
    createdAt: "2 min ago",
    views: 108,
  },
  {
    id: 2,
    title: "sec Video",
    rating: 1,
    comments: 0,
    createdAt: "5 min ago",
    views: 1,
  },
  {
    id: 3,
    title: "thr Video",
    rating: 2,
    comments: 170,
    createdAt: "33 min ago",
    views: 1098,
  },
];

export const popular = (req: Request, res: Response) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const search = (req: Request, res: Response) => {
  return res.send("login");
};

export const upload = (req: Request, res: Response) => {
  return res.send("upload");
};

export const watch = (req: Request, res: Response) => {
  const { id } = req.params;
  const video = videos[+id - 1];
  return res.render("watch", { pageTitle: `Watch ${video.title}`, video });
};

export const getEdit = (req: Request, res: Response) => {
  const { id } = req.params;
  const video = videos[+id - 1];
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = (req: Request, res: Response) => {
  const id: string = req.params.id;
  const title: string = req.body.title;
  videos[+id - 1].title = title;
  return res.redirect(`/video/${id}`);
};

export const deleteVideo = (req: Request, res: Response) => {
  console.log(req.params);
  return res.send("delete video");
};
