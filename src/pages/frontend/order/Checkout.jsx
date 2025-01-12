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
        amount: total + shippingCost,
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
                    <option value="">Select a country</option>
                    <option value="afghanistan">Afghanistan</option>
                    <option value="albania">Albania</option>
                    <option value="algeria">Algeria</option>
                    <option value="american-samoa">American Samoa</option>
                    <option value="andorra">Andorra</option>
                    <option value="angola">Angola</option>
                    <option value="anguilla">Anguilla</option>
                    <option value="antarctica">Antarctica</option>
                    <option value="antigua-and-barbuda">
                      Antigua and Barbuda
                    </option>
                    <option value="argentina">Argentina</option>
                    <option value="armenia">Armenia</option>
                    <option value="australia">Australia</option>
                    <option value="austria">Austria</option>
                    <option value="azerbaijan">Azerbaijan</option>
                    <option value="bahamas">Bahamas</option>
                    <option value="bahrain">Bahrain</option>
                    <option value="bangladesh">Bangladesh</option>
                    <option value="barbados">Barbados</option>
                    <option value="belarus">Belarus</option>
                    <option value="belgium">Belgium</option>
                    <option value="belize">Belize</option>
                    <option value="benin">Benin</option>
                    <option value="bermuda">Bermuda</option>
                    <option value="bhutan">Bhutan</option>
                    <option value="bolivia">Bolivia</option>
                    <option value="bosnia-and-herzegovina">
                      Bosnia and Herzegovina
                    </option>
                    <option value="botswana">Botswana</option>
                    <option value="brazil">Brazil</option>
                    <option value="brunei">Brunei</option>
                    <option value="bulgaria">Bulgaria</option>
                    <option value="burkina-faso">Burkina Faso</option>
                    <option value="burundi">Burundi</option>
                    <option value="cabo-verde">Cabo Verde</option>
                    <option value="cambodia">Cambodia</option>
                    <option value="cameroon">Cameroon</option>
                    <option value="canada">Canada</option>
                    <option value="central-african-republic">
                      Central African Republic
                    </option>
                    <option value="chad">Chad</option>
                    <option value="chile">Chile</option>
                    <option value="china">China</option>
                    <option value="colombia">Colombia</option>
                    <option value="comoros">Comoros</option>
                    <option value="congo">Congo</option>
                    <option value="costa-rica">Costa Rica</option>
                    <option value="croatia">Croatia</option>
                    <option value="cuba">Cuba</option>
                    <option value="cyprus">Cyprus</option>
                    <option value="czech-republic">Czech Republic</option>
                    <option value="democratic-republic-of-the-congo">
                      Democratic Republic of the Congo
                    </option>
                    <option value="denmark">Denmark</option>
                    <option value="djibouti">Djibouti</option>
                    <option value="dominica">Dominica</option>
                    <option value="dominican-republic">
                      Dominican Republic
                    </option>
                    <option value="ecuador">Ecuador</option>
                    <option value="egypt">Egypt</option>
                    <option value="el-salvador">El Salvador</option>
                    <option value="equatorial-guinea">Equatorial Guinea</option>
                    <option value="eritrea">Eritrea</option>
                    <option value="estonia">Estonia</option>
                    <option value="eswatini">Eswatini</option>
                    <option value="ethiopia">Ethiopia</option>
                    <option value="fiji">Fiji</option>
                    <option value="finland">Finland</option>
                    <option value="france">France</option>
                    <option value="gabon">Gabon</option>
                    <option value="gambia">Gambia</option>
                    <option value="georgia">Georgia</option>
                    <option value="germany">Germany</option>
                    <option value="ghana">Ghana</option>
                    <option value="greece">Greece</option>
                    <option value="grenada">Grenada</option>
                    <option value="guatemala">Guatemala</option>
                    <option value="guinea">Guinea</option>
                    <option value="guinea-bissau">Guinea-Bissau</option>
                    <option value="guyana">Guyana</option>
                    <option value="haiti">Haiti</option>
                    <option value="honduras">Honduras</option>
                    <option value="hungary">Hungary</option>
                    <option value="iceland">Iceland</option>
                    <option value="india">India</option>
                    <option value="indonesia">Indonesia</option>
                    <option value="iran">Iran</option>
                    <option value="iraq">Iraq</option>
                    <option value="ireland">Ireland</option>
                    <option value="israel">Israel</option>
                    <option value="italy">Italy</option>
                    <option value="jamaica">Jamaica</option>
                    <option value="japan">Japan</option>
                    <option value="jordan">Jordan</option>
                    <option value="kazakhstan">Kazakhstan</option>
                    <option value="kenya">Kenya</option>
                    <option value="kiribati">Kiribati</option>
                    <option value="korea-north">North Korea</option>
                    <option value="korea-south">South Korea</option>
                    <option value="kosovo">Kosovo</option>
                    <option value="kuwait">Kuwait</option>
                    <option value="kyrgyzstan">Kyrgyzstan</option>
                    <option value="laos">Laos</option>
                    <option value="latvia">Latvia</option>
                    <option value="lebanon">Lebanon</option>
                    <option value="lesotho">Lesotho</option>
                    <option value="liberia">Liberia</option>
                    <option value="libya">Libya</option>
                    <option value="liechtenstein">Liechtenstein</option>
                    <option value="lithuania">Lithuania</option>
                    <option value="luxembourg">Luxembourg</option>
                    <option value="madagascar">Madagascar</option>
                    <option value="malawi">Malawi</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="maldives">Maldives</option>
                    <option value="mali">Mali</option>
                    <option value="malta">Malta</option>
                    <option value="marshall-islands">Marshall Islands</option>
                    <option value="martinique">Martinique</option>
                    <option value="mauritania">Mauritania</option>
                    <option value="mauritius">Mauritius</option>
                    <option value="mexico">Mexico</option>
                    <option value="micronesia">Micronesia</option>
                    <option value="moldova">Moldova</option>
                    <option value="monaco">Monaco</option>
                    <option value="mongolia">Mongolia</option>
                    <option value="montenegro">Montenegro</option>
                    <option value="morocco">Morocco</option>
                    <option value="mozambique">Mozambique</option>
                    <option value="myanmar">Myanmar</option>
                    <option value="namibia">Namibia</option>
                    <option value="nauru">Nauru</option>
                    <option value="nepal">Nepal</option>
                    <option value="netherlands">Netherlands</option>
                    <option value="new-zealand">New Zealand</option>
                    <option value="nicaragua">Nicaragua</option>
                    <option value="niger">Niger</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="north-macedonia">North Macedonia</option>
                    <option value="norway">Norway</option>
                    <option value="oman">Oman</option>
                    <option value="pakistan">Pakistan</option>
                    <option value="palau">Palau</option>
                    <option value="palestine">Palestine</option>
                    <option value="panama">Panama</option>
                    <option value="papua-new-guinea">Papua New Guinea</option>
                    <option value="paraguay">Paragu</option>
                    <option value="peru">Peru</option>
                    <option value="philippines">Philippines</option>
                    <option value="poland">Poland</option>
                    <option value="portugal">Portugal</option>
                    <option value="qatar">Qatar</option>
                    <option value="romania">Romania</option>
                    <option value="russia">Russia</option>
                    <option value="rwanda">Rwanda</option>
                    <option value="saint-kitts-and-nevis">
                      Saint Kitts and Nevis
                    </option>
                    <option value="saint-lucia">Saint Lucia</option>
                    <option value="saint-vincent-and-the-grenadines">
                      Saint Vincent and the Grenadines
                    </option>
                    <option value="samoa">Samoa</option>
                    <option value="san-marino">San Marino</option>
                    <option value="sao-tome-and-principe">
                      Sao Tome and Principe
                    </option>
                    <option value="saudi-arabia">Saudi Arabia</option>
                    <option value="senegal">Senegal</option>
                    <option value="serbia">Serbia</option>
                    <option value="seychelles">Seychelles</option>
                    <option value="sierra-leone">Sierra Leone</option>
                    <option value="singapore">Singapore</option>
                    <option value="slovakia">Slovakia</option>
                    <option value="slovenia">Slovenia</option>
                    <option value="solomon-islands">Solomon Islands</option>
                    <option value="somalia">Somalia</option>
                    <option value="south-africa">South Africa</option>
                    <option value="south-sudan">South Sudan</option>
                    <option value="spain">Spain</option>
                    <option value="sri-lanka">Sri Lanka</option>
                    <option value="sudan">Sudan</option>
                    <option value="suriname">Suriname</option>
                    <option value="sweden">Sweden</option>
                    <option value="switzerland">Switzerland</option>
                    <option value="syria">Syria</option>
                    <option value="taiwan">Taiwan</option>
                    <option value="tajikistan">Tajikistan</option>
                    <option value="tanzania">Tanzania</option>
                    <option value="thailand">Thailand</option>
                    <option value="togo">Togo</option>
                    <option value="tonga">Tonga</option>
                    <option value="trinidad-and-tobago">
                      Trinidad and Tobago
                    </option>
                    <option value="tunisia">Tunisia</option>
                    <option value="turkey">Turkey</option>
                    <option value="turkmenistan">Turkmenistan</option>
                    <option value="tuvalu">Tuvalu</option>
                    <option value="uganda">Uganda</option>
                    <option value="ukraine">Ukraine</option>
                    <option value="united-arab-emirates">
                      United Arab Emirates
                    </option>
                    <option value="united-kingdom">United Kingdom</option>
                    <option value="united-states">United States</option>
                    <option value="uruguay">Uruguay</option>
                    <option value="uzbekistan">Uzbekistan</option>
                    <option value="vanuatu">Vanuatu</option>
                    <option value="vatican-city">Vatican City</option>
                    <option value="venezuela">Venezuela</option>
                    <option value="vietnam">Vietnam</option>
                    <option value="yemen">Yemen</option>
                    <option value="zambia">Zambia</option>
                    <option value="zimbabwe">Zimbabwe</option>
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
                      src={
                        item.image instanceof File
                          ? URL.createObjectURL(item.image)
                          : item.image?.startsWith("http")
                          ? item.image
                          : urlImage + item.image
                      }
                      alt={item.name}
                      className="order-item-image ms-2"
                    />
                    <div className="product-details">
                      <h2>{item.name}</h2>
                      {item.size && <p>Size: {item.size}</p>}
                      {item.color && <p>Color: {item.color}</p>}
                      {item.type && <p>Type: {item.type}</p>}
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
                  5 - 7 business days with tracking
                  <br />
                  <i className="fas fa-check check" /> Tracking number
                </div>
              </div>
              <div className="price">${parseFloat(shippingCost).toFixed(2)}</div>
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
                                      color: item.color || null, // Lấy giá trị màu từ đối tượng color
                                      size: item.size || null, // Giá trị size trực tiếp
                                      type: item.type || null, // Giá trị type trực tiếp
                                    },
                                  })),
                                  shipping: {
                                    shipping_method: "standard",
                                    first_name: formData.firstName,
                                    last_name: formData.lastName,
                                    phone: formData.phone,
                                    email: formData.email,
                                    address: formData.address,
                                    country: formData.country,
                                    city: formData.city,
                                    zip_code: formData.zipCode,
                                    shipping_cost: shippingCost,
                                    shipping_notes:
                                      formData.shippingNotes || "",
                                  },
                                };

                                // Log dữ liệu trước khi gửi
                                console.log("OrderData being sent:", orderData);
                                console.log("Seller Items:", sellerItems);
                                console.log("Form Data:", formData);
                                console.log("User Info:", user);

                                try {
                                  // Gửi yêu cầu tạo đơn hàng
                                  const orderResponse =
                                    await orderService.createOrder(orderData);
                                  console.log("orderResponse", orderResponse);
                                  // Log response nếu không thành công
                                  // if (!orderResponse.data.success) {
                                  //   console.error(
                                  //     "Order creation failed:",
                                  //     orderResponse.data
                                  //   );
                                  //   throw new Error(
                                  //     `Không thể tạo đơn hàng cho người bán ${sellerId}: ${orderResponse.data.message}`
                                  //   );
                                  // }

                                  return orderResponse.data.order;
                                } catch (error) {
                                  // Log chi tiết lỗi
                                  console.error("Error creating order:", {
                                    error: error.response?.data || error,
                                    status: error.response?.status,
                                    validationErrors:
                                      error.response?.data?.errors,
                                  });
                                  throw error;
                                }
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
