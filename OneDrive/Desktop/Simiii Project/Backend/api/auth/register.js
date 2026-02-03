import connectDB from "../../dbConnection/dbConnection.js";
import User from "../../models/user.model.js";

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
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    try {
        await connectDB();

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "Email already exists" });
        }

        const user = new User({ name, email, password });
        await user.save();

        return res.json({ success: true, message: "Registered successfully" });
    } catch (err) {
        console.error("Register Error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
}
