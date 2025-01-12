import React from "react";
import { Link } from "react-router-dom";

const TrackOrder = () => {
  return (
    <div className="track-order-container">
      <img
        className="delivery-image"
        alt="Cartoon delivery person with a scooter and a package"
        src="https://cdn.printerval.com/unsafe/630x0/printerval.com/modules/cart/images/track-order.png"
        style={{ width: "50%", height: "auto" }}
      />
      <div className="track-order-form">
        <h2>TRACK YOUR ORDER</h2>
        <p>
          To track your order please enter your Order Code and email in the box
          below and press the Track button
        </p>
        <div className="row">
          <div className="col-md-6">
            <input
              aria-label="Billing Email"
              className="form-control"
              placeholder="Enter the email used to place the order"
              type="email"
            />
          </div>
          <div className="col-md-6">
            <input
              aria-label="Order Code"
              className="form-control"
              placeholder="Enter your Order code"
              type="text"
            />
            <span className="order-code-help">Where do I find this?</span>
          </div>
        </div>
        <button className="btn btn-track mt-3">TRACK</button>
        <a className="support-ticket" href="#">
          Open A Support Ticket
        </a>
      </div>
    </div>
  );
};

export default TrackOrder;
