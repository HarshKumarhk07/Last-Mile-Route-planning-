import Chat from "../models/chat.model.js";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const Message = async (req, res) => {
  try {
    const { text, chatId } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    if (!chatId) {
      return res.status(400).json({ error: "chatId is required" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    /** 1️⃣ Save user message */
    chat.messages.push({
      sender: "user",
      text,
    });
//GROQ AI CALL — using llama-3.1-8b-instant 
  const completion = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "system",
      content:
        "You are E-govbot, an AI assistant for Indian government services.",
    },
    { role: "user", content: text },
  ],
});

    const botMessage = completion.choices[0].message.content;

    /** 3️⃣ Save bot message */
    chat.messages.push({
      sender: "bot",
      text: botMessage,
    });

    await chat.save();

    /** 4️⃣ Send response to frontend */
    res.json({
      success: true,
      botMessage,
    });
  } catch (error) {
    console.error("🔥 Groq API Error:", error);
    res.status(500).json({ error: "AI Error", details: error });
  }
};
