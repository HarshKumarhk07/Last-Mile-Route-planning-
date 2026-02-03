import express from "express";
import Chat from "../models/chat.model.js";

const router = express.Router();

/* Create a new chat */
router.post("/", async (req, res) => {
  try {
    const { userId, title } = req.body;

    const chat = await Chat.create({
      userId,
      title: title || "New Chat",
      messages: []
    });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* Get all chats for user */
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* Get 1 chat */
router.get("/:id", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* Add message to a chat */
router.post("/:id/message", async (req, res) => {
  try {
    const { sender, text } = req.body;

    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    chat.messages.push({ sender, text });
    await chat.save();

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* Delete chat */
router.delete("/:id", async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.json({ message: "Chat deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
