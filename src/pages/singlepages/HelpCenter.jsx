import React from "react";

export default function HelpCenter() {
  return (
    <div style={{ padding: "50px 0", backgroundColor: "#f8f9fa" }}>
      <h2
        style={{ textAlign: "center", marginBottom: "30px", color: "#343a40" }}
      >
        FAQs
      </h2>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                transition: "transform 0.2s",
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div style={{ fontSize: "40px", color: "#ff6f20" }}>🔄</div>
              <h5>Change/cancel orders</h5>
              <p>
                Did you make a mistake in your order? Don’t worry. You can
                modify or cancel it.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                transition: "transform 0.2s",
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div style={{ fontSize: "40px", color: "#ff6f20" }}>🔙</div>
              <h5>Returns & refunds</h5>
              <p>Not the right for you? We’ll fix it.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                transition: "transform 0.2s",
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div style={{ fontSize: "40px", color: "#ff6f20" }}>📦</div>
              <h5>Track order</h5>
              <p>Where is my orders? Find your order here!</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                transition: "transform 0.2s",
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div style={{ fontSize: "40px", color: "#ff6f20" }}>ℹ️</div>
              <h5>Product information</h5>
              <p>
                Find information about the products available on Printerval and
                more.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                transition: "transform 0.2s",
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div style={{ fontSize: "40px", color: "#ff6f20" }}>🔍</div>
              <h5>About Printerval</h5>
              <p>How does Printerval work? Let’s find out!</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                transition: "transform 0.2s",
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div style={{ fontSize: "40px", color: "#ff6f20" }}>👤</div>
              <h5>Setting up an Artist Account</h5>
              <p>Guide you step by step in creating your seller account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
