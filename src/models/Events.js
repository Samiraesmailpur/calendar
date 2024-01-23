import mongoose, { Schema } from "mongoose";

const eventsSchema = new Schema(
  {
    start: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    order: {
      type: Number,
      required: false,
    },
    column: {
      type: Number,
      required: false,
    },
  },

  { versionKey: false, timestamps: true }
);

export default mongoose.models.events || mongoose.model("events", eventsSchema);
