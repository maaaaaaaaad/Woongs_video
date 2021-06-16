import mongoose, { Error } from "mongoose";

type MongooseOption = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  useCreateIndex: boolean;
};

const url = process.env.DB_URL! as string;

const options: MongooseOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
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
