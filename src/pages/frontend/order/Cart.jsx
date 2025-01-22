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
import RecentlyViewedProducts from "../products/RecentlyViewedProducts";
import HomeRecentlyViewedProducts from "../products/HomeRecentlyViewedProducts";
import RecentlyViewed from "../products/RecentlyViewed";

export default function Cart() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    country: "united-states",
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

  return (
    <div className="container py-5">
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
                    <th>Items</th>
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
                              style={{ color: "#E2150C" }}
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
                                    item.image.startsWith("images")
                                      ? urlImage + item.image
                                      : item.image
                                  }
                                  width={100}
                                />
                                <div>
                                  <div className="item-title">
                                    <Link
                                      to={`/product/${item.slug}`}
                                      style={{
                                        display: "block",
                                        maxWidth: "clamp(150px, 25vw, 300px)",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        textDecoration: "none",
                                        color: "inherit",
                                      }}
                                    >
                                      {item.name}
                                    </Link>
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
                          item.image.startsWith("images")
                            ? urlImage + item.image
                            : item.image
                        }
                        alt={item.name}
                      />
                      <div className="product-details">
                        <h2
                          style={{
                            maxWidth: "clamp(300px, 25vw, 300px)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.name}
                        </h2>
                        <p>
                          <span>{item.size ? `Size: ${item.size}` : ""}</span>
                          <br />
                          <span>
                            {item.color ? `Color: ${item.color}` : ""}
                          </span>
                          <br />
                          <span>{item.type ? `Type: ${item.type}` : ""}</span>
                          <br />
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
          </div>
          <div className="col-12 col-md-12 col-lg-4 mt-5">
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
              {/* <div className="text-center mt-3">
                <div className="checkout-guarantee">
                  <i className="fas fa-certificate" />
                  Spend $100 or more to enjoy free shipping
                </div>
              </div> */}
            </div>
          </div>
          <HomeRecentlyViewedProducts />
          <RecentlyViewed />
        </div>
      )}
    </div>
  );
}
