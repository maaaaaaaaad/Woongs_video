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
  avatarUrl: string;
  socialOnly: boolean;
  videos: mongoose.Schema.Types.ObjectId[];
};

const userSchema = new mongoose.Schema<UserForm>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  userName: { type: String, required: true, unique: true },
  nickName: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  socialCheck: { type: Boolean, default: false },
  avatarUrl: { type: String },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
const User = mongoose.model<UserForm>("User", userSchema);
export default User;
