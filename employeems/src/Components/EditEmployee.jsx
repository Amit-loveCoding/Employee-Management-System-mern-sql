import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: ""
  });

  const navigate = useNavigate();

  // ✅ Fetch categories & employee data on component mount
  useEffect(() => {
    axios.get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios.get(`http://localhost:3000/auth/employee/${id}`)
      .then((result) => {
        if (result.data.status) {
          setEmployee({
            name: result.data.Result[0].name,
            email: result.data.Result[0].email,
            address: result.data.Result[0].address,
            salary: result.data.Result[0].salary,
            category_id: result.data.Result[0].category_id,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

  }, [id]); // ✅ Added `id` as a dependency to refetch when ID changes

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/auth/edit_employee/${id}`, employee)
      .then(result => {
        if (result.data.status) {
          alert("Employee updated successfully!");
          navigate("/dashboard/employee"); // ✅ Navigate after update
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-50 border-0 rounded-3">
        <h3 className="text-center text-primary mb-3">
          <i className="bi bi-person-plus-fill me-2"></i> Edit Employee
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
              value={employee.name}
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
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
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
              value={employee.salary}
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
              value={employee.address}
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
              value={employee.category_id} // ✅ Preselect category
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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-person-check-fill me-2"></i> Edit Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
