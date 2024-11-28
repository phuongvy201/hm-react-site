import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileSidebar from "../../../../components/ProfileSidebar";
import orderService from "../../../../service/OrderService.js";
import { urlImage } from "../../../../config";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await orderService.getCustomerOrders();
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <ProfileSidebar />
          <div className="col-lg-9 col-md-9 col-12">
            <div className="profile-container">
              <div className="account-container">
                <h4>My Order</h4>
                {orders.length === 0 && (
                  <>
                    <div className="account-breadcrumb">
                      <Link to="/"> Home </Link>
                      <i className="fas fa-chevron-right"> </i>
                      <span> My order </span>
                    </div>

                    <h1>No orders found</h1>
                    <hr />
                  </>
                )}
                {orders.length > 0 && (
                  <>
                    <h1>Order Review</h1>
                    <div className="order-summary mb-4">
                      {orders.map((order) => (
                        <div className="order-header">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Order #{order.id}</h5>
                            <span
                              className={`status-badge ${
                                order.status === "1"
                                  ? "status-confirmed"
                                  : "status-pending"
                              }`}
                            >
                              {order.status === "1" ? "Confirmed" : "Pending"}
                            </span>
                          </div>
                          <div className="order-date">
                            <i className="far fa-calendar-alt me-2"></i>
                            <span>
                              {new Date(order.created_at).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                          {order.order_details &&
                            order.order_details.map((detail) => (
                              <div key={detail.id} className="product-item">
                                <div className="d-flex">
                                  <img
                                    src={
                                      detail.product.image
                                        ? urlImage + detail.product.image
                                        : "default-image-url"
                                    }
                                    alt={detail.product.name}
                                    className="product-image"
                                  />
                                  <div className="product-details">
                                    <h6 className="product-name">
                                      {detail.product.name}
                                    </h6>
                                    <div className="product-variants">
                                      <span className="variant-badge">
                                        Size: {detail.attributes.size}
                                      </span>
                                      <span className="variant-badge">
                                        Color: {detail.attributes.color}
                                      </span>
                                    </div>
                                    <div className="quantity-price">
                                      <span className="quantity">
                                        ${detail.price} x{detail.quantity}
                                      </span>
                                      <span className="price">
                                        $
                                        {(
                                          detail.price * detail.quantity
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          <div className="order-footer">
                            <div className="d-flex justify-content-end">
                              <span className="total-label text-danger fw-semibold fs-5">
                                Total amount: ${order.total_amount}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
