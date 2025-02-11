import { getUserByUsername } from "../models/loginModel.js";
import bcrypt from "bcrypt";

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    // Fetch user data from the database
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).json({ error: "Invalid username or password" });
    }

    // Successful login
    res.json({ message: "Login successful", role: user.role });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { loginController };
