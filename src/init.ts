import "./db";
import "./models/VideoForm";
import app from "./server";

const PORT: number = 1779;
const SERVERINITMESSAGE: string = `Server for http://localhost:${PORT} port🚀`;

app.listen(PORT, (): void => {
  console.log(SERVERINITMESSAGE);
});
