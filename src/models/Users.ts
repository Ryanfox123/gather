import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    admin: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
