import { number } from "joi";

const { Schema, model } = require("mongoose");

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
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);

export default mongoose.models.Events || mongoose.model("Event", eventsSchema);
