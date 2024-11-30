import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { urlImage } from "../../../config";
import Toast from "sweetalert2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from "../../../config/paypal";
import httpAxios from "../../../httpAxios";
import cartService from "../../../service/CartService";
import { useCart } from "../../../context/CartContext";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateCartCount } = useCart();
  const { cartItems, subtotal, shippingCost, total, formData } =
    location.state || {
      cartItems: [],
      subtotal: 0,
      shippingCost: 0,
      total: 0,
      formData: {},
    };
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [client_id, setClienttId] = useState(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [paypalError, setPaypalError] = useState(null);

  useEffect(() => {
    // Check if cart is empty, redirect to cart page
    if (!cartItems.length) {
      navigate("/cart");
      return;
    }
  }, []);

  const getAvailableGateway = async (amount) => {
    try {
      const response = await httpAxios.post("/payment-test/get-gateway", {
        amount: amount,
      });

      if (response.data?.success) {
        const gateway = response.data.gateway;
        setSelectedGateway(gateway);
        setClienttId(gateway.client_id); // Sửa lại từ "setClinetId" thành "setClientId"
        return gateway;
      } else {
        const errorMessage =
          response.data?.message || "Unable to get payment gateway information";
        console.warn("Gateway API returned failure:", response.data);
        Toast.fire({
          icon: "error",
          title: errorMessage,
        });
        return null;
      }
    } catch (error) {
      // Log detailed error for debugging
      console.error("Error occurred while fetching gateway:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });

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
      console.error("Save Transaction Error:", error);
      throw error;
    }
  };

  // Hàm chuyển đổi giá trị sang số
  const formatPrice = (price) => {
    return parseFloat(price || 0).toFixed(2);
  };

  // Hàm khởi tạo PayPal khi component mount
  useEffect(() => {
    const initializePayPal = async () => {
      if (!total || total <= 0) {
        console.warn(
          "Total amount is invalid, skipping PayPal initialization."
        );
        return;
      }

      try {
        // Lấy gateway mặc định khi load trang
        const gateway = await getAvailableGateway(total);
        if (gateway) {
          setPaypalLoaded(true);
          console.log("PayPal initialized successfully with gateway:", gateway);
        } else {
          console.warn("Failed to initialize PayPal. Gateway not found.");
        }
      } catch (error) {
        console.error("PayPal initialization error:", error);
        Toast.fire({
          icon: "error",
          title: "Error occurred while initializing PayPal.",
        });
      }
    };

    initializePayPal();
  }, [total]);

  // Cập nhật giá trị trong formData
  const createPurchaseUnits = (total, subtotal, shippingCost, cartItems) => {
    return [
      {
        amount: {
          value: formatPrice(total),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: formatPrice(subtotal),
            },
            shipping: {
              currency_code: "USD",
              value: formatPrice(shippingCost),
            },
          },
        },
        items: cartItems.map((item, index) => ({
          name: `Product ${index + 1}`,
          unit_amount: {
            currency_code: "USD",
            value: formatPrice(item.product.sale_price),
          },
          quantity: item.quantity,
        })),
      },
    ];
  };
  const createOrderData = async (cartItems, total, formData, shippingCost) => {
    const orderData = {
      seller_id: cartItems[0]?.seller_id,
      total_amount: total,
      order_details: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.sale_price,
        attributes: {
          color: item.attributes.color,
          size: item.attributes.size,
        },
      })),
      shipping: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip_code: formData.zipCode,
        shipping_cost: shippingCost,
        shipping_method: "standard",
        country: formData.country,
        notes: formData.shippingNotes,
      },
    };

    const orderResponse = await httpAxios.post("/orders", orderData);
    if (!orderResponse.data.success) {
      throw new Error("Unable to create order");
    }

    return orderResponse.data;
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
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <img
                  src={urlImage + item.product.image}
                  alt={item.product.name}
                />
                <div className="product-details">
                  <h2>{item.product.name}</h2>
                  <p>Size: {item.attributes.size}</p>
                  <p>Color: {item.attributes.color}</p>

                  <div className="d-flex ">
                    <div className="me-auto">
                      <div className="pricing-info">
                        <div className="discounted-price">
                          ${item.product.sale_price} × {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
              <div className="price">${shippingCost.toFixed(2)}</div>
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
                <span className="value">${subtotal.toFixed(2)}</span>
              </div>
              <div>
                <span>Shipping fee:</span>
                <span className="value">+${shippingCost.toFixed(2)}</span>
              </div>

              <div>
                <span>Total:</span>
                <span className="total">${total.toFixed(2)}</span>
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
                  console.error("PayPal Script Error:", err);
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
                  forceReRender={[total, subtotal, shippingCost]}
                  createOrder={async (data, actions) => {
                    try {
                      if (!selectedGateway) {
                        throw new Error("Payment gateway not initialized");
                      }

                      const purchase_units = createPurchaseUnits(
                        total,
                        subtotal,
                        shippingCost,
                        cartItems
                      );

                      return actions.order.create({
                        purchase_units,
                      });
                    } catch (error) {
                      console.error("Create order error:", error);
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
                      const details = await actions.order.capture();
                      console.log("PayPal payment captured:", details);

                      if (!selectedGateway) {
                        throw new Error(
                          "Payment gateway information not found"
                        );
                      }

                      // 1. Lưu transaction
                      await saveTransactionData(data);

                      // 2. Tạo order và shipping cùng lúc
                      const orderData = await createOrderData(
                        cartItems,
                        total,
                        formData,
                        shippingCost
                      );
                      console.log("Order created successfully:", orderData);

                      // 3. Clear cart và update count
                      await cartService.clearCart();
                      await updateCartCount();

                      // 4. Hiển thị thông báo thành công
                      setPaymentSuccess(true);
                      Toast.fire({
                        icon: "success",
                        title: "Order placed successfully!",
                      });

                      // 5. Chuyển hướng về trang chủ
                      setTimeout(() => {
                        navigate("/");
                      }, 1500);
                    } catch (error) {
                      console.error("Process Order Error:", error);
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
                    console.error("PayPal Error:", err);
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
