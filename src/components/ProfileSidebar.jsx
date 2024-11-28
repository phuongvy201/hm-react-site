import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customerService from "../service/CustomerService";
import { urlImage } from "../config";
import authService from "../service/AuthService";
export default function ProfileSidebar() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await customerService.getCurrentCustomer();
        setCustomer(response.data.data); // Giả sử API trả về data trong response.data.data
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);
  const handleLogout = async () => {
    try {
      // Lấy token từ localStorage

      // Gọi API đăng xuất
      await authService.logout();

      // Xóa token khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Chuyển hướng về trang login
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };
  return (
    <div className="col-lg-3 col-md-3 col-12 d-none d-md-block d-lg-block">
      <div className="profile-card">
        <div className="profile-header">
          <img
            alt="Profilepicture of Phuong Vi"
            height={40}
            src={urlImage + customer?.avatar}
            width={40}
          />
          <span className="name"> {customer?.name} </span>
        </div>
        <div className="profile-menu">
          <Link to="/myaccount">
            <i className="fas fa-user"> </i>
            User Profile
          </Link>

          <Link to="/myorder">
            <i className="fas fa-clipboard-list"> </i>
            My Order
          </Link>

          <Link to="/changepassword">
            <i className="fas fa-user-friends"> </i>
            Change Password
          </Link>

          <Link to="#" onClick={handleLogout}>
            <i className="fas fa-power-off"> </i>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
