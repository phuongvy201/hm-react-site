import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileSidebar from "../../../../components/ProfileSidebar";
import authService from "../../../../service/AuthService";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      if (response.data.status === "success") {
        Toast.fire({
          icon: "success",
          title: "Password changed successfully",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach((errorMessages) => {
          errorMessages.forEach((message) => {
            Toast.fire({
              icon: "error",
              title: message
            });
          });
        });
      } else if (error.response?.data?.message) {
        Toast.fire({
          icon: "error",
          title: error.response.data.message
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "An error occurred. Please try again later."
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <ProfileSidebar />
          <div className="col-12 col-md-9 col-lg-9">
            <div className="profile-container">
              <div className="account-container">
                <div className="account-breadcrumb">
                  <Link to="/">Home</Link>
                  <i className="fas fa-chevron-right"></i>
                  <span>Change password</span>
                </div>
                <h4>Change Password</h4>
                <hr />
                <form onSubmit={handleSubmit}>
                  <div className="changepassword-container">
                    <div className="changepassword-form-group">
                      <label htmlFor="current-password">
                        Current password <span className="required">*</span>
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        id="current-password"
                        placeholder="Current password"
                      />
                    </div>
                    <div className="changepassword-form-group">
                      <label htmlFor="new-password">
                        New password <span className="required">*</span>
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        id="new-password"
                        placeholder="New password"
                      />
                    </div>
                    <div className="changepassword-form-group">
                      <label htmlFor="confirm-password">
                        Confirm password <span className="required">*</span>
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        id="confirm-password"
                        placeholder="Confirm password"
                      />
                    </div>
                    <div className="changepassword-notice">
                      Notice: Password must be at least 6 characters
                    </div>
                    <button type="submit" className="changepassword-btn">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="top-pick mt-4">
          <h4 className="component-heading">Top Pick</h4>
          <div className="top-pick-scroll mt-4">
            <div className="row">
              <div className="col-lg-2 col-6 col-md-4 top-pick-item">
                <Link
                  style={{ backgroundColor: "#b8e8fc" }}
                  className="rounded d-flex align-items-center justify-content-center"
                  href="#"
                >
                  Halloween Costumes
                </Link>
              </div>
              <div className="col-lg-2 col-6 col-md-4 top-pick-item">
                <Link
                  style={{ backgroundColor: "#ddffbb" }}
                  className="rounded d-flex align-items-center justify-content-center"
                  href="#"
                >
                  Halloween Costumes
                </Link>
              </div>
              <div className="col-lg-2 col-6 col-md-4 top-pick-item">
                <Link
                  style={{ backgroundColor: "#b6e2a1" }}
                  className="rounded d-flex align-items-center justify-content-center"
                  href="#"
                >
                  Halloween Costumes
                </Link>
              </div>
              <div className="col-lg-2 col-6 col-md-4 top-pick-item">
                <Link
                  style={{ backgroundColor: "#ffcefe" }}
                  className="rounded d-flex align-items-center justify-content-center"
                  href="#"
                >
                  Halloween Costumes
                </Link>
              </div>
              <div className="col-lg-2 col-6 col-md-4 top-pick-item">
                <Link
                  style={{ backgroundColor: "#fff2cc" }}
                  className="rounded d-flex align-items-center justify-content-center"
                  href="#"
                >
                  Halloween Costumes
                </Link>
              </div>
              <div className="col-lg-2 col-6 col-md-4 top-pick-item">
                <Link
                  style={{ backgroundColor: "#aee2ff" }}
                  className="rounded d-flex align-items-center justify-content-center"
                  href="#"
                >
                  Halloween Costumes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
