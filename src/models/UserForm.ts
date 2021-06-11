import mongoose from "mongoose";

type UserForm = {
  email: string;
  password: string;
  userName: string;
  nickName: string;
  location?: string;
};

const userSchema = new mongoose.Schema<UserForm>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  nickName: { type: String, required: true, unique: true },
  location: { type: String, required: true },
});
const user = mongoose.model("user", userSchema);
export default user;
