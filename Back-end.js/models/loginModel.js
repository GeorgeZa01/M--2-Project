import { pool } from "../config/config.js";

// Fetch user by username from the database
const getUserByUsername = async (username) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows.length > 0 ? rows[0] : null; // Return user object if found, or null if not
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching user data");
  }
};

export { getUserByUsername };
