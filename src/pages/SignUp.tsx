import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { FaGoogle, FaMicrosoft, FaEye, FaEyeSlash } from "react-icons/fa";

import "../styles/signup.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    specialChar: false,
    number: false,
  });

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

  const debouncedValidatePassword = useCallback(
    debounce((passwordValue) => {
      const hasLength = passwordValue.length >= 8;
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(passwordValue);
      const hasNumber = /\d/.test(passwordValue);

      setPasswordValidation({
        length: hasLength,
        specialChar: hasSpecialChar,
        number: hasNumber,
      });
    }, 500),
    []
  );

  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordStrong = passwordValidation.length && passwordValidation.specialChar && passwordValidation.number;
    const doPasswordsMatch = password === confirmPassword;

    if (password.length > 0 && confirmPassword.length > 0 && !doPasswordsMatch) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }

    setIsFormValid(isEmailValid && isPasswordStrong && doPasswordsMatch);
  }, [email, password, confirmPassword, passwordValidation]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
    debouncedValidateEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    debouncedValidatePassword(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Sign Up</h2>
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
                onChange={handlePasswordChange}
              />
              <div
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className="icon-gray" /> : <FaEye className="icon-gray" />}
              </div>
            </div>
            {password.length > 0 && (
              <div className="password-requirements">
                <p className={passwordValidation.length ? 'req-success' : 'req-error'}>At least 8 characters</p>
                <p className={passwordValidation.specialChar ? 'req-success' : 'req-error'}>
                  Contains a special character
                </p>
                <p className={passwordValidation.number ? 'req-success' : 'req-error'}>Contains a numerical value</p>
              </div>
            )}
            <div className="password-group-confirm">
              <label className="input-label">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input-field"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash className="icon-gray" /> : <FaEye className="icon-gray" />}
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <div className="submit-button-container">
              <button
                type="submit"
                className={`submit-button ${!isFormValid && "button-disabled"
                  }`}
                disabled={!isFormValid}
              >
                Sign Up
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
                Sign up with Google
              </button>
              <button className="social-button">
                <FaMicrosoft className="social-icon" />
                Sign up with Microsoft
              </button>
            </div>
            <div className="login-link-container">
              <Link to="/login" className="login-link-text">
                Already have an account? Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;


