import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    image: null,
    category_id: ""
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Use FormData for File Upload
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("salary", employee.salary);
    formData.append("address", employee.address);
    formData.append("category_id", employee.category_id);
    if (employee.image) {
      formData.append("image", employee.image);
    }
  
    try {
      const response = await axios.post("http://localhost:3000/auth/add_employee", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  
      if (response.data.status) {
        navigate("/dashboard/employee");
      } else {
        alert(response.data.Error);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee.");
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-50 border-0 rounded-3">
        <h3 className="text-center text-primary mb-3">
          <i className="bi bi-person-plus-fill me-2"></i> Add Employee
        </h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">
              <i className="bi bi-person-fill me-2"></i> Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control shadow-sm"
              placeholder="Enter Employee Name"
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              <i className="bi bi-envelope-fill me-2"></i> Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control shadow-sm"
              placeholder="Enter Email"
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              <i className="bi bi-lock-fill me-2"></i> Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control shadow-sm"
              placeholder="Enter Password"
              onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
              required
            />
          </div>

          {/* Salary Field */}
          <div className="mb-3">
            <label htmlFor="salary" className="form-label fw-bold">
              <i className="bi bi-currency-dollar me-2"></i> Salary:
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              className="form-control shadow-sm"
              placeholder="Enter Salary"
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
              required
            />
          </div>

          {/* Address Field */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label fw-bold">
              <i className="bi bi-geo-alt-fill me-2"></i> Address:
            </label>
            <textarea
              id="address"
              name="address"
              className="form-control shadow-sm"
              placeholder="Enter Address"
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
              required
            ></textarea>
          </div>

          {/* Category Field */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-bold">
              <i className="bi bi-tag-fill me-2"></i> Category:
            </label>
            <select
              name="category"
              id="category"
              className="form-select shadow-sm"
              onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
              required
            >
              <option value="">Select a Category</option>
              {category.map((c, index) => (
                <option key={index} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label fw-bold">
              <i className="bi bi-file-earmark-image-fill me-2"></i> Upload Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control shadow-sm"
              onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-person-check-fill me-2"></i> Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
