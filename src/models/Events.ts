import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    duration: { type: Number, required: true, min: 0.5, max: 10 },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
  }
);

const Events = mongoose.models.Events || mongoose.model("Events", eventSchema);

export default Events;
