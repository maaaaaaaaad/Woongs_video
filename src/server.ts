import express from "express";
import "./db";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

type App = express.Application;

const PORT: number = 1779;
const app: App = express();
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

const logger = morgan("dev");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

app.listen(PORT, (): void => {
  console.log(`Hello server for http://localhost:${PORT} port🚀`);
});
