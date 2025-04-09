import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    date: { type: Date, required: true },
    startTime: { type: String },
    endTime: { type: String },
    attendees: { type: Array },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.models.events || mongoose.model("Events", eventSchema);

export default Event;
