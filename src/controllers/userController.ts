import bcrypt from "bcrypt";
import fetch from "node-fetch";
import { Request, Response } from "express";
import User, { UserForm } from "../models/UserForm";

type CheckNameAndPassword = { userName: string; password: string };

type UserReqData = {
  name: string;
  login: string;
  location: string;
  avatar_url: string;
};

type EmailReq = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
};

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
    await User.create({
      email,
      password,
      userName,
      nickName,
      location,
    });
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

  const userExists = await User.findOne({ userName, socialCheck: false });
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
  return res.redirect("/");
};

export const startGithubLogin = (req: Request, res: Response) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config: any = {
    client_id: process.env.GITHUB_CLIENT_ID,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const loginUrl = `${baseUrl}?${params}`;
  return res.redirect(loginUrl);
};

export const callbackGithubLogin = async (req: Request, res: Response) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config: any = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const loginUrl = `${baseUrl}?${params}`;

  try {
    const tokenReq = await (
      await fetch(loginUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      })
    ).json();

    if ("access_token" in tokenReq) {
      const { access_token } = tokenReq;
      const userReq: UserReqData = await (
        await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).json();
      const emailReq: Array<EmailReq> = await (
        await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).json();
      const emailObject = emailReq.find(
        (emailItems) =>
          emailItems.primary === true && emailItems.verified === true
      );
      if (!emailObject) {
        return res.redirect("/login");
      }
      let existsUserEmail = await User.findOne({ email: emailObject.email });
      if (!existsUserEmail) {
        existsUserEmail = await User.create({
          email: emailObject.email,
          password: "",
          userName: userReq.name ? userReq.name : "Unknown",
          nickName: userReq.login ? userReq.login : "Unknown",
          location: userReq.location,
          socialCheck: true,
          avatarUrl: userReq.avatar_url,
        });

        req.session.loggedIn = true;
        req.session.user = existsUserEmail;
        console.log(existsUserEmail);
        return res.redirect("/");
      }
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.clearCookie("connect.sid");
      res.redirect("/");
    }
  });
};

export const getEdit = (req: Request, res: Response) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req: Request, res: Response) => {
  const {
    session: { user: _id },
    body: { name, email, username, location },
  } = req;
  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      userName: name,
      email,
      nickName: username,
      location,
    },
    { new: true }
  );
  if (req.session.user) req.session.user = updateUser;
  return res.redirect("/user/edit");
};

export const remove = (req: Request, res: Response) => {
  return res.send("delete");
};

export const watch = (req: Request, res: Response) => {
  return res.send("wat");
};
