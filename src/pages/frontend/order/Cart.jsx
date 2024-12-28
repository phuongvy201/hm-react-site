import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlImage } from "../../../config";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "../../../state/cartSlice";
import orderService from "../../../service/OrderService";

export default function Cart() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    shippingNotes: "",
    internalNotes: "",
  });
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store, kiểm tra nếu cartItems là mảng hợp lệ, nếu không, sử dụng mảng trống
  var cartItems = useSelector((state) => state.cart.sellers);

  // Kiểm tra nếu cartItems là một mảng hợp lệ, nếu không, sử dụng mảng trống
  cartItems = Array.isArray(cartItems) ? cartItems : [];
  console.log("1", cartItems);

  const total = cartItems.reduce((totalPrice, sellerGroup) => {
    return (
      totalPrice +
      sellerGroup.items.reduce((price, item) => {
        return price + item.count * item.price;
      }, 0)
    );
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [shippingCost, setShippingCost] = useState(0);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    if (!isFormValid()) {
      e.preventDefault();
      Toast.fire({
        icon: "error",
        title: "Please fill in the order information before checking out!",
      });
      return;
    }

    navigate("/checkout", {
      state: {
        cartItems, // Truyền giỏ hàng
        shippingCost, // Phí vận chuyển
        total: total,
        totalAmount: total + shippingCost, // Tính tổng tiền
        formData: formData,
      },
    });
  };
  useEffect(() => {
    if (cartItems.length > 0) {
      // Tạo mảng items từ cartItems để gửi đến API
      const items = cartItems.flatMap((cartItem) =>
        cartItem.items.map((item) => ({
          category_id: item.category_id, // Lấy category_id của item trong mảng items
          quantity: item.count, // Lấy số lượng của item
        }))
      );

      // Gọi API để tính phí vận chuyển\
      console.log("123", items);
      orderService
        .calculateShippingCost({ items })
        .then((response) => {
          if (response.data.success) {
            // Kiểm tra tổng giá trị và cập nhật phí vận chuyển
            if (total > 100) {
              setShippingCost(0); // Miễn phí vận chuyển
            } else {
              setShippingCost(response.data.shipping_cost); // Cập nhật phí vận chuyển từ API
            }
          } else {
            setShippingCost(0); // Nếu API trả về success=false, đặt phí vận chuyển là 0
          }
        })
        .catch((error) => {
          console.error("Error calculating shipping cost:", error); // Xử lý lỗi
          setShippingCost(0); // Nếu lỗi, đặt phí vận chuyển là 0
        });
    } else {
      setShippingCost(0); // Không có item => phí vận chuyển là 0
    }
  }, [cartItems]); // Chạy lại effect khi cartItems thay đổi
  // Chạy lại effect khi cartItems thay đổi

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.phone &&
      formData.email &&
      formData.country &&
      formData.city &&
      formData.zipCode
    );
  };
  return (
    <div className="container">
      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-shopping-cart fa-4x mb-3 text-muted"></i>
          <h3>Your Cart is Empty</h3>
          <p className="text-muted">
            Add some items to your cart to get started
          </p>
          <Link to="/" className="btn btn-info text-white mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-12 col-md-12 col-lg-8">
            <div className="table-responsive mt-3 cart-pc">
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((seller) => (
                    <React.Fragment key={seller.sellerId}>
                      <tr>
                        <td colSpan={4}>
                          <p>
                            <i
                              style={{ color: "#C0C0C0" }}
                              className="fas fa-store me-2 mt-3"
                            ></i>
                            {seller.shopName}
                          </p>
                        </td>
                      </tr>
                      {seller.items.map((item) => (
                        <React.Fragment key={item.id}>
                          <tr>
                            <td>
                              <div className="d-flex">
                                <img
                                  alt={item.name}
                                  className="me-3 img-item"
                                  height={100}
                                  src={
                                    item.image instanceof File
                                      ? URL.createObjectURL(item.image)
                                      : item.image?.startsWith("http")
                                      ? item.image
                                      : urlImage + item.image
                                  }
                                  width={100}
                                />
                                <div>
                                  <div className="item-title">
                                    <Link to="#">{item.name}</Link>
                                  </div>
                                  <div>
                                    {item.size ? "Size: " + item.size : ""}
                                  </div>
                                  <div>
                                    {item.color ? "Color: " + item.color : ""}
                                  </div>
                                  <div>
                                    {item.type ? "Type: " + item.type : ""}
                                  </div>
                                  <div className="mt-2">
                                    <Link
                                      className="remove-item-cart text-danger"
                                      to="#"
                                      onClick={() =>
                                        dispatch(
                                          removeFromCart({
                                            id: item.id,
                                            color: item.color,
                                            size: item.size,
                                            type: item.type,
                                            sellerId: item.seller_id,
                                          })
                                        )
                                      }
                                    >
                                      <i className="fas fa-trash me-2"></i>
                                      Remove
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <div className="price">
                                ${parseFloat(item.price).toFixed(2)}
                              </div>
                            </td>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <div
                                  className="d-flex border border-secondary rounded"
                                  style={{ width: 150 }}
                                >
                                  <button
                                    id="decrement"
                                    className="d-flex justify-content-center align-items-center"
                                    onClick={() =>
                                      dispatch(
                                        decreaseCount({
                                          id: item.id,
                                          color: item.color,
                                          size: item.size,
                                          type: item.type,
                                          sellerId: item.seller_id,
                                        })
                                      )
                                    }
                                    style={{
                                      width: 50,
                                      height: 40,
                                      border: "none",
                                      background: "none",
                                      cursor: "pointer",
                                    }}
                                  >
                                    -
                                  </button>
                                  <div
                                    id="count"
                                    className="d-flex justify-content-center align-items-center border-start border-end border-secondary"
                                    style={{ width: 50, height: 40 }}
                                  >
                                    {item.count}
                                  </div>
                                  <button
                                    id="increment"
                                    className="d-flex justify-content-center align-items-center"
                                    onClick={() =>
                                      dispatch(
                                        increaseCount({
                                          id: item.id,
                                          color: item.color,
                                          size: item.size,
                                          type: item.type,
                                          sellerId: item.seller_id,
                                        })
                                      )
                                    }
                                    style={{
                                      width: 50,
                                      height: 40,
                                      border: "none",
                                      background: "none",
                                      cursor: "pointer",
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="subtotal align-middle">
                              ${parseFloat(item.price * item.count).toFixed(2)}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row cart-mobile d-block d-lg-none d-md-none">
              {cartItems.map((seller) => (
                <React.Fragment key={seller.sellerId}>
                  <div className="shop-name">
                    <p>
                      <i
                        style={{ color: "#C0C0C0" }}
                        className="fas fa-store me-2 mt-3"
                      ></i>
                      {seller.shopName}
                    </p>
                  </div>
                  {seller.items.map((item) => (
                    <div className="order-item" key={item.id}>
                      <img
                        src={
                          item.image instanceof File
                            ? URL.createObjectURL(item.image)
                            : item.image?.startsWith("http")
                            ? item.image
                            : urlImage + item.image
                        }
                        alt={item.name}
                      />
                      <div className="product-details">
                        <h2>{item.name}</h2>
                        <p>
                          <span>{item.size ? `Size: ${item.size}` : ""}</span>
                          <span className="mx-2">
                            {item.color ? `Color: ${item.color}` : ""}
                          </span>
                          <span className="mx-2">
                            {item.type ? `Type: ${item.type}` : ""}
                          </span>
                        </p>

                        <div className="product-actions">
                          <div className="pricing-info text-success me-3">
                            ${parseFloat(item.price).toFixed(2)}
                          </div>
                          <Link
                            className="remove-item-cart text-danger"
                            to="#"
                            onClick={() =>
                              dispatch(
                                removeFromCart({
                                  id: item.id,
                                  color: item.color,
                                  size: item.size,
                                  type: item.type,
                                  sellerId: item.seller_id,
                                })
                              )
                            }
                          >
                            <i className="fas fa-trash me-2"></i>
                            Remove
                          </Link>
                        </div>
                        <div className="d-flex  align-items-center my-2">
                          <div className="d-flex border border-secondary rounded-3">
                            <button
                              onClick={() =>
                                dispatch(
                                  decreaseCount({
                                    id: item.id,
                                    color: item.color,
                                    size: item.size,
                                    type: item.type,
                                    sellerId: item.seller_id,
                                  })
                                )
                              }
                              min={1}
                              id="decrement"
                              className="btn  d-flex justify-content-center align-items-center"
                              style={{ width: 30, height: 30 }}
                            >
                              -
                            </button>
                            <div
                              id="counter-value"
                              className="d-flex justify-content-center align-items-center "
                              style={{ width: 30, height: 30 }}
                            >
                              {item.count}
                            </div>
                            <button
                              onClick={() =>
                                dispatch(
                                  increaseCount({
                                    id: item.id,
                                    color: item.color,
                                    size: item.size,
                                    type: item.type,
                                    sellerId: item.seller_id,
                                  })
                                )
                              }
                              id="increment"
                              className="btn  d-flex justify-content-center align-items-center"
                              style={{ width: 30, height: 30 }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="product-actions">
                          <div className="pricing-info fw-bold text-danger me-3">
                            ${parseFloat(item.price * item.count).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>

            <div className=" col-12 col-md-12 col-lg-8 mt-5">
              <h4>Billing information</h4>
              <div className="billing-form-row  mt-3">
                <div className="billing-form-group">
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="billing-form-group">
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="billing-form-group">
                <input
                  type="text"
                  placeholder="Phone (required)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="billing-form-group">
                <input
                  type="text"
                  placeholder="Email (required)"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                      <select
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                      >
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
                        <option value="equatorial-guinea">
                          Equatorial Guinea
                        </option>
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
                        <option value="marshall-islands">
                          Marshall Islands
                        </option>
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
                        <option value="papua-new-guinea">
                          Papua New Guinea
                        </option>
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
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="billing-form-group mt-2">
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="billing-form-group mt-2">
                    <input
                      type="text"
                      placeholder="ZIP / Postal code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="billing-form-group mt-2">
                    <input
                      type="text"
                      placeholder="Order notes (optional)"
                      name="shippingNotes"
                      value={formData.shippingNotes}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-4">
            <div className="checkout-summary-card">
              <div className="row mb-3">
                <div className="col-6">Subtotal</div>
                <div className="col-6 text-end">${(total || 0).toFixed(2)}</div>
              </div>
              <div className="row mb-3">
                <div className="col-6">Shipping fee</div>
                <div className="col-6 text-end">${shippingCost.toFixed(2)}</div>
              </div>
              <div className="row mb-3">
                <div className="col-6">Total</div>
                <div className="col-6 text-end checkout-total">
                  {parseFloat(total + shippingCost).toFixed(2)}
                </div>
              </div>

              <button
                className="checkout-button btn btn-danger text-white"
                onClick={handleCheckout}
              >
                <i className="fas fa-shopping-bag" />
                <span className="ms-2">CHECKOUT</span>
              </button>
              <div className="checkout-payment-icons text-center">
                <Link to="#">
                  <img
                    alt="American Express logo"
                    height={20}
                    src="https://storage.googleapis.com/a1aa/image/mfYgZJAQRerIWkC2eKoeZXBeKvGC56YgAfzHZ8IlfzLacwF2JA.jpg"
                    width={30}
                  />
                </Link>
                <Link to="#">
                  <img
                    alt="Visa logo"
                    height={30}
                    src="https://storage.googleapis.com/a1aa/image/uOImmEpPZkoXM9got7f7qx0gmNIgK2j8B3ftFaSrfrVDCXYnA.jpg"
                    width={50}
                  />
                </Link>
                <Link to="#">
                  <img
                    alt="Mastercard logo"
                    height={30}
                    src="https://storage.googleapis.com/a1aa/image/heOgXhZewNptiUxT0W6cy5v1ZUe7t2JzH7fLnTkiXXJyDuwOB.jpg"
                    width={50}
                  />
                </Link>
                <Link to="#">
                  <img
                    alt="Afterpay logo"
                    height={30}
                    src="https://storage.googleapis.com/a1aa/image/9XSe7XWfw0oiFkAPovs3LSSkzifCeDP5oNoPFuVWSQacDuwOB.jpg"
                    width={50}
                  />
                </Link>
                <Link to="#">
                  <img
                    alt="PayPal logo"
                    height={30}
                    src="https://storage.googleapis.com/a1aa/image/gJwdMIGfAHXbQCgjrbHnTptweKyy119o2LidBFHN2kH5gLsTA.jpg"
                    width={50}
                  />
                </Link>
                <Link to="#">
                  <img
                    alt="Apple Pay logo"
                    height={30}
                    src="https://storage.googleapis.com/a1aa/image/lGz3rfJF5VQAOyr3qkwRzOEsWfhBY36ykQ5qsVUke8S2BXYnA.jpg"
                    width={50}
                  />
                </Link>
              </div>
              {/* <div className="text-center mt-3">
                <div className="fw-medium">
                  Our customers are saying:
                  <span className="checkout-rating">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star-half-alt" />
                  </span>
                </div>
                <div className="checkout-google-reviews">
                  4.1 out of 5 based on 27504 reviews
                  <i className="fab fa-google" />
                  <br />
                  Google Customer Reviews
                </div>
              </div> */}
              <div className="text-center mt-3">
                <div className="checkout-guarantee">
                  <i className="fas fa-certificate" />
                  Spend $100 or more to enjoy free shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
