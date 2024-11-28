import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("Token hiện tại:", token);

      if (token) {
        try {
          console.log("Đang gửi request verify token...");
          const response = await fetch('/api/verify-token', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          console.log("Status response:", response.status);
          
          if (response.status === 401) {
            console.log("Token không hợp lệ - Logout");
            logout();
          } else {
            const userData = localStorage.getItem("user");
            console.log("User data từ localStorage:", userData);
            if (userData) {
              setUser(JSON.parse(userData));
              setIsAuthenticated(true);
            }
          }
        } catch (error) {
          console.error('Chi tiết lỗi xác thực:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }

  const checkIsLoggedIn = () => {
    if (!context.isAuthenticated || !context.user) {
      throw new Error("Người dùng chưa đăng nhập");
    }
    return true;
  };

  return {
    ...context,
    checkIsLoggedIn,
  };
};
