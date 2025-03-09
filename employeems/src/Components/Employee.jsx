import axios from "axios";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []); // ✅ Added dependency array to prevent infinite requests

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_employee/${id}`)
      .then((result) => {
        if (result.data.status) {
          alert("Employee deleted successfully!"); // ✅ Provide feedback
          // navigate('/dashboard/employee');
          window.location.reload()
        } else {
          alert(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div className="container mt-4">
      {/* 🔷 Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">
          <i className="bi bi-person-lines-fill text-primary me-2"></i> Employee List
        </h3>
        <Link to="/dashboard/add_employee" className="btn btn-primary shadow-sm">
          <i className="bi bi-person-plus-fill me-1"></i> Add Employee
        </Link>
      </div>

      {/* 🔷 Employee Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover table-bordered">
            <thead className="table-primary text-center">
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Email</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((e, index) => (
                <tr key={index} className="align-middle text-center">
                  <td className="fw-bold">{e.name}</td>
                  <td>
                    {e.image ? (
                      <img
                        src={`http://localhost:3000/Images/${e.image}`}
                        alt="Employee"
                        width="50"
                        height="50"
                        className="rounded-circle border"
                      />
                    ) : (
                      <span className="text-muted">No Image</span>
                    )}
                  </td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td className="fw-semibold text-success">
                    <i className="bi bi-currency-dollar"></i> {e.salary}
                  </td>
                  <td>
                    <Link to={`/dashboard/edit_employee/${e.id}`} className="btn btn-warning btn-sm me-2">
  <i className="bi bi-pencil-square"></i> Edit
</Link>

                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}>
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
