require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
