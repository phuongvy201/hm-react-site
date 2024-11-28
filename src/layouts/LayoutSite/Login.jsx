import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../service/AuthService";
import Swal from "sweetalert2";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      const data = await response.data;
      console.log(data);

      if (data.status === "success") {
        // Save token to localStorage
        localStorage.setItem("token", data.access_token);

        // Save user info (including role) to localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // If remember me is checked
        if (formData.remember) {
          localStorage.setItem("rememberedEmail", formData.email);
        }
        console.log(data.user.role);

        // Navigate based on role
        if (data.user.role === "customer") {
          navigate("/");
        } else {
          // Handle other roles if any
          Toast.fire({
            icon: "error",
            title: "Access denied!",
          });
          await authService.logout();
          localStorage.clear();
          // Clear token and user info
        }
      } else {
        // Display error message from server
        Toast.fire({
          icon: "error",
          title: data.message || "Login failed!",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Toast.fire({
        icon: "error",
        title: "Please check your login information again!",
      });
    }
  };
  return (
    <div className="login pd-5 mt-5">
      <div className="container ">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 ">
            <img
              style={{ width: "100%" }}
              className="img-fluid"
              src="./public/img/user (2).png"
              alt=""
            />
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <div className="container-login">
              <h1>Welcome to Printerval</h1>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Email Address"
                    type="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <div className="form-options">
                  <label>
                    <input
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      type="checkbox"
                    />
                    Remember Me
                  </label>
                  <Link to="#">Forgot Your Password?</Link>
                </div>
                <button className="login-button" type="submit">
                  Login
                </button>
              </form>
              <div className="divider">
                <span>or</span>
              </div>
              <div className="social-login">
                <Link className="facebook" to="#">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link className="google" to="#">
                  <i className="fab fa-google"></i>
                </Link>
              </div>
              <div className="signup">
                Don't have an account?&nbsp;
                <Link to="/signup">Sign Up Free</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
