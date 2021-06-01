import express from "express";
import morgan from "morgan";

const PORT: number = 1779;
const app = express();
const logger = morgan("dev");

app.use(logger);
app.get("/", (req, res): void => {
  console.log(`Please show your any ${req}`);
  res.send(`<section><h1>Done!</h1><h2>Check your console</h2></section>`);
});

app.listen(PORT, (): void => {
  console.log(`Hello server for http://localhost:${PORT} port🚀`);
});
