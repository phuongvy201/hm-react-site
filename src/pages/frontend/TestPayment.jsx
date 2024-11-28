import React, { useState } from "react";
import axios from "axios";

const TestPayment = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTestPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost/hmfulfill/public/api/test/payment/create",
        {
          amount: parseFloat(amount),
        }
      );

      if (response.data.success) {
        // Redirect to PayPal
        const approvalLink = response.data.links.find(
          (link) => link.rel === "approve"
        );
        if (approvalLink) {
          window.location.href = approvalLink.href;
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Test Payment</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Nhập số tiền test"
        />
        <button onClick={handleTestPayment} disabled={loading}>
          {loading ? "Đang xử lý..." : "Test Thanh toán"}
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default TestPayment;
