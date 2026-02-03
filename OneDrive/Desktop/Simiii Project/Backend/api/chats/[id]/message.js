import connectDB from "../../../dbConnection/dbConnection.js";
import Chat from "../../../models/chat.model.js";

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
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { id } = req.query;

    try {
        await connectDB();

        const { sender, text } = req.body;
        const chat = await Chat.findById(id);

        if (!chat) return res.status(404).json({ message: "Chat not found" });

        chat.messages.push({ sender, text });
        await chat.save();

        return res.json(chat);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
