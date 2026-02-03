import mongoose from "mongoose";

// Model for a single message inside a chat
const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["user", "bot"],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Model for a full Chat (contains many messages)
const ChatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      default: "New Chat"
    },
    messages: [MessageSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
