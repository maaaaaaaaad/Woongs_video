import express from "express";

const PORT: number = 1779;

const app = express();
app.get("/", (req, res) => {
  return res.end();
});

app.listen(PORT, (): void => {
  console.log(`Hello server for http://localhost:${PORT} port🚀`);
});
