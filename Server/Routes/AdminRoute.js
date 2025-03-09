import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from "path";

const router = express.Router();

router.post('/adminlogin',(req,res)=>{
  const sql = "SELECT * from admin where email = ? and password = ? "
  con.query(sql,[req.body.email, req.body.password],(err,result)=>{
    if(err) return res.json({loginStatus:false,Error:"Query Error"})
    if(result.length > 0)
    {
      const email = result[0].email;
      const token = jwt.sign({ role: "admin", email: email, id: result[0].id }, "jwt_secret_key", { expiresIn: "1d" });

      res.cookie('token',token);
      return res.json({loginStatus:true})
    } else {
      return res.json({loginStatus:false,Error:"Wrong Credentials"})
    }
  })
})

router.get('/category',(req,res)=>{
  const sql = "SELECT * FROM category";
  con.query(sql, (err,result)=>{
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    return res.json({ status: true, message: "Category added successfully!",Result:result });
  })
})

router.post('/add_category', (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.json({ status: false, error: "Category name is required!" });
  }

  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [category], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    return res.json({ status: true, message: "Category added successfully!" });
  });
});

// image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// end image upload

router.post('/add_employee',upload.single('image'), (req,res) =>{

  const sql = `INSERT INTO employee (name,email,password,address,salary,image,category_id) VALUES (?)`;
  bcrypt.hash(req.body.password.toString(), 10, (err,hash)=>{
    if (err) {
      console.error("Hashing Error:", err);
      return res.json({ status: false, error: "Hashing Error" });
    }

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
      req.body.category_id,
    ]
    con.query(sql, [values], (err,result)=>{
      if (err) {
        console.error("Database Error:", err);
        return res.json({ status: false, error: "Database Query Error" });
      }
  
      return res.json({ status: true, message: "Employee added successfully!",Result:result });
    })
  })
})

router.get('/employee',(req,res)=>{
  const sql = "SELECT * FROM employee";
  con.query(sql, (err,result)=>{
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    return res.json({ status: true, message: "Employee added successfully!",Result:result });
  })
})

router.get('/employee/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql,[id], (err,result)=>{
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    return res.json({ status: true, message: "Employee edited successfully!",Result:result });
  })
})

router.put('/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
               SET name = ?, email = ?, salary = ?, address = ?, category_id = ? 
               WHERE id = ?`;

  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.category_id,
    id 
  ];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    return res.json({ status: true, message: "Employee edited successfully!", Result: result });
  });
});

router.delete('/delete_employee/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "DELETE FROM employee WHERE id = ?";
  con.query(sql,[id], (err,result)=>{
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    return res.json({ status: true, message: "Employee deleted successfully!",Result:result });
  })
})

router.get('/admin_count',(req,res)=>{
 
  const sql = "SELECT COUNT(id) as admin from admin";
  con.query(sql,(err,result)=>{
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    return res.json({ status: true, message: "Admin counted successfully!",Result:result });
  })
})

router.get('/employee_count',(req,res)=>{
 
  const sql = "SELECT COUNT(id) as employee from employee";
  con.query(sql,(err,result)=>{
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    return res.json({ status: true, message: "Employee counted successfully!",Result:result });
  })
})

router.get('/salary_count', (req, res) => {
  const sql = "SELECT COALESCE(SUM(salary), 0) AS salary FROM employee"; 
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    return res.json({ status: true, message: "Salary total calculated successfully!", Result: result });
  });
});

router.get('/admins', (req, res) => {
  const sql = "SELECT * from admin";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    return res.json({ status: true, message: "Admins total calculated successfully!", Result: result });
  });
});

router.get('/logout',(req,res)=>{
  res.clearCookie('token');
  return res.json({status:true})
})

router.put('/admins/:id', (req, res) => {
  const adminId = req.params.id;
  const { email } = req.body;

  if (!email) {
    return res.json({ status: false, error: "Email is required!" });
  }

  const sql = "UPDATE admin SET email = ? WHERE id = ?";
  con.query(sql, [email, adminId], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    if (result.affectedRows === 0) {
      return res.json({ status: false, message: "Admin not found!" });
    }

    return res.json({ status: true, message: "Admin updated successfully!" });
  });
});

router.delete('/admins/:id', (req, res) => {
  const adminId = req.params.id;

  const sql = "DELETE FROM admin WHERE id = ?";
  con.query(sql, [adminId], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.json({ status: false, error: "Database Query Error" });
    }

    if (result.affectedRows === 0) {
      return res.json({ status: false, message: "Admin not found!" });
    }

    return res.json({ status: true, message: "Admin deleted successfully!" });
  });
});



export {router as adminRouter}