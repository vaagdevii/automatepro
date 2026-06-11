const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const leadRoutes = require("./routes/leadRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

dotenv.config();

const app = express();

const uploadsPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(uploadsPath));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.get("/", (req, res) => {
  res.send("AutomatePro Backend is running");
});

app.use("/api/leads", leadRoutes);
app.use("/api/candidates", candidateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});