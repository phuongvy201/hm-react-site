import React from "react";
import "../../../assets/css/ordersuccess.css";

export default function OrderSuccess() {
  const token = localStorage.getItem("token");
  return (
    <div className="container">
      <div className="container-ordersuccess">
        <i className="fas fa-check-circle icon"></i>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>

        {token == null ? (
          <p>
            If you register an account, you will get a 10% discount on your next
            order.
          </p>
        ) : (
          ""
        )}

        <a href="/">Back to Home</a>

        {token == null ? <a href="/signup">Register an Account</a> : ""}
      </div>
    </div>
  );
}
