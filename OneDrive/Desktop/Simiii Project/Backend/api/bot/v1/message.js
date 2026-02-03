import connectDB from "../../../dbConnection/dbConnection.js";
import Chat from "../../../models/chat.model.js";
import Groq from "groq-sdk";

// Initialize Groq outside handler to reuse if container stays warm? 
// Actually for serverless it's better to verify key exists inside handler or standard init.
// But we can check process.env inside handler safely.

export default async function handler(req, res) {
    // CORS Handling
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Check API Key
    if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({ error: "GROQ_API_KEY is missing in env" });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    try {
        await connectDB();

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

        // 1. Save user message
        chat.messages.push({
            sender: "user",
            text,
        });

        // 2. Call Groq
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

        // 3. Save bot message
        chat.messages.push({
            sender: "bot",
            text: botMessage,
        });

        await chat.save();

        // 4. Send response
        return res.json({
            success: true,
            botMessage,
        });

    } catch (error) {
        console.error("Groq/DB Error:", error);
        return res.status(500).json({ error: "AI Error", details: error.message });
    }
}
