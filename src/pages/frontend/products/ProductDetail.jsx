import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../../../service/ProductService";
import { urlImage } from "../../../config";
import ProductRelated from "./ProductRelated";
import ProductRelatedMobile from "./ProductRelatedMobile";
import ProductSameSeller from "./ProductSameSeller";
import ProductSameSellerMobile from "./ProductSameSellerMobile";
import Swal from "sweetalert2";
import cartService from "../../../service/CartService";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateCartCount } = useCart();
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [priceSale, setPriceSale] = useState("");
  const { slug } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const { isAuthenticated } = useAuth();

  const toggleText = () => setIsExpanded((prev) => !prev);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(product?.stock || 1, prev + 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.min(Math.max(1, value), product?.stock || 1));
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (color.image) {
      setMainImage(color.image);
    } else {
      setMainImage(product.image);
    }
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        window.scrollTo(0, 0);

        const productResponse = await productService.getProductDetailBySlug(
          slug
        );
        if (productResponse.data.success) {
          const productData = productResponse.data.data;
          setProduct(productData);
          setMainImage(productData.image);
          setBasePrice(productData.price);
          setPrice(productData.price);
          if (productData.sale) {
            setPriceSale(
              productData.price -
                (productData.price * productData.sale.discount_value) / 100
            );
          }
        }
      } catch (err) {
        setError("Unable to load product");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      Toast.fire({
        icon: "error",
        title: "Please login to add products to cart!",
      });
      return;
    }

    if (product.sizes && product.sizes.length > 0 && !size) {
      Toast.fire({
        icon: "error",
        title: "Please select a size!",
      });
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      Toast.fire({
        icon: "error",
        title: "Please select a color!",
      });
      return;
    }

    try {
      const cartData = {
        items: [
          {
            product_id: product.id,
            quantity: quantity,
            attributes: {
              ...(size && { size: size.size_value }),
              ...(selectedColor && { color: selectedColor.color_value }),
            },
          },
        ],
      };

      const response = await cartService.addToCart(cartData);
      console.log("Add to cart response:", response);
      await updateCartCount();
      if (response.data.success) {
        Toast.fire({
          icon: "success",
          title: response.data.message || "Successfully added to cart!",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Không thể thêm vào giỏ hàng. Vui lòng thử lại.");
    }
  };
  const handleSizeChange = (e) => {
    const selectedSize = product.sizes.find(
      (s) => s.size_value === e.target.value
    );
    setSize(selectedSize);

    if (selectedSize && selectedSize.price) {
      setPrice(selectedSize.price);
      if (product.sale) {
        setPriceSale(
          selectedSize.price -
            (selectedSize.price * product.sale.discount_value) / 100
        );
      }
    } else {
      setPrice(basePrice);
      if (product.sale) {
        setPriceSale(
          basePrice - (basePrice * product.sale.discount_value) / 100
        );
      }
    }
  };
  return (
    <section className="content py-5">
      <div className="container">
        <div className="product-main-content">
          <div className="row">
            <div className="col-12 col-md-7 col-lg-7">
              <img
                src={mainImage ? urlImage + mainImage : ""}
                className="d-block w-100"
                alt="ProductImage1"
              />
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : (
                <ProductRelated
                  productId={product && product.id ? product.id : ""}
                />
              )}
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : (
                <ProductSameSeller
                  productId={product && product.id ? product.id : ""}
                />
              )}
            </div>

            <div className="col-md-5 col-12 col-lg-5">
              <div className="d-flex flex-column mb-3 product-info">
                <div className="p-2 product-title">
                  {product && product.name ? product.name : ""}
                </div>

                <div className="p-2">
                  {product && product.sale ? (
                    <>
                      <span class="pricesale me-2">
                        {" "}
                        ${priceSale ? priceSale : price}
                      </span>{" "}
                      <span class="price">${price ? price : ""}</span>
                    </>
                  ) : (
                    <span class="pricesale me-2">
                      ${product && product.price ? product.price : ""}
                    </span>
                  )}
                </div>
                <div className="p-2 discount-name">
                  {product && product.sale
                    ? `${parseInt(
                        product.sale && product.sale.discount_value
                      )}% OFF - ${product.sale && product.sale.discount_name} `
                    : ""}
                </div>
                {product && product.colors && product.colors.length > 0 && (
                  <>
                    <div className="p-2 color-product">
                      {selectedColor
                        ? "Color: " + selectedColor.color_value
                        : "Color"}
                    </div>
                    <div className="p-2 color-product">
                      <div className="color-container">
                        {product.colors.map((color) => (
                          <div
                            key={color.id}
                            className="color-option position-relative"
                            onClick={() => handleColorSelect(color)}
                          >
                            <div
                              style={{
                                backgroundColor: color.color_code,
                              }}
                              className="color-circle border border-dark"
                            />
                            {selectedColor?.id === color.id && (
                              <i
                                className="fa-solid fa-check position-absolute top-50 start-50 translate-middle"
                                style={{ color: "#fff" }}
                              ></i>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {product && product.sizes && product.sizes.length > 0 && (
                  <div className="p-2 type-product">
                    <div className="container-style">
                      <div className="d-flex">
                        <div className="p-2 label d-flex me-auto align-items-center">
                          Size
                        </div>
                        <div className="dropdown-wrapper">
                          <div className="dropdown rounded-pill">
                            <select
                              value={size ? size.size_value : ""}
                              onChange={handleSizeChange}
                            >
                              <option value="">Choose a size</option>
                              {product.sizes.map((size) => (
                                <option key={size.id} value={size.size_value}>
                                  {size.size_value} (${size.price || price})
                                </option>
                              ))}
                            </select>
                            <i className="fas fa-chevron-down dropdown-icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-2 type-product">
                  <div className="container-style">
                    <div className="d-flex">
                      <div className="p-2 label d-flex me-auto p-2 align-items-center">
                        Quantity
                      </div>
                      <div className="quantity-controls">
                        <button
                          type="button"
                          onClick={handleDecrease}
                          disabled={quantity <= 1}
                        >
                          −
                        </button>
                        <input
                          width={50}
                          value={quantity}
                          style={{ outline: "none" }}
                          onChange={handleQuantityChange}
                          min="1"
                          max={product?.stock || 1}
                        />
                        <button
                          type="button"
                          onClick={handleIncrease}
                          disabled={quantity >= (product?.stock || 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 type-product">
                  <div className="row">
                    <div className="col-sm-10 d-flex justify-content-center">
                      <button
                        onClick={handleAddToCart}
                        className="add-to-cart-btn"
                      >
                        <i className="fas fa-shopping-bag" />
                        Add to cart
                      </button>
                    </div>
                    {/* <div className="col-sm-2">
                      <button className="favorite-btn">
                        <i className="far fa-heart" />
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="p-2 type-product">
                  <div className="guarantee-box">
                    <img
                      alt="Guarantee badge with text 'GUARANTEE' and stars"
                      height={50}
                      src="https://printerval.com/product-assets/images/guarantee.png?v=092023"
                      width={50}
                    />
                    <div className="guarantee-text">
                      Don’t love it? We’ll fix it. For free.
                      <br />
                      <Link to="#" className="guarentee-link">
                        Printverval Guarantee
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-2 type-product">
                  <div className="features-title">Features</div>
                  <table className="table table-bordered mt-2 features-table">
                    <tbody>
                      <tr>
                        <th>Categories</th>
                        <td>
                          <Link to="#">
                            {product &&
                              product.category &&
                              product.category.parent && (
                                <span>
                                  {product.category &&
                                    product.category.parent && (
                                      <>
                                        <span>
                                          {product.category &&
                                          product.category.parent &&
                                          product.category.parent.name
                                            ? product.category.parent.name
                                            : ""}
                                        </span>
                                        <span className="mx-1">&gt;</span>
                                      </>
                                    )}
                                  <span>
                                    {product &&
                                    product.category &&
                                    product.category.name
                                      ? product.category.name
                                      : ""}
                                  </span>
                                </span>
                              )}
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-2 type-product">
                  <div className="product-description">
                    <p
                      id="description"
                      className={`description-text ${
                        isExpanded ? "expanded" : ""
                      }`}
                      dangerouslySetInnerHTML={{
                        __html:
                          product && product.description
                            ? product.description
                            : "",
                      }}
                    />
                    <button
                      onClick={toggleText}
                      className="rounded-pill see-more-btn"
                      id="see-more-btn"
                    >
                      {isExpanded ? "See less" : "See more"}
                    </button>
                  </div>
                </div>
                {/* <div className="p-2 type-product">
                  <div className="features-title">
                    Shipping and return policies
                  </div>
                  <div className="d-flex flex-row mb-3 shipping-policy">
                    <div className="p-2">
                      {" "}
                      <img
                        alt="Delivery truck icon"
                        className="icon"
                        height={24}
                        src="https://storage.googleapis.com/a1aa/image/4Sd4ygbpUUprPVeAN2PWrajHPcYGE8HIwp2M74uNv8p9f0rTA.jpg"
                        width={24}
                      />{" "}
                    </div>
                    <div className="p-2">
                      {" "}
                      <span>Deliver to</span>
                      <br />
                      <span className="highlight">Viet Nam</span>
                      <Link className="link" to="#">
                        Details»
                      </Link>
                      <br />
                      Standard between Nov. 14 - Dec. 11
                      <br />
                      Ready To Ship In: 1 business day
                      <br />
                      Not soon enough?
                      <Link className="link" to="#">
                        Give a digital gift card.
                      </Link>
                      <p />
                    </div>
                  </div>
                </div> */}
                <div className="p-2">
                  <div className="seller-info">
                    <div className="d-flex flex-row mb-3">
                      <div className="p-2 rounded-3 my-auto">
                        <img
                          className=" rounded-3"
                          alt="Cartoon character holding a drink with the text 'CRAIC' below"
                          src={
                            product &&
                            product.profile_shop &&
                            product.profile_shop.logo_url
                              ? product.profile_shop.logo_url
                              : ""
                          }
                        />
                      </div>
                      <div className="p-2 d-flex flex-column">
                        <div className="p-2 seller-details">
                          <div className="title-design">
                            Designed and sold by
                          </div>
                          <div className="name">
                            <Link to={`/shop/${product?.seller_id}`}>
                              {product &&
                              product.profile_shop &&
                              product.profile_shop.shop_name
                                ? product.profile_shop.shop_name
                                : ""}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-mobile d-lg-none ">
                <div className="row">
                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : (
                    <ProductRelatedMobile
                      productId={product && product.id ? product.id : ""}
                    />
                  )}
                </div>

                <div className="row">
                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : (
                    <ProductSameSellerMobile
                      productId={product && product.id ? product.id : ""}
                    />
                  )}
                </div>
                <h2 className="product-title mt-4">Explore related searches</h2>
                <div className="related-items mt-4">
                  <div className="related-item">
                    <img
                      alt="Group of people wearing activewear"
                      height={150}
                      src="https://storage.googleapis.com/a1aa/image/p0FcmbrPHG7bE5x2fasWyJPluKbVamywjNUbixnmikcRP71JA.jpg"
                      width={150}
                    />
                    <p>Activewear</p>
                  </div>
                  <div className="related-item">
                    <img
                      alt="Double sided sweatshirts with designs"
                      height={150}
                      src="https://storage.googleapis.com/a1aa/image/pNhevtSFfNsBfp3yLM4phgH4o6ugijq3fidCOaBPN8RC6ZvOB.jpg"
                      width={150}
                    />
                    <p>Double Sided Sweatshirts</p>
                  </div>
                  <div className="related-item">
                    <img
                      alt="Purple sweatshirt with Halloween design"
                      height={150}
                      src="https://storage.googleapis.com/a1aa/image/aZCW9rpZI9KBKNTBqASHqylXrlnOaZKPV5k7yTKVF6cpn96E.jpg"
                      width={150}
                    />
                    <p>Sweatshirts</p>
                  </div>
                  <div className="related-item">
                    <img
                      alt="Clothing items including jeans and t-shirt"
                      height={150}
                      src="https://storage.googleapis.com/a1aa/image/Z1uMPIqLeSyKdizQZX86BeeSw5bHE8TzeaDV125ok3feon96E.jpg"
                      width={150}
                    />
                    <p>Clothing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
