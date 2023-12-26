import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    messages: [
      {
        content: { type: String },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        recieverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        time: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
