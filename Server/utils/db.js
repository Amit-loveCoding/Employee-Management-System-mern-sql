import mysql from 'mysql';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

con.connect(function(err) {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("✅ Database connected successfully!");
  }
});

export default con;
