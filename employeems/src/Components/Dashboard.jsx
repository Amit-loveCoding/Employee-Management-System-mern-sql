import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.status) {
        localStorage.setItem("valid", true);
        navigate("/");
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        
        {/* Sidebar */}
        <nav className={`col-md-3 col-lg-2 d-md-block bg-dark sidebar py-4 ${isCollapsed ? "collapsed" : ""}`}>
          <div className="text-center mb-4">
            <Link to="/dashboard" className="navbar-brand text-light fs-4 fw-bold d-flex align-items-center justify-content-center">
              <i className="bi bi-graph-up-arrow me-2"></i>
              <span className="text-uppercase">EMS Dashboard</span>
              <i className="bi bi-rocket-takeoff ms-2 text-warning"></i>
            </Link>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-light">
                <i className="bi bi-house-door me-2"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/employee" className="nav-link text-light">
                <i className="bi bi-people me-2"></i> Manage Employee
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/category" className="nav-link text-light">
                <i className="bi bi-card-list me-2"></i> Category
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/profile" className="nav-link text-light">
                <i className="bi bi-person-circle me-2"></i> Profile
              </Link>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-auto text-center">
            <button className="btn btn-danger w-75 mt-3" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i> Log Out
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
            <div className="container-fluid d-flex justify-content-between">
              <span className="navbar-brand fs-4 fw-bold">
                <i className="bi bi-person-badge me-2 text-primary"></i> Employee Management System
              </span>
              <button className="btn btn-outline-primary" onClick={() => setIsCollapsed(!isCollapsed)}>
                <i className={`bi ${isCollapsed ? "bi-list" : "bi-x-lg"}`}></i>
              </button>
            </div>
          </nav>

          {/* Outlet for Nested Routes */}
          <div className="p-3">
            <Outlet />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 