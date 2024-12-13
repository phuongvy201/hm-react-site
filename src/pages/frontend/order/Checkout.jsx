import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { urlImage } from "../../../config";
import Toast from "sweetalert2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from "../../../config/paypal";
import httpAxios from "../../../httpAxios";
import orderService from "../../../service/OrderService";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../state/cartSlice";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, shippingCost, total, formData, totalAmount } =
    location.state || {
      cartItems: [],
      shippingCost: 0,
      total: 0,
      totalAmount: 0,
      formData: {},
    };
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [client_id, setClienttId] = useState(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [paypalError, setPaypalError] = useState(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);

  useEffect(() => {
    if (!cartItems.length) {
      navigate("/cart");
      return;
    }
  }, []);

  const getAvailableGateway = async (amount) => {
    try {
      const response = await orderService.getGateway({ amount: amount });

      if (response.data?.success) {
        const gateway = response.data.gateway;
        console.log("gateway", gateway);
        setSelectedGateway(gateway);
        setClienttId(gateway.client_id); // Sửa lại từ "setClinetId" thành "setClientId"
        return gateway;
      } else {
        const errorMessage =
          response.data?.message || "Unable to get payment gateway information";
        Toast.fire({
          icon: "error",
          title: errorMessage,
        });
        return null;
      }
    } catch (error) {
      // Log detailed error for debugging

      // Show friendly error message to the user
      const userFriendlyMessage =
        error.response?.data?.message ||
        "An unexpected error occurred while retrieving the payment gateway";
      Toast.fire({
        icon: "error",
        title: userFriendlyMessage,
      });
      return null;
    }
  };

  const saveTransaction = async (orderData) => {
    try {
      const response = await httpAxios.post("/payment-test/save-transaction", {
        gateway_id: selectedGateway.id,
        paypal_order_id: orderData.orderID,
        amount: total,
        status: "COMPLETED",
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Hàm khởi tạo PayPal khi component mount
  useEffect(() => {
    const initializePayPal = async () => {
      if (!total || total <= 0) {
        return;
      }

      try {
        // Lấy gateway mặc định khi load trang
        const gateway = await getAvailableGateway(total);
        if (gateway) {
          setPaypalLoaded(true);
        } else {
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Error occurred while initializing PayPal.",
        });
      }
    };

    initializePayPal();
  }, [total]);
  const calculateTotals = (cartItems, shippingCost) => {
    let total = 0;

    cartItems.forEach((shop) => {
      shop.items.forEach((item) => {
        total += parseFloat(item.price).toFixed(2) * item.count;
      });
    });

    // Tổng giá trị bao gồm phí vận chuyển
    const totalAmount = total + shippingCost;

    return { total, totalAmount };
  };

  // Cập nhật giá trị trong formData
  const createPurchaseUnits = (cartItems, shippingCost) => {
    const { total, totalAmount } = calculateTotals(cartItems, shippingCost);

    // Đảm bảo trả về cấu trúc yêu cầu đúng của PayPal
    return [
      {
        amount: {
          currency_code: "USD",
          value: totalAmount.toFixed(2), // Tổng giá trị đơn hàng bao gồm cả phí vận chuyển
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: total.toFixed(2), // Tổng giá trị của các sản phẩm (không bao gồm phí vận chuyển)
            },
            shipping: {
              currency_code: "USD",
              value: shippingCost.toFixed(2), // Phí vận chuyển
            },
          },
        },
        items: cartItems.flatMap((shop, shopIndex) =>
          shop.items.map((item, itemIndex) => ({
            name: `product - Position ${shopIndex + 1}-${itemIndex + 1}`, // Ghi "product - vị trí"
            unit_amount: {
              currency_code: "USD",
              value: parseFloat(item.price).toFixed(2), // Giá sản phẩm
            },
            quantity: item.count, // Số lượng sản phẩm
          }))
        ),
      },
    ];
  };

  const saveTransactionData = async (data) => {
    const transactionResult = await saveTransaction(data);
    if (!transactionResult.success) {
      throw new Error("Unable to save transaction information");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-12 col-lg-6">
          <h4>Billing information</h4>
          <div className="billing-form-row  mt-3">
            <div className="billing-form-group">
              <input
                type="text"
                placeholder="First name"
                name="firstName"
                disabled
                required
                value={formData.firstName}
              />
            </div>
            <div className="billing-form-group">
              <input
                type="text"
                disabled
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
              />
            </div>
          </div>
          <div className="billing-form-group">
            <input
              type="text"
              disabled
              placeholder="Phone (required)"
              name="phone"
              value={formData.phone}
            />
          </div>
          <div className="billing-form-group">
            <input
              type="text"
              disabled
              placeholder="Email (required)"
              name="email"
              value={formData.email}
            />
          </div>
          <div className="shipping-address">
            <h4>Shipping Address</h4>
            <form>
              <div className="billing-form-row"></div>
              <div className="container-country">
                <div className="header-country">
                  <div>
                    <div className="title-country">Country / Region</div>
                  </div>
                </div>
                <div className="select-container-country">
                  <select value={formData.country} disabled>
                    <option value="afghanistan">Afghanistan</option>
                    <option value="albania">Albania</option>
                    <option value="algeria">Algeria</option>
                    <option value="american-samoa">American Samoa</option>
                    <option value="andorra">Andorra</option>
                    <option value="angola">Angola</option>
                    <option value="anguilla">Anguilla</option>
                    <option value="antarctica">Antarctica</option>
                  </select>
                </div>
              </div>
              <div className="billing-form-group mt-3">
                <input
                  disabled
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  name="address"
                  value={formData.address}
                />
              </div>
              <div className="billing-form-row">
                <div className="billing-form-group">
                  <input
                    disabled
                    placeholder="City / Suburb"
                    type="text"
                    name="city"
                    value={formData.city}
                  />
                </div>
              </div>
              <div className="billing-form-group mt-2">
                <input
                  disabled
                  type="text"
                  placeholder="ZIP / Postal code"
                  name="zipCode"
                  value={formData.zipCode}
                />
              </div>
              <div className="billing-form-group mt-2">
                <input
                  disabled
                  type="text"
                  placeholder="Order notes (optional)"
                  name="shippingNotes"
                  value={formData.shippingNotes}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-6">
          <div className="order-summary">
            <h1>Order Review</h1>
            {cartItems.map((seller) => (
              <div key={seller.sellerId} className="order-seller ">
                <p className="shop-name ">
                  <i
                    style={{ color: "#C0C0C0" }}
                    className="fas fa-store me-2 mt-3"
                  ></i>
                  {seller.shopName}
                </p>
                {seller.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img
                      src={urlImage + item.image}
                      alt={item.name}
                      className="order-item-image ms-2"
                    />
                    <div className="product-details">
                      <h2>{item.name}</h2>
                      {item.size && <p>Size: {item.size}</p>}
                      {item.color && <p>Color: {item.color}</p>}
                      <div className="d-flex">
                        <div className="me-auto">
                          <div className="pricing-info">
                            <div className="discounted-price">
                              ${parseFloat(item.price).toFixed(2)} ×{" "}
                              {item.count}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div>
            <div
              className="shipping-option selected mt-3"
              data-toggle="collapse"
              data-target="#option1"
            >
              <div className="icon">
                <i className="fas fa-truck" />
              </div>
              <div className="info">
                <div className="title">
                  Standard shipping{" "}
                  <i className="fas fa-info-circle icon-info" />
                </div>
                <div className="details">
                  11 - 30 business days with tracking
                  <br />
                  <i className="fas fa-check check" /> Tracking number
                </div>
              </div>
              <div className="price">${parseInt(shippingCost).toFixed(2)}</div>
            </div>
          </div>
          <div className="order-summary mt-3">
            <h2>Order Summary</h2>
            <div className="promo-code">
              <img
                src="https://storage.googleapis.com/a1aa/image/IetME7eXfsIHeTh2ErInNRfTrdJcVLhnwTxF2M2XQqRBY2hdC.jpg"
                alt="Promotion code icon"
              />
              <span>Use promotion code</span>
            </div>
            <div className="details">
              <div>
                <span>Subtotal:</span>
                <span className="value">${parseFloat(total).toFixed(2)}</span>
              </div>
              <div>
                <span>Shipping fee:</span>
                <span className="value">
                  + ${parseFloat(shippingCost).toFixed(2)}
                </span>
              </div>

              <div>
                <span>Total:</span>
                <span className="total">
                  ${parseFloat(totalAmount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="container-checkout">
            <div className="payment-methods">Payment Methods</div>

            {paypalLoaded ? (
              <PayPalScriptProvider
                options={{
                  "client-id": client_id || PAYPAL_CLIENT_ID,
                  currency: "USD",
                  intent: "capture",
                }}
                onError={(err) => {
                  setPaypalError(err);
                  Toast.fire({
                    icon: "error",
                    title: "Failed to load PayPal. Please try again.",
                  });
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  disabled={isProcessing}
                  forceReRender={[total, totalAmount, shippingCost]}
                  createOrder={async (data, actions) => {
                    try {
                      if (!selectedGateway) {
                        throw new Error("Payment gateway not initialized");
                      }

                      const purchase_units = createPurchaseUnits(
                        cartItems,
                        shippingCost
                      );

                      return actions.order.create({
                        purchase_units,
                      });
                    } catch (error) {
                      Toast.fire({
                        icon: "error",
                        title: error.message || "Unable to create order",
                      });
                      throw error;
                    }
                  }}
                  onApprove={async (data, actions) => {
                    try {
                      setIsProcessing(true);
                      await actions.order.capture();

                      if (!selectedGateway) {
                        throw new Error(
                          "Payment gateway information not found"
                        );
                      }

                      // Lưu giao dịch
                      await saveTransactionData(data);

                      // Tạo order và shipping cùng lúc
                      const createOrderData = async () => {
                        try {
                          // Phân nhóm các sản phẩm theo sellerId
                          const groupedItems = cartItems.reduce(
                            (acc, seller) => {
                              acc[seller.sellerId] = seller.items.map(
                                (item) => ({
                                  id: item.id,
                                  count: item.count,
                                  price: parseFloat(item.price) || 0,
                                  color: item.color || null,
                                  size: item.size || null,
                                })
                              );
                              return acc;
                            },
                            {}
                          );

                          // Tạo đơn hàng cho từng người bán
                          const orderResponses = await Promise.all(
                            Object.entries(groupedItems).map(
                              async ([sellerId, sellerItems]) => {
                                // Tính tổng số tiền cho từng seller
                                const sellerTotal = sellerItems.reduce(
                                  (total, item) =>
                                    total +
                                    (item.count * parseFloat(item.price) || 0),
                                  0
                                );

                                // Chuẩn bị dữ liệu cho đơn hàng
                                const orderData = {
                                  seller_id: parseInt(sellerId), // Chuyển sellerId thành số
                                  customer_id: token ? user.id : null, // ID khách hàng, dùng null nếu không đăng nhập
                                  total_amount: sellerTotal, // Tổng số tiền cho seller
                                  order_details: sellerItems.map((item) => ({
                                    product_id: item.id, // ID sản phẩm
                                    quantity: item.count, // Số lượng
                                    price: parseFloat(item.price) || 0, // Giá của từng sản phẩm
                                    attributes: {
                                      color: item.color || null, // Thuộc tính màu sắcp
                                      size: item.size || null, // Thuộc tính kích thước
                                    },
                                  })),
                                  shipping: {
                                    shipping_method: "standard", // Phương thức giao hàng
                                    first_name: formData.firstName,
                                    last_name: formData.lastName,
                                    phone: formData.phone,
                                    email: formData.email,
                                    address: formData.address,
                                    country: formData.country,
                                    city: formData.city,
                                    zip_code: formData.zipCode,
                                    shipping_cost: shippingCost, // Chi phí vận chuyển
                                    shipping_notes:
                                      formData.shippingNotes || "", // Ghi chú vận chuyển (nếu có)
                                  },
                                };

                                // Gửi yêu cầu tạo đơn hàng
                                const orderResponse =
                                  await orderService.createOrder(orderData);

                                // Kiểm tra phản hồi từ server
                                if (!orderResponse.data.success) {
                                  throw new Error(
                                    `Không thể tạo đơn hàng cho người bán ${sellerId}: ${orderResponse.data.message}`
                                  );
                                }

                                return orderResponse.data.order;
                              }
                            )
                          );

                          return orderResponses;
                        } catch (error) {
                          throw error;
                        }
                      };

                      // Tích hợp trực tiếp trong PayPalButtons
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        disabled={isProcessing}
                        forceReRender={[total, totalAmount, shippingCost]}
                        createOrder={async (data, actions) => {
                          try {
                            if (!selectedGateway) {
                              throw new Error(
                                "Payment gateway not initialized"
                              );
                            }

                            const purchase_units = createPurchaseUnits(
                              total,
                              totalAmount,
                              shippingCost,
                              cartItems
                            );

                            return actions.order.create({
                              purchase_units,
                            });
                          } catch (error) {
                            Toast.fire({
                              icon: "error",
                              title: error.message || "Unable to create order",
                            });
                            throw error;
                          }
                        }}
                        onApprove={async (data, actions) => {
                          try {
                            setIsProcessing(true);
                            await actions.order.capture();

                            if (!selectedGateway) {
                              throw new Error(
                                "Payment gateway information not found"
                              );
                            }

                            // Lưu giao dịch
                            await saveTransactionData(data);

                            // Tạo order và shipping cùng lúc
                            await createOrderData();

                            // Hiển thị thông báo thành công
                            setPaymentSuccess(true);
                            Toast.fire({
                              icon: "success",
                              title: "Order placed successfully!",
                            });

                            // Chuyển hướng về trang chủ
                            dispatch(clearCart());
                            setTimeout(() => {
                              navigate("/thank-you");
                            }, 1500);
                          } catch (error) {
                            Toast.fire({
                              icon: "error",
                              title:
                                error.message ||
                                "Error occurred while processing the order",
                            });
                          } finally {
                            setIsProcessing(false);
                          }
                        }}
                        onCancel={() => {
                          Toast.fire({
                            icon: "warning",
                            title: "Payment has been cancelled",
                          });
                        }}
                        onError={(err) => {
                          Toast.fire({
                            icon: "error",
                            title: "An error occurred during payment",
                          });
                        }}
                      />;

                      // Tích hợp trực tiếp trong PayPalButtons

                      await createOrderData();
                      setPaymentSuccess(true);
                      Toast.fire({
                        icon: "success",
                        title: "Order placed successfully!",
                      });

                      // Chuyển hướng về trang chủ
                      dispatch(clearCart());
                      setTimeout(() => {
                        navigate("/thank-you");
                      }, 1500);
                    } catch (error) {
                      Toast.fire({
                        icon: "error",
                        title:
                          error.message ||
                          "Error occurred while processing the order",
                      });
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  onCancel={() => {
                    Toast.fire({
                      icon: "warning",
                      title: "Payment has been cancelled",
                    });
                  }}
                  onError={(err) => {
                    Toast.fire({
                      icon: "error",
                      title: "An error occurred during payment",
                    });
                  }}
                />
              </PayPalScriptProvider>
            ) : (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading PayPal...</span>
                </div>
              </div>
            )}

            {paypalError && (
              <div className="alert alert-danger mt-3">
                Failed to load PayPal. Please refresh the page and try again.
              </div>
            )}
            {paymentSuccess && (
              <div className="alert alert-success mt-3">
                Payment successful! Your order is being processed.
              </div>
            )}
            <div className="support">
              Having trouble?
              <Link to="#">Submit a ticket</Link>
              and we will get back to you!
            </div>
            <div className="trust-icons">
              <img
                alt="Verified Business by TrustLock"
                height={30}
                src="https://storage.googleapis.com/a1aa/image/jC2iUfWteAl3lE7C7bpEGfcOO1yrlkav2nnLHU9d0fDTe2hdC.jpg"
                width={50}
              />
              <img
                alt="Verified Safe Privacy by TrustLock"
                height={30}
                src="https://storage.googleapis.com/a1aa/image/GvYVcrK1oIaQM1uarpUCEr7P0jVIik6PS017fkuXKt40bH2JA.jpg"
                width={50}
              />
              <img
                alt="Verified SSL Secure by TrustLock"
                height={30}
                src="https://storage.googleapis.com/a1aa/image/QLoJd8HW1tavGFwiNTTYCaVAhDp6fjHhonmRelSgXk8fudYnA.jpg"
                width={50}
              />
              <img
                alt="Secure Payments by PayPal"
                height={30}
                src="https://storage.googleapis.com/a1aa/image/JXCFToJVGt6AFpZoWGULsGmbOve3Z5nYDekbHY2cdB0d3OsTA.jpg"
                width={50}
              />
              <img
                alt="Secure Payments by Stripe"
                height={30}
                src="https://storage.googleapis.com/a1aa/image/5t4PdwDaDBLPGxlhMLhgJmmZjXwAxysKdZxa1fCosI11bH2JA.jpg"
                width={50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
