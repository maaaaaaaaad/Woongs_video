import express from "express";
import { Request, Response } from "express";
import session from "express-session";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

type App = express.Application;

const app: App = express();
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

const logger = morgan("dev");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Hello",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req: Request, res: Response, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "WV";
  res.locals.loggedInUser = req.session.user;
  console.log(res.locals);
  next();
});

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;
