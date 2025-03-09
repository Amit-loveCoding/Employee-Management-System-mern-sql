import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons


const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then(result => setEmployee(result.data[0]))
      .catch(err => console.log(err));
  }, [id]);

  const handleLogout = () =>{
    axios.get('http://localhost:3000/employee/logout')
    .then(result =>{
     if(result.data.status)
     {
      localStorage.setItem("valid",true)
       navigate("/")
     }
    })
 }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employee Management System</h2>
      <div className="card shadow p-4">
        <div className="row">
          {/* Employee Image */}
          <div className="col-md-4 text-center">
            <img 
              src={`http://localhost:3000/Images/${employee.image}`} 
              alt="Employee" 
              className="img-fluid rounded-circle border"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>

          {/* Employee Details */}
          <div className="col-md-8">
            <h4><strong>Name:</strong> {employee.name}</h4>
            <h5><strong>Email:</strong> {employee.email}</h5>
            <h5><strong>Salary:</strong> ${employee.salary}</h5>
            
            {/* Buttons */}
            <div className="mt-4">
              <button className="btn btn-primary me-2">
                <i className="bi bi-pencil"></i> Edit
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                <i className="bi bi-power"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
