import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartService from "../../../service/CartService";
import { urlImage } from "../../../config";
import { useCart } from "../../../context/CartContext";
import Swal from "sweetalert2";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);
  const { updateCartCount } = useCart();
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateSubtotal = (items) => {
    return items.reduce(
      (sum, item) => sum + item.product.sale_price * item.quantity,
      0
    );
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartService.getCart();
        setCartItems(response.data.items);
        setSubtotal(calculateSubtotal(response.data.items));
        setShippingCost(response.data.shipping_cost);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    setTotal(subtotal + shippingCost);
  }, [subtotal, shippingCost]);

  const removeFromCart = async (itemId) => {
    try {
      const response = await cartService.removeFromCart(itemId);
      if (response.data.success) {
        const updatedItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedItems);
        setSubtotal(calculateSubtotal(updatedItems));
        setShippingCost(response.data.shipping_cost);
        updateCartCount();
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity, e) => {
    if (e) e.preventDefault();
    if (newQuantity < 1) return;
    try {
      const response = await cartService.updateQuantity(itemId, newQuantity);
      if (response.data.success) {
        const updatedItems = cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        setSubtotal(calculateSubtotal(updatedItems));
        setShippingCost(response.data.shipping_cost);
        updateCartCount();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
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
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex">
                          <img
                            alt="Red hoodie with vintage fireball whiskey design"
                            className="me-3 img-item"
                            height={100}
                            src={urlImage + item.product.image}
                            width={100}
                          />
                          <div>
                            <div className="item-title">
                              <Link to="#">{item.product.name}</Link>
                            </div>
                            <div>
                              {item.attributes
                                ? "Size: " + item.attributes.size
                                : ""}
                            </div>
                            <div>
                              {item.attributes
                                ? "Color: " + item.attributes.color
                                : ""}
                            </div>
                            <div className="mt-2">
                              <Link
                                onClick={() => removeFromCart(item.id)}
                                className="remove-item-cart text-danger"
                                to="#"
                              >
                                <i className="fas fa-trash me-2 "></i>
                                Remove
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="price">$ {item.product.sale_price}</div>
                        <div className="old-price">
                          {item.product.original_price !==
                          item.product.sale_price
                            ? "$" + item.product.original_price
                            : ""}
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <div className="cart-item-quantity">
                            <div className="quantity-controls-cart">
                              <button
                                onClick={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1,
                                    e
                                  )
                                }
                              >
                                −
                              </button>
                              <input
                                type="text"
                                min={1}
                                value={item.quantity}
                                className="border-0"
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    parseInt(e.target.value) || 1,
                                    e
                                  )
                                }
                              />
                              <button
                                onClick={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1,
                                    e
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="subtotal">
                        ${item.product.sale_price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row cart-mobile d-block d-lg-none d-md-none">
              {cartItems.map((item) => (
                <div className="order-item" key={item.id}>
                  <img
                    src={urlImage + item.product.image}
                    alt={item.product.name}
                  />
                  <div className="product-details">
                    <h2>{item.product.name}</h2>
                    <p>
                      {item.attributes ? `Size: ${item.attributes.size}` : ""}
                    </p>
                    <p>
                      {item.attributes ? `Color: ${item.attributes.color}` : ""}
                    </p>
                    <div className="product-actions">
                      <Link
                        to="#"
                        className="text-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash-alt" /> Remove
                      </Link>
                    </div>
                    <div className="d-flex">
                      <div className="me-auto p-2">
                        <div className="pricing-info">
                          <div className="discounted-price">
                            ${item.product.sale_price} × {item.quantity}
                          </div>
                          {item.product.original_price !==
                            item.product.sale_price && (
                            <div className="full-price">
                              ${item.product.original_price}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="input-group">
                          <div className="cart-item-quantity">
                            <div className="quantity-controls-cart">
                              <button
                                onClick={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1,
                                    e
                                  )
                                }
                              >
                                −
                              </button>
                              <input
                                type="text"
                                min={1}
                                value={item.quantity}
                                className="border-0"
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    parseInt(e.target.value) || 1,
                                    e
                                  )
                                }
                              />
                              <button
                                onClick={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1,
                                    e
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="discounted-price text-end mt-2 text-success fw-semibold">
                          ${item.product.sale_price * item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="col-6 text-end">
                  ${(subtotal || 0).toFixed(2)}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">Shipping fee</div>
                <div className="col-6 text-end">
                  ${(shippingCost || 0).toFixed(2)}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">Total</div>
                <div className="col-6 text-end checkout-total">
                  ${(total || 0).toFixed(2)}
                </div>
              </div>

              <Link
                to="/checkout"
                state={{ cartItems, subtotal, shippingCost, total, formData }}
                className="checkout-button btn btn-danger text-white"
                onClick={(e) => {
                  if (!isFormValid()) {
                    e.preventDefault(); // Prevent navigation if the form is invalid
                    Toast.fire({
                      icon: "error",
                      title: "Please fill in the order information before checking out!",
                    });
                  }
                }}
              >
                <i className="fas fa-shopping-bag" />
                <span className="ms-2">CHECKOUT</span>
              </Link>
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
              <div className="text-center mt-3">
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
              </div>
              <div className="text-center mt-3">
                <div className="checkout-guarantee">
                  <i className="fas fa-certificate" />
                  Don't love it? We'll fix it. For free. Printerval Guarantee »
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}