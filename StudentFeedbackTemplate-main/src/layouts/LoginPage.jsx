import React from 'react';
import './styles/logout.css'
import { Link } from "react-router-dom";

function LoginPage() {
  return (
  <>
    <div className="login-page">
      <h1 className="login-title ">Login</h1>
      <p className="login-message">Please select your login type:</p>
      <ul className="login-options">
        
        <li className="login-option">
          {/* <a href="/authentication/teacher-signIn" className="login-link teacher-login-link">Login as Teacher</a> */}
          <Link to="/authentication/teacher-signIn" className="login-link teacher-login-link">Login as Teacher</Link>
        </li>
        
        <li className="login-option">
          {/* <a href="/authentication/sign-in" className="login-link student-login-link">Login as Student</a> */}
          <Link to="/authentication/sign-in" className="login-link student-login-link">Login as Student</Link>
        </li>
      </ul>
    </div>
    </>
  );
}

export default LoginPage;