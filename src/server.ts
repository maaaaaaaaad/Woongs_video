import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

type App = express.Application;

const app: App = express();
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

const logger = morgan("dev");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET! as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL! as string }),
  })
);

app.use(localsMiddleware);

app.use("/uploads", express.static("uploads"));
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;
