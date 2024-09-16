import React from 'react';
import './styles/logout.css'
import { Link } from "react-router-dom";


function SignupPage() {
  return (
    <div className="login-page">
      <h1 className="login-title">SignUp</h1>
      <p className="login-message">Please select your SignUp type:</p>
      <ul className="login-options">
      
        <li className="login-option"> 
          {/* <a href="/authentication/teacher-signUp" className="login-link teacher-login-link">SignUp as Teacher</a> */}
          <Link  to="/authentication/teacher-signUp" className="login-link teacher-login-link">SignUp as Teacher</Link>
        </li>
        
        <li className="login-option">
          {/* <a href="/authentication/sign-up" className="login-link student-login-link">SignUp as Student</a> */}
          <Link to='/authentication/sign-up' className="login-link student-login-link">SignUp as Student</Link>
        </li>
      </ul>
    </div>
  );
}
export default SignupPage;
