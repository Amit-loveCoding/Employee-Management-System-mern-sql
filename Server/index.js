import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { adminRouter } from "./Routes/AdminRoute.js";
import { employeeRouter } from "./Routes/EmployeeRoute.js";

// Load environment variables
dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// Middleware to Verify JWT Token
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ Status: false, Error: "Not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ Status: false, Error: "Invalid Token" });
    }

    req.id = decoded.id;
    req.role = decoded.role;
    next();
  });
};




// Route to Verify User Authentication
app.get("/verify", verifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id });
});

// Routes
app.use("/auth", adminRouter);
app.use("/employee", employeeRouter);

// Start Server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
