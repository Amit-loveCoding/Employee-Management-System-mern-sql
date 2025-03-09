import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Import styles
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/adminlogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid",true)
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="loginForm text-center">
        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Heading */}
        <h2 className="fw-bold mb-4">Admin Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label fw-bold">
              <i className="bi bi-envelope-fill me-2"></i>Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              className="form-control rounded-3"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label fw-bold">
              <i className="bi bi-lock-fill me-2"></i>Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="form-control rounded-3"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-success w-100 fw-bold rounded-3">
            <i className="bi bi-box-arrow-in-right me-2"></i> Log in
          </button>

          {/* Terms & Conditions Checkbox */}
          <div className="form-check mt-3 text-start">
            <input type="checkbox" id="terms" className="form-check-input" />
            <label htmlFor="terms" className="form-check-label ms-2">
              I agree with the terms & conditions
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
