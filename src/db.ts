import mongoose, { Error } from "mongoose";

type MongooseOption = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};

const url: string = `mongodb://127.0.0.1:27017/WV`;

const options: MongooseOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(url, options);
const db = mongoose.connection;

type ConnectionValues = {
  error: string;
  open: string;
};

const message: ConnectionValues = {
  error: "error",
  open: "open",
};

db.on(message.error, (error: Error): void =>
  console.log("DB error", error)
) as mongoose.Connection;

db.once(message.open, (): void =>
  console.log("Connected on DB ✅")
) as mongoose.Connection;
