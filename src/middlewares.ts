import { Request, Response } from "express";
import multer from "multer";

export const localsMiddleware = (
  req: Request,
  res: Response,
  next: () => void
) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "WV";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (
  req: Request,
  res: Response,
  next: () => any
) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (
  req: Request,
  res: Response,
  next: () => any
) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
});
