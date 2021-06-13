import mongoose from "mongoose";
import bcrypt from "bcrypt";

export type UserForm = {
  email: string;
  userName: string;
  password: string;
  password2: string;
  nickName: string;
  location: string;
};

const userSchema = new mongoose.Schema<UserForm>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  nickName: { type: String, required: true, unique: true },
  location: { type: String, required: true },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
const User = mongoose.model<UserForm>("User", userSchema);
export default User;
