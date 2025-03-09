import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/employee_login", (req, res) => {
  const sql = "SELECT * FROM employee WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Database Query Error" });
    }

    if (result.length === 0) {
      return res.json({ loginStatus: false, Error: "Invalid Email or Password (User not found)" });
    }

    console.log("Stored Hashed Password:", result[0].password); 
    console.log("Entered Password:", req.body.password);

    bcrypt.compare(req.body.password, result[0].password, (err, isMatch) => {
      if (err) {
        return res.json({ loginStatus: false, Error: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.json({ loginStatus: false, Error: "Invalid Email or Password (Hash mismatch)" });
      }

      const email = result[0].email;
      const id = result[0].id;
      const token = jwt.sign({ role: "employee", email: email, id:result[0].id }, "jwt_secret_key", {
        expiresIn: "1d",
      });

      res.cookie("token", token, { httpOnly: true, secure: true });

      return res.json({ loginStatus: true, id: id, message: "Login Successful" });
    });
  });
});

router.post("/employee_login", (req, res) => {
  const sql = "SELECT * FROM employee WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Database Query Error" });
    }

    if (result.length === 0) {
      return res.json({ loginStatus: false, Error: "Invalid Email or Password (User not found)" });
    }

    

    bcrypt.compare(req.body.password, result[0].password, (err, isMatch) => {
      if (err) {
        return res.json({ loginStatus: false, Error: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.json({ loginStatus: false, Error: "Invalid Email or Password (Hash mismatch)" });
      }

      const email = result[0].email;
      const id = result[0].id;
      const token = jwt.sign({ role: "employee", email: email }, "employee_secret_key", {
        expiresIn: "1d",
      });

      res.cookie("token", token, { httpOnly: true, secure: true });

      return res.json({ loginStatus: true, id: id, message: "Login Successful" });
    });
  });
});

router.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ idStatus: false });
    return res.json(result);
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({status:true})
});


export { router as employeeRouter };
