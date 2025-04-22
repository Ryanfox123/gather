import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    passwordHash: { type: String, required: true },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
    admin: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
