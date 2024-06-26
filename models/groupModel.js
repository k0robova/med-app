import { Schema, model } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "1",
    },
  },
  { versionKey: false, timestamps: true }
);

export const GroupModel = model("Groups", groupSchema);
