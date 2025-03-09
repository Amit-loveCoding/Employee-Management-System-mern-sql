import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [adminRes, employeeRes, salaryRes, adminsRes] = await Promise.all([
        axios.get("http://localhost:3000/auth/admin_count"),
        axios.get("http://localhost:3000/auth/employee_count"),
        axios.get("http://localhost:3000/auth/salary_count"),
        axios.get("http://localhost:3000/auth/admins"),
      ]);

      if (adminRes.data.status) setAdminTotal(adminRes.data.Result[0]?.admin || 0);
      if (employeeRes.data.status) setEmployeeTotal(employeeRes.data.Result[0]?.employee || 0);
      if (salaryRes.data.status) setSalaryTotal(salaryRes.data.Result[0]?.salary || 0);

      if (adminsRes.data.status) setAdmins(adminsRes.data.Result);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleEdit = (admin) => {
    navigate(`/edit_admin/${admin.id}`, { state: { admin } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/auth/admins/${id}`);
        if (response.data.status) {
          setAdmins(admins.filter((admin) => admin.id !== id));
        }
      } catch (err) {
        console.error("Error deleting admin:", err);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row g-4 justify-content-center">
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow-lg border-0 rounded-4 p-3 text-center">
            <div className="card-body">
              <i className="bi bi-person-badge-fill display-4 mb-3"></i>
              <h4 className="fw-bold">Admin</h4>
              <p className="fs-5 fw-bold">Total: {adminTotal}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success shadow-lg border-0 rounded-4 p-3 text-center">
            <div className="card-body">
              <i className="bi bi-people-fill display-4 mb-3"></i>
              <h4 className="fw-bold">Employees</h4>
              <p className="fs-5 fw-bold">Total: {employeeTotal}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-dark bg-warning shadow-lg border-0 rounded-4 p-3 text-center">
            <div className="card-body">
              <i className="bi bi-cash-stack display-4 mb-3"></i>
              <h4 className="fw-bold">Salary</h4>
              <p className="fs-5 fw-bold">Total: ${salaryTotal}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-lg border-0 rounded-4 p-4 mt-5">
        <h3 className="fw-bold text-center mb-4">
          <i className="bi bi-person-lines-fill text-primary me-2"></i> List of Admins
        </h3>

        <div className="table-responsive">
          <table className="table table-striped table-hover text-center align-middle">
            <thead className="bg-primary text-white">
              <tr>
                <th className="py-3">Email</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="py-3">{admin.email}</td>
                    <td className="py-3">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(admin)}
                      >
                        <i className="bi bi-pencil-fill"></i> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(admin.id)}
                      >
                        <i className="bi bi-trash-fill"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-muted py-3">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
