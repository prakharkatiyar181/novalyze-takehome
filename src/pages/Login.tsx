import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { FaGoogle, FaMicrosoft, FaEye, FaEyeSlash } from "react-icons/fa";

import "../styles/login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");

  const debouncedValidateEmail = useCallback(
    debounce((emailValue) => {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
      if (!isEmailValid && emailValue.length > 0) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }, 500),
    []
  );

  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length > 0;
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
    debouncedValidateEmail(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <form>
            <div className="input-group">
              <label className="input-label">
                Email
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="password-group">
              <label className="input-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className="icon-gray" /> : <FaEye className="icon-gray" />}
              </div>
            </div>
            <div className="forgot-password-container">
              <a href="#" className="link-text">
                Forgot password?
              </a>
            </div>
            <div className="submit-button-container">
              <button
                type="submit"
                className={`submit-button ${!isFormValid && "button-disabled"
                  }`}
                disabled={!isFormValid}
              >
                Login
              </button>
            </div>
            <div className="divider-container">
              <div className="divider-line"></div>
              <span className="divider-text">or</span>
              <div className="divider-line"></div>
            </div>
            <div className="social-buttons-container">
              <button className="social-button">
                <FaGoogle className="social-icon" />
                Sign in with Google
              </button>
              <button className="social-button">
                <FaMicrosoft className="social-icon" />
                Sign in with Microsoft
              </button>
            </div>
            <div className="signup-link-container">
              <Link to="/signup" className="signup-link-text">
                Create a new user
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
