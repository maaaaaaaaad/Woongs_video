import mongoose from "mongoose";
import bcrypt from "bcrypt";

export type UserForm = {
  email: string;
  userName: string;
  password: string;
  password2: string;
  nickName: string;
  location: string;
  socialCheck?: boolean;
};

const userSchema = new mongoose.Schema<UserForm>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  userName: { type: String, required: true, unique: true },
  nickName: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  socialCheck: { type: Boolean, default: false },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
const User = mongoose.model<UserForm>("User", userSchema);
export default User;
