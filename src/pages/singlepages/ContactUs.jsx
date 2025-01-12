import React from "react";
import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Contact Us</h2>
      <div className="row mt-4 ">
        <div className="col-md-6 align-self-center">
          <div className="contact-info">
            <p>
              <strong>Email:</strong>{" "}
              <Link
                style={{ color: "#ff0000" }}
                className="text-decoration-none"
                to="mailto:admin@bluprinter.com"
              >
                admin@bluprinter.com
              </Link>
            </p>
            <p>
              <strong>Call us:</strong> + 18563782798
            </p>
            <p>
              <strong>iMessage:</strong> + 18563782798
            </p>
            <p>
              <strong>WhatsApp:</strong>{" "}
              <Link
                style={{ color: "#ff0000" }}
                className="text-decoration-none"
                to="https://wa.me/84986750611"
              >
                + 18563782798
              </Link>
            </p>
            <p>
              <Link
                style={{ color: "#ff0000" }}
                className="text-decoration-none"
                to=""
              >
                <strong>Office Address:</strong> 24 Thanh Xuan 14 Street, Thanh
                Xuan Ward, District 12, Ho Chi Minh City, Vietnam
              </Link>
            </p>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="https://printerval.com/assets/images/contact-us.svg?v=31102023"
            alt="Contact Illustration"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}
