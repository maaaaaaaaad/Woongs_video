import { Request, Response } from "express";

export const join = (req: Request, res: Response) => {
  return res.send("Join");
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

export const see = (req: Request, res: Response) => {
  return res.send("see");
};
