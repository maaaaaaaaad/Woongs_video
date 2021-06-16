import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User, { UserForm } from "../models/UserForm";

type CheckNameAndPassword = { userName: string; password: string };

export const getJoin = (req: Request, res: Response) =>
  res.render("join", { pageTitle: "Join" });

export const postJoin = async (req: Request, res: Response) => {
  const { email, password, password2, userName, nickName, location }: UserForm =
    req.body;

  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password does not match",
    });
  }

  const userNameExists: boolean = await User.exists({
    $or: [{ email }, { userName }],
  });

  if (userNameExists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This user name or email address is already taken.",
    });
  }
  try {
    const createUserData = new User({
      email,
      password,
      userName,
      nickName,
      location,
    });
    await createUserData.save();
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: `Join`,
      errorMessage: `Error! ${error._message}`,
    });
  }
};

export const getLogin = (req: Request, res: Response) => {
  return res.render("login", { pageTitle: "SIGN IN" });
};

export const postLogin = async (req: Request, res: Response) => {
  const { userName, password }: CheckNameAndPassword = req.body;

  const userExists = await User.findOne({ userName });
  if (!userExists) {
    return res.status(400).render("login", {
      pageTitle: "SIGN IN",
      errorMessage: "Not found an Account",
    });
  }

  const checkingPassword = await bcrypt.compare(password, userExists.password);
  if (!checkingPassword) {
    return res.status(400).render("login", {
      pageTitle: "SIGN IN",
      errorMessage: "No password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = userExists;
  console.log("-----User Controller-----");
  return res.redirect("/");
};

export const edit = (req: Request, res: Response) => {
  return res.send("Edit Profile");
};

export const remove = (req: Request, res: Response) => {
  return res.send("delete");
};

export const logout = (req: Request, res: Response) => {
  return res.send("logout");
};

export const watch = (req: Request, res: Response) => {
  return res.send("wat");
};
