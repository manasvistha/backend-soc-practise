import express, { Application } from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.route";

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Hello, World");
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));