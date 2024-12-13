import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import authService from "../../service/AuthService";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
  const [message, setMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    };

    // Check email
    if (!formData.email.trim()) {
      newErrors.email = "The email field is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }
    if (!formData.name) {
      newErrors.name = "The name field is required";
      isValid = false;
    }

    // Check password
    if (!formData.password) {
      newErrors.password = "The password field is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "The password field must be at least 8 characters";
      isValid = false;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "The confirm password field is required";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword =
        "The confirm password field must be the same as the password field";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await authService.register(formData);
      const data = await response.data;

      if (data.status === "success") {
        // // Save token to localStorage
        // localStorage.setItem("token", data.access_token);

        // // Save user info to localStorage
        // localStorage.setItem("user", JSON.stringify(data.user));

        // Navigate based on role
        if (data.status === "success") {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("user", JSON.stringify(data.user));
          Toast.fire({
            icon: "success",
            title:
              "Sign up successfully! Please check your email for the verification code.",
          });
          setStep(2);
        }
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        const newErrors = {};
        Object.keys(serverErrors).forEach((key) => {
          newErrors[key] = serverErrors[key][0];
        });
        setErrors(newErrors);
      } else {
        Toast.fire({
          icon: "error",
          title: "An error occurred during registration!",
        });
      }
    }
  };
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.verifymail({
        email: formData.email, // Đặt key là "email" và value là "formData.email"
        verification_code: verificationCode, // Đặt key là "verificationCode" và value tương ứng
      });
      const data = await response.data;
      if (data.status === "success") {
        Toast.fire({
          icon: "success",
          title: "Email verified successfully!",
        });

        navigate("/");
      }
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error verifying email");
    }
  };

  return (
    <div className="signin pt-5 pb-5">
      <div className="container ">
        <div className="row">
          <div className="col-sm-6">
            <img
              style={{ width: "100%" }}
              className="img-fluid"
              src="./public/img/user (2).png"
              alt="signup"
            />
          </div>
          <div className="col-sm-6">
            <div className="signin-container">
              <h1>Join With Us</h1>
              {step === 1 ? (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    placeholder="Your Name"
                    className={errors.name ? "form-control is-invalid" : ""}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "form-control is-invalid" : ""}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className={
                        errors.password ? "form-control is-invalid" : ""
                      }
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    placeholder="Confirm Your Password"
                    className={
                      errors.confirmPassword ? "form-control is-invalid" : ""
                    }
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                  <button className="login-button" type="submit">
                    Sign In
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyEmail}>
                  {" "}
                  <input
                    type="text"
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />{" "}
                  <button className="btn  btn-success" type="submit">
                    Verify Email
                  </button>{" "}
                </form>
              )}
              {message && <p>{message}</p>}
              <div className="signin-link">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
              <div className="terms">
                By clicking Sign In, you agree to our{" "}
                <Link to="#">User Agreement</Link> and{" "}
                <Link to="#">Privacy Policy</Link>, and to receive our
                promotional emails (opt out any time).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
