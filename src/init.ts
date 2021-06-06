import "./db";
import "./models/Video";
import app from "./server";

const PORT: number = 1779;

app.listen(PORT, (): void => {
  console.log(`Hello server for http://localhost:${PORT} port🚀`);
});
