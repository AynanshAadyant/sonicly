// index.js
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./src/database/mongo.config.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
