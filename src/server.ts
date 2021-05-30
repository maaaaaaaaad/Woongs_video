import express from "express";

const PORT: number = 1779;

const app = express();

app.listen(PORT, (): void => {
  console.log(`Hello server for http://localhost:${PORT} port🚀`);
});
