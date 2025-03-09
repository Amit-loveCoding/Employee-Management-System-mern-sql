import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; 
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Start = () => {

  const navigate = useNavigate();


  useEffect(()=>{
   axios.get('http://localhost:3000/verify')
   .then(result=>{
      if(result.data.ststus)
      {
        if(result.data.role === "admin")
        {
           navigate("/dashboard")
        } else {
          navigate(`employee_detail/${result.data.id}`)
        }
      } 
   })
   .catch(err=>console.log(err))
  },[])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="loginForm text-center">
        {/* Heading */}
        <h2 className="fw-bold mb-4">Login As</h2>

        {/* Buttons Section */}
        <div className="d-flex flex-column gap-3">
          <button type="button" className="btn btn-light btn-lg fw-bold" onClick={()=>{navigate('/employee_login')}}>
            <i className="bi bi-person-fill me-2"></i> Employee
          </button>
          <button type="button" className="btn btn-dark btn-lg fw-bold" onClick={()=>{navigate('/adminlogin')}}>
            <i className="bi bi-shield-lock-fill me-2"></i> Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
