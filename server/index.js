
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRouter");
const boardRoutes = require("./routes/boardRouter");
const taskRoutes = require("./routes/taskRouter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: [process.env.FRONTEND_URL,"https://task-management-app-dun-psi.vercel.app","https://task-management-app-2jkd.vercel.app"],
	})
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Task Management App's server");
})

app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);

  
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => console.error("MongoDB connection error:", err));
