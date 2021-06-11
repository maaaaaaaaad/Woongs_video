import { Request, Response } from "express";
import User, { UserForm } from "../models/UserForm";

export const getJoin = (req: Request, res: Response) =>
  res.render("join", { pageTitle: "Join" });

export const postJoin = async (req: Request, res: Response) => {
  const { email, password, userName, nickName, location }: UserForm = req.body;
  const createUserData = new User({
    email,
    password,
    userName,
    nickName,
    location,
  });
  await createUserData.save();
  return res.redirect("/login");
};

export const edit = (req: Request, res: Response) => {
  return res.send("Edit Profile");
};

export const remove = (req: Request, res: Response) => {
  return res.send("delete");
};

export const login = (req: Request, res: Response) => {
  return res.send("login");
};

export const logout = (req: Request, res: Response) => {
  return res.send("logout");
};

export const watch = (req: Request, res: Response) => {
  return res.send("wat");
};
