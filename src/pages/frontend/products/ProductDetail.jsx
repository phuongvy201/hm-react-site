import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../../../service/ProductService";
import { urlImage } from "../../../config";
import ProductRelated from "./ProductRelated";
import ProductRelatedMobile from "./ProductRelatedMobile";
import ProductSameSeller from "./ProductSameSeller";
import ProductSameSellerMobile from "./ProductSameSellerMobile";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../state/cartSlice";
import orderService from "../../../service/OrderService";
import { ColorOptions } from "../../../constants/productConstants";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [priceSize, setPriceSize] = useState(0);
  const [priceSale, setPriceSale] = useState(0);
  const { slug } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [productId, setProductId] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const navigate = useNavigate();
  const [selectedVariantImage, setSelectedVariantImage] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});

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
  const cart = localStorage.getItem("cart");
  const [type, setType] = useState("");
  const toggleText = () => setIsExpanded((prev) => !prev);
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

  var cartItems = useSelector((state) => state.cart.sellers);

  const total = cartItems.reduce((totalPrice, sellerGroup) => {
    return (
      totalPrice +
      sellerGroup.items.reduce((price, item) => {
        return price + item.count * item.price;
      }, 0)
    );
  }, 0);
  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(product?.product?.stock || 1, prev + 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.min(Math.max(1, value), product?.product?.stock || 1));
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (color.image) {
      setMainImage(color.image);
    } else {
      setMainImage(product?.product?.image);
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
          console.log("productData", productData);
          console.log("productData.product.id", productData.product.id);
          setProductId(productData.product.id);
          setMainImage(productData.product.image);
          setBasePrice(productData.price);
          setPrice(parseFloat(productData.price));
          if (productData.sale) {
            setPriceSale(
              parseFloat(productData.price) -
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
  useEffect(() => {
    if (selectedVariant?.image) {
      setSelectedVariantImage(selectedVariant.image);
    } else {
      setSelectedVariantImage(null);
    }
  }, [selectedVariant]);

  const handleTypeChange = (e) => {
    const selectedType = product.types.find(
      (type) => type.type_value === e.target.value
    );
    setType(selectedType);

    // Cập nhật giá khi thay đổi type
    if (selectedType) {
      // Tính giá mới từ giá ban đầu cộng với giá của loại đã chọn và giá của kích thước đã chọn
      const newPrice =
        parseFloat(product.price) +
        (size ? parseFloat(size.price) : 0) +
        parseFloat(selectedType.price);
      setPrice(newPrice);
    } else {
      // Nếu không có loại nào được chọn, giữ giá bằng giá gốc cộng với giá của kích thước đã chọn
      const newPrice =
        parseFloat(product.price) + (size ? parseFloat(size.price) : 0);
      setPrice(newPrice);
    }
  };
  const handleSizeChange = (e) => {
    const selectedSize = product.sizes.find(
      (size) => size.size_value === e.target.value
    );
    setSize(selectedSize);

    // Cập nhật giá khi thay đổi size
    if (selectedSize) {
      // Tính giá mới từ giá ban đầu cộng với giá của kích thước đã chọn và giá của loại đã chọn
      const newPrice =
        parseFloat(product.price) +
        parseFloat(selectedSize.price) +
        (type ? parseFloat(type.price) : 0);
      setPrice(newPrice);
    } else {
      // Nếu không có kích thước nào được chọn, giữ giá bằng giá gốc cộng với giá của loại đã chọn
      const newPrice =
        parseFloat(product.price) + (type ? parseFloat(type.price) : 0);
      setPrice(newPrice);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddToCart = () => {
    // Kiểm tra sản phẩm tồn tại
    if (!product) {
      Toast.fire({
        icon: "error",
        title: "Sản phẩm không tồn tại!",
      });
      return;
    }

    // Kiểm tra các thuộc tính bắt buộc
    const hasColor = colorAttribute && colorAttribute.values.length > 0;
    const hasSize = sizeAttribute && sizeAttribute.values.length > 0;
    const hasType = typeAttribute && typeAttribute.values.length > 0;

    if (hasColor && !selectedColor) {
      Toast.fire({
        icon: "error",
        title: "Vui lòng chọn màu sắc trước khi thêm vào giỏ hàng!",
      });
      return; // Ngăn chặn mở modal
    }

    if (hasSize && !selectedAttributes["Size"]) {
      Toast.fire({
        icon: "error",
        title: "Vui lòng chọn kích thước trước khi thêm vào giỏ hàng!",
      });
      return; // Ngăn chặn mở modal
    }

    if (hasType && !selectedAttributes["Type"]) {
      Toast.fire({
        icon: "error",
        title: "Vui lòng chọn loại trước khi thêm vào giỏ hàng!",
      });
      return; // Ngăn chặn mở modal
    }

    // Tính toán giá sản phẩm
    const finalPrice = calculatePrice(product, selectedVariant, selectedColor);

    // Xử lý hình ảnh
    let productImage = "";
    if (selectedVariantImage) {
      if (selectedVariantImage instanceof File) {
        productImage = URL.createObjectURL(selectedVariantImage);
      } else if (selectedVariantImage.startsWith("data")) {
        productImage = selectedVariantImage;
      } else if (selectedVariantImage.startsWith("http")) {
        productImage = selectedVariantImage;
      } else {
        productImage = urlImage + selectedVariantImage;
      }
    } else if (mainImage) {
      if (mainImage instanceof File) {
        productImage = URL.createObjectURL(mainImage);
      } else if (mainImage.startsWith("data")) {
        productImage = mainImage;
      } else if (mainImage.startsWith("http")) {
        productImage = mainImage;
      } else {
        productImage = urlImage + mainImage;
      }
    }

    // Tạo item để thêm vào giỏ hàng
    const cartItem = {
      id: product.product.id,
      name: product.product.name,
      image: productImage,
      price: finalPrice, // Sử dụng giá đã tính toán
      count: quantity,
      color: hasColor ? selectedColor : null,
      size: hasSize ? selectedAttributes["Size"] : null,
      type: hasType ? selectedAttributes["Type"] : null,
      category_id: product.category.current.id,
      stock: product.product.stock,
      seller_id: product.product.seller_id,
    };

    // Lấy tên shop an toàn
    const shopName =
      product.profile_shop?.shop_name ||
      product.seller_info?.shop?.shop_name ||
      "Unknown Shop";

    // Dispatch action addToCart với thông tin cần thiết
    dispatch(
      addToCart({
        item: cartItem,
        sellerId: product.product.seller_id,
        shopName: shopName,
      })
    );

    Toast.fire({
      icon: "success",
      title: "Đã thêm sản phẩm vào giỏ hàng!",
    });
  };

  const decreaseQuantity = (index) => {
    dispatch(decreaseQuantity(index));
  };

  const increaseQuantity = (index) => {
    dispatch(increaseQuantity(index));
  };

  const removeItem = (index) => {
    dispatch(removeItem(index));
  };
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
  }, [cartItems]);

  // Tìm thuộc tính Color trong template_info.attributes
  const colorAttribute = product?.template_info?.attributes?.find(
    (attr) => attr.name === "Color"
  );

  const handleAttributeChange = (attributeName, value) => {
    const newAttributes = {
      ...selectedAttributes,
      [attributeName]: value,
    };
    setSelectedAttributes(newAttributes);

    // Tìm variant phù hợp với tất cả các thuộc tính đã chọn
    const matchingVariant = product?.variants?.find((variant) => {
      // Kiểm tra xem tất cả các thuộc tính đã chọn có khớp với variant không
      return variant.attributes.every((attr) => {
        // Nếu thuộc tính này chưa được chọn, bỏ qua việc so sánh
        if (!newAttributes[attr.name]) return true;
        // So sánh giá trị thuộc tính
        return newAttributes[attr.name] === attr.value;
      });
    });

    if (matchingVariant) {
      // Nếu tìm thấy variant phù hợp
      setSelectedVariant(matchingVariant);
      // Cập nhật giá
      setPrice(parseFloat(matchingVariant.price));
      // Cập nhật hình ảnh nếu variant có hình
      if (matchingVariant.image) {
        setSelectedVariantImage(matchingVariant.image);
      } else {
        // Nếu variant không có hình, sử dụng hình mặc định
        setSelectedVariantImage(null);
      }
    } else {
      // Nếu không tìm thấy variant phù hợp, sử dụng giá và hình mặc định
      setSelectedVariant(null);
      setPrice(parseFloat(product.pricing.base_price));
      setSelectedVariantImage(null);
    }
  };

  const updatePrice = (variant) => {
    if (!variant) return;

    const variantPrice = parseFloat(variant.price);
    setPrice(variantPrice);

    if (product?.pricing?.discount_info) {
      const discountValue = product.pricing.discount_info.discount_value;
      const discountedPrice = variantPrice * (1 - discountValue / 100);
      setPriceSale(discountedPrice);
    }
  };

  // Tìm thuộc tính Size và Type
  const sizeAttribute = product?.template_info?.attributes?.find(
    (attr) => attr.name === "Size"
  );

  const typeAttribute = product?.template_info?.attributes?.find(
    (attr) => attr.name === "Type"
  );

  const calculatePrice = (product, selectedVariant, selectedColor) => {
    let basePrice = selectedVariant
      ? parseFloat(selectedVariant.price)
      : parseFloat(product.pricing.base_price);
    let discountValue = 0;

    if (selectedVariant && selectedColor && selectedColor.discount_info) {
      // Áp dụng khuyến mãi theo màu sắc nếu có
      discountValue = selectedColor.discount_info.discount_value;
    } else if (product.pricing.discount_info) {
      // Áp dụng khuyến mãi chung nếu có
      discountValue = product.pricing.discount_info.discount_value;
    }

    const finalPrice = basePrice * (1 - discountValue / 100);
    return finalPrice.toFixed(2);
  };

  return (
    <section className="content py-5">
      <div className="container">
        <div className="product-main-content">
          <div className="row">
            <div className="col-12 col-md-7 col-lg-7">
              <div
                className="d-block product-image-container"
                style={{
                  width: "75%",
                  paddingBottom: "75%", // Tạo tỷ lệ khung hình 1:1
                  position: "relative",
                  margin: "auto",
                }}
              >
                <img
                  src={
                    selectedVariantImage
                      ? selectedVariantImage instanceof File
                        ? URL.createObjectURL(selectedVariantImage)
                        : selectedVariantImage.startsWith("http")
                        ? selectedVariantImage
                        : urlImage + selectedVariantImage
                      : mainImage
                      ? mainImage instanceof File
                        ? URL.createObjectURL(mainImage)
                        : mainImage.startsWith("http")
                        ? mainImage
                        : urlImage + mainImage
                      : ""
                  }
                  className="d-block product-detail-image"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt={product?.product?.name || "Product Image"}
                />
              </div>

              {productId ? (
                <ProductRelated productId={productId} />
              ) : (
                <div className="text-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              )}

              <ProductSameSeller productId={productId} />
            </div>

            <div className="col-md-5 col-12 col-lg-5">
              <div className="d-flex flex-column mb-3 product-info">
                <div className="p-2 product-title">
                  {product && product.product.name ? product.product.name : ""}
                </div>

                <div className="p-2">
                  {product ? (
                    <>
                      <span className="pricesale me-2">
                        $
                        {calculatePrice(
                          product,
                          selectedVariant,
                          selectedColor
                        )}
                      </span>
                      <span className="price">
                        $
                        {selectedVariant
                          ? selectedVariant.price
                          : product.pricing.base_price}
                      </span>
                    </>
                  ) : null}
                </div>
                <div className="p-2 discount-name">
                  {product && product.pricing.discount_info
                    ? `${product.pricing.discount_info.discount_value}% OFF - ${product.pricing.discount_info.discount_name} `
                    : ""}
                </div>
                {colorAttribute && (
                  <>
                    <div className="p-2 color-product">
                      {selectedColor ? `Color: ${selectedColor}` : "Color"}
                    </div>
                    <div className="p-2 color-product">
                      <div className="color-container">
                        {colorAttribute.values.map((color) => {
                          // Tìm màu tương ứng trong ColorOptions
                          const colorOption = ColorOptions.find(
                            (option) =>
                              option.label.toLowerCase() === color.toLowerCase()
                          );

                          return (
                            <div
                              key={color}
                              className={`color-option position-relative ${
                                selectedColor === color ? "active" : ""
                              }`}
                              onClick={() => {
                                setSelectedColor(color);
                                handleAttributeChange("Color", color);
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: colorOption
                                    ? colorOption.value
                                    : "#FFFFFF",
                                  border:
                                    colorOption?.value === "#FFFFFF"
                                      ? "1px solid #ddd"
                                      : "none",
                                }}
                                className="color-circle border border-dark"
                              />
                              {selectedColor === color && (
                                <i
                                  className="fa-solid fa-check position-absolute top-50 start-50 translate-middle"
                                  style={{
                                    color:
                                      colorOption?.value === "#FFFFFF"
                                        ? "#000"
                                        : "#fff",
                                  }}
                                ></i>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {sizeAttribute && (
                  <div className="p-2 type-product">
                    <div className="container-style">
                      <div className="d-flex">
                        <div className="p-2 label d-flex me-auto align-items-center">
                          Size
                        </div>
                        <div className="dropdown-wrapper">
                          <div className="dropdown rounded-pill">
                            <select
                              value={selectedAttributes["Size"] || ""}
                              onChange={(e) =>
                                handleAttributeChange("Size", e.target.value)
                              }
                            >
                              <option value="">Choose a size</option>
                              {sizeAttribute.values.map((size) => (
                                <option key={size} value={size}>
                                  {size}
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

                {typeAttribute && (
                  <div className="p-2 type-product">
                    <div className="container-style">
                      <div className="d-flex">
                        <div className="p-2 label d-flex me-auto align-items-center">
                          Type
                        </div>
                        <div className="dropdown-wrapper">
                          <div className="dropdown rounded-pill">
                            <select
                              value={selectedAttributes["Type"] || ""}
                              onChange={(e) =>
                                handleAttributeChange("Type", e.target.value)
                              }
                            >
                              <option value="">Choose a type</option>
                              {typeAttribute.values.map((type) => (
                                <option key={type} value={type}>
                                  {type}
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
                          id="qty"
                          max={product?.product?.stock || 1}
                        />
                        <button
                          type="button"
                          onClick={handleIncrease}
                          disabled={quantity >= (product?.product?.stock || 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 type-product">
                  {" "}
                  <div className="row">
                    {" "}
                    <div className="col-sm-10 d-flex justify-content-center">
                      {" "}
                      <button
                        onClick={() => handleAddToCart()}
                        className="add-to-cart-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#cartModal"
                      >
                        {" "}
                        <i className="fas fa-shopping-bag" /> Add to cart{" "}
                      </button>
                      <div
                        className="modal fade"
                        id="cartModal"
                        tabIndex="-1"
                        aria-labelledby="cartModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-lg">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="cartModalLabel">
                                All items in cart
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="row">
                                <div className="col-12 col-md-6 col-lg-6">
                                  {cartItems.map((seller) => (
                                    <div
                                      key={seller.sellerId}
                                      className="order-seller "
                                    >
                                      <p className="shop-name ">
                                        <i
                                          style={{ color: "#C0C0C0" }}
                                          className="fas fa-store me-2 mt-3"
                                        ></i>
                                        {seller.shopName}
                                      </p>
                                      {seller.items.map((item) => (
                                        <div
                                          key={item.id}
                                          className="order-item"
                                        >
                                          <img
                                            src={
                                              item.image instanceof File
                                                ? URL.createObjectURL(
                                                    item.image
                                                  )
                                                : item.image?.startsWith("http")
                                                ? item.image
                                                : urlImage + item.image
                                            }
                                            alt={item.name}
                                            className="order-item-image ms-2"
                                          />
                                          <div className="product-details">
                                            <h2>{item.name}</h2>
                                            {item.size && (
                                              <p>Size: {item.size}</p>
                                            )}
                                            {item.color && (
                                              <p>Color: {item.color}</p>
                                            )}
                                            {item.type && (
                                              <p>Type: {item.type}</p>
                                            )}
                                            <div className="d-flex">
                                              <div className="me-auto">
                                                <div className="pricing-info">
                                                  <div className="discounted-price">
                                                    $
                                                    {parseFloat(
                                                      item.price
                                                    ).toFixed(2)}{" "}
                                                    × {item.count}
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
                                <div className="col-12 col-md-6 col-lg-6">
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
                                            <div className="title-country">
                                              Country / Region
                                            </div>
                                          </div>
                                        </div>
                                        <div className="select-container-country">
                                          <select
                                            value={formData.country}
                                            onChange={(e) =>
                                              setFormData({
                                                ...formData,
                                                country: e.target.value,
                                              })
                                            }
                                          >
                                            <option value="">
                                              Select a country
                                            </option>
                                            <option value="afghanistan">
                                              Afghanistan
                                            </option>
                                            <option value="albania">
                                              Albania
                                            </option>
                                            <option value="algeria">
                                              Algeria
                                            </option>
                                            <option value="american-samoa">
                                              American Samoa
                                            </option>
                                            <option value="andorra">
                                              Andorra
                                            </option>
                                            <option value="angola">
                                              Angola
                                            </option>
                                            <option value="anguilla">
                                              Anguilla
                                            </option>
                                            <option value="antarctica">
                                              Antarctica
                                            </option>
                                            <option value="antigua-and-barbuda">
                                              Antigua and Barbuda
                                            </option>
                                            <option value="argentina">
                                              Argentina
                                            </option>
                                            <option value="armenia">
                                              Armenia
                                            </option>
                                            <option value="australia">
                                              Australia
                                            </option>
                                            <option value="austria">
                                              Austria
                                            </option>
                                            <option value="azerbaijan">
                                              Azerbaijan
                                            </option>
                                            <option value="bahamas">
                                              Bahamas
                                            </option>
                                            <option value="bahrain">
                                              Bahrain
                                            </option>
                                            <option value="bangladesh">
                                              Bangladesh
                                            </option>
                                            <option value="barbados">
                                              Barbados
                                            </option>
                                            <option value="belarus">
                                              Belarus
                                            </option>
                                            <option value="belgium">
                                              Belgium
                                            </option>
                                            <option value="belize">
                                              Belize
                                            </option>
                                            <option value="benin">Benin</option>
                                            <option value="bermuda">
                                              Bermuda
                                            </option>
                                            <option value="bhutan">
                                              Bhutan
                                            </option>
                                            <option value="bolivia">
                                              Bolivia
                                            </option>
                                            <option value="bosnia-and-herzegovina">
                                              Bosnia and Herzegovina
                                            </option>
                                            <option value="botswana">
                                              Botswana
                                            </option>
                                            <option value="brazil">
                                              Brazil
                                            </option>
                                            <option value="brunei">
                                              Brunei
                                            </option>
                                            <option value="bulgaria">
                                              Bulgaria
                                            </option>
                                            <option value="burkina-faso">
                                              Burkina Faso
                                            </option>
                                            <option value="burundi">
                                              Burundi
                                            </option>
                                            <option value="cabo-verde">
                                              Cabo Verde
                                            </option>
                                            <option value="cambodia">
                                              Cambodia
                                            </option>
                                            <option value="cameroon">
                                              Cameroon
                                            </option>
                                            <option value="canada">
                                              Canada
                                            </option>
                                            <option value="central-african-republic">
                                              Central African Republic
                                            </option>
                                            <option value="chad">Chad</option>
                                            <option value="chile">Chile</option>
                                            <option value="china">China</option>
                                            <option value="colombia">
                                              Colombia
                                            </option>
                                            <option value="comoros">
                                              Comoros
                                            </option>
                                            <option value="congo">Congo</option>
                                            <option value="costa-rica">
                                              Costa Rica
                                            </option>
                                            <option value="croatia">
                                              Croatia
                                            </option>
                                            <option value="cuba">Cuba</option>
                                            <option value="cyprus">
                                              Cyprus
                                            </option>
                                            <option value="czech-republic">
                                              Czech Republic
                                            </option>
                                            <option value="democratic-republic-of-the-congo">
                                              Democratic Republic of the Congo
                                            </option>
                                            <option value="denmark">
                                              Denmark
                                            </option>
                                            <option value="djibouti">
                                              Djibouti
                                            </option>
                                            <option value="dominica">
                                              Dominica
                                            </option>
                                            <option value="dominican-republic">
                                              Dominican Republic
                                            </option>
                                            <option value="ecuador">
                                              Ecuador
                                            </option>
                                            <option value="egypt">Egypt</option>
                                            <option value="el-salvador">
                                              El Salvador
                                            </option>
                                            <option value="equatorial-guinea">
                                              Equatorial Guinea
                                            </option>
                                            <option value="eritrea">
                                              Eritrea
                                            </option>
                                            <option value="estonia">
                                              Estonia
                                            </option>
                                            <option value="eswatini">
                                              Eswatini
                                            </option>
                                            <option value="ethiopia">
                                              Ethiopia
                                            </option>
                                            <option value="fiji">Fiji</option>
                                            <option value="finland">
                                              Finland
                                            </option>
                                            <option value="france">
                                              France
                                            </option>
                                            <option value="gabon">Gabon</option>
                                            <option value="gambia">
                                              Gambia
                                            </option>
                                            <option value="georgia">
                                              Georgia
                                            </option>
                                            <option value="germany">
                                              Germany
                                            </option>
                                            <option value="ghana">Ghana</option>
                                            <option value="greece">
                                              Greece
                                            </option>
                                            <option value="grenada">
                                              Grenada
                                            </option>
                                            <option value="guatemala">
                                              Guatemala
                                            </option>
                                            <option value="guinea">
                                              Guinea
                                            </option>
                                            <option value="guinea-bissau">
                                              Guinea-Bissau
                                            </option>
                                            <option value="guyana">
                                              Guyana
                                            </option>
                                            <option value="haiti">Haiti</option>
                                            <option value="honduras">
                                              Honduras
                                            </option>
                                            <option value="hungary">
                                              Hungary
                                            </option>
                                            <option value="iceland">
                                              Iceland
                                            </option>
                                            <option value="india">India</option>
                                            <option value="indonesia">
                                              Indonesia
                                            </option>
                                            <option value="iran">Iran</option>
                                            <option value="iraq">Iraq</option>
                                            <option value="ireland">
                                              Ireland
                                            </option>
                                            <option value="israel">
                                              Israel
                                            </option>
                                            <option value="italy">Italy</option>
                                            <option value="jamaica">
                                              Jamaica
                                            </option>
                                            <option value="japan">Japan</option>
                                            <option value="jordan">
                                              Jordan
                                            </option>
                                            <option value="kazakhstan">
                                              Kazakhstan
                                            </option>
                                            <option value="kenya">Kenya</option>
                                            <option value="kiribati">
                                              Kiribati
                                            </option>
                                            <option value="korea-north">
                                              North Korea
                                            </option>
                                            <option value="korea-south">
                                              South Korea
                                            </option>
                                            <option value="kosovo">
                                              Kosovo
                                            </option>
                                            <option value="kuwait">
                                              Kuwait
                                            </option>
                                            <option value="kyrgyzstan">
                                              Kyrgyzstan
                                            </option>
                                            <option value="laos">Laos</option>
                                            <option value="latvia">
                                              Latvia
                                            </option>
                                            <option value="lebanon">
                                              Lebanon
                                            </option>
                                            <option value="lesotho">
                                              Lesotho
                                            </option>
                                            <option value="liberia">
                                              Liberia
                                            </option>
                                            <option value="libya">Libya</option>
                                            <option value="liechtenstein">
                                              Liechtenstein
                                            </option>
                                            <option value="lithuania">
                                              Lithuania
                                            </option>
                                            <option value="luxembourg">
                                              Luxembourg
                                            </option>
                                            <option value="madagascar">
                                              Madagascar
                                            </option>
                                            <option value="malawi">
                                              Malawi
                                            </option>
                                            <option value="malaysia">
                                              Malaysia
                                            </option>
                                            <option value="maldives">
                                              Maldives
                                            </option>
                                            <option value="mali">Mali</option>
                                            <option value="malta">Malta</option>
                                            <option value="marshall-islands">
                                              Marshall Islands
                                            </option>
                                            <option value="martinique">
                                              Martinique
                                            </option>
                                            <option value="mauritania">
                                              Mauritania
                                            </option>
                                            <option value="mauritius">
                                              Mauritius
                                            </option>
                                            <option value="mexico">
                                              Mexico
                                            </option>
                                            <option value="micronesia">
                                              Micronesia
                                            </option>
                                            <option value="moldova">
                                              Moldova
                                            </option>
                                            <option value="monaco">
                                              Monaco
                                            </option>
                                            <option value="mongolia">
                                              Mongolia
                                            </option>
                                            <option value="montenegro">
                                              Montenegro
                                            </option>
                                            <option value="morocco">
                                              Morocco
                                            </option>
                                            <option value="mozambique">
                                              Mozambique
                                            </option>
                                            <option value="myanmar">
                                              Myanmar
                                            </option>
                                            <option value="namibia">
                                              Namibia
                                            </option>
                                            <option value="nauru">Nauru</option>
                                            <option value="nepal">Nepal</option>
                                            <option value="netherlands">
                                              Netherlands
                                            </option>
                                            <option value="new-zealand">
                                              New Zealand
                                            </option>
                                            <option value="nicaragua">
                                              Nicaragua
                                            </option>
                                            <option value="niger">Niger</option>
                                            <option value="nigeria">
                                              Nigeria
                                            </option>
                                            <option value="north-macedonia">
                                              North Macedonia
                                            </option>
                                            <option value="norway">
                                              Norway
                                            </option>
                                            <option value="oman">Oman</option>
                                            <option value="pakistan">
                                              Pakistan
                                            </option>
                                            <option value="palau">Palau</option>
                                            <option value="palestine">
                                              Palestine
                                            </option>
                                            <option value="panama">
                                              Panama
                                            </option>
                                            <option value="papua-new-guinea">
                                              Papua New Guinea
                                            </option>
                                            <option value="paraguay">
                                              Paragu
                                            </option>
                                            <option value="peru">Peru</option>
                                            <option value="philippines">
                                              Philippines
                                            </option>
                                            <option value="poland">
                                              Poland
                                            </option>
                                            <option value="portugal">
                                              Portugal
                                            </option>
                                            <option value="qatar">Qatar</option>
                                            <option value="romania">
                                              Romania
                                            </option>
                                            <option value="russia">
                                              Russia
                                            </option>
                                            <option value="rwanda">
                                              Rwanda
                                            </option>
                                            <option value="saint-kitts-and-nevis">
                                              Saint Kitts and Nevis
                                            </option>
                                            <option value="saint-lucia">
                                              Saint Lucia
                                            </option>
                                            <option value="saint-vincent-and-the-grenadines">
                                              Saint Vincent and the Grenadines
                                            </option>
                                            <option value="samoa">Samoa</option>
                                            <option value="san-marino">
                                              San Marino
                                            </option>
                                            <option value="sao-tome-and-principe">
                                              Sao Tome and Principe
                                            </option>
                                            <option value="saudi-arabia">
                                              Saudi Arabia
                                            </option>
                                            <option value="senegal">
                                              Senegal
                                            </option>
                                            <option value="serbia">
                                              Serbia
                                            </option>
                                            <option value="seychelles">
                                              Seychelles
                                            </option>
                                            <option value="sierra-leone">
                                              Sierra Leone
                                            </option>
                                            <option value="singapore">
                                              Singapore
                                            </option>
                                            <option value="slovakia">
                                              Slovakia
                                            </option>
                                            <option value="slovenia">
                                              Slovenia
                                            </option>
                                            <option value="solomon-islands">
                                              Solomon Islands
                                            </option>
                                            <option value="somalia">
                                              Somalia
                                            </option>
                                            <option value="south-africa">
                                              South Africa
                                            </option>
                                            <option value="south-sudan">
                                              South Sudan
                                            </option>
                                            <option value="spain">Spain</option>
                                            <option value="sri-lanka">
                                              Sri Lanka
                                            </option>
                                            <option value="sudan">Sudan</option>
                                            <option value="suriname">
                                              Suriname
                                            </option>
                                            <option value="sweden">
                                              Sweden
                                            </option>
                                            <option value="switzerland">
                                              Switzerland
                                            </option>
                                            <option value="syria">Syria</option>
                                            <option value="taiwan">
                                              Taiwan
                                            </option>
                                            <option value="tajikistan">
                                              Tajikistan
                                            </option>
                                            <option value="tanzania">
                                              Tanzania
                                            </option>
                                            <option value="thailand">
                                              Thailand
                                            </option>
                                            <option value="togo">Togo</option>
                                            <option value="tonga">Tonga</option>
                                            <option value="trinidad-and-tobago">
                                              Trinidad and Tobago
                                            </option>
                                            <option value="tunisia">
                                              Tunisia
                                            </option>
                                            <option value="turkey">
                                              Turkey
                                            </option>
                                            <option value="turkmenistan">
                                              Turkmenistan
                                            </option>
                                            <option value="tuvalu">
                                              Tuvalu
                                            </option>
                                            <option value="uganda">
                                              Uganda
                                            </option>
                                            <option value="ukraine">
                                              Ukraine
                                            </option>
                                            <option value="united-arab-emirates">
                                              United Arab Emirates
                                            </option>
                                            <option value="united-kingdom">
                                              United Kingdom
                                            </option>
                                            <option value="united-states">
                                              United States
                                            </option>
                                            <option value="uruguay">
                                              Uruguay
                                            </option>
                                            <option value="uzbekistan">
                                              Uzbekistan
                                            </option>
                                            <option value="vanuatu">
                                              Vanuatu
                                            </option>
                                            <option value="vatican-city">
                                              Vatican City
                                            </option>
                                            <option value="venezuela">
                                              Venezuela
                                            </option>
                                            <option value="vietnam">
                                              Vietnam
                                            </option>
                                            <option value="yemen">Yemen</option>
                                            <option value="zambia">
                                              Zambia
                                            </option>
                                            <option value="zimbabwe">
                                              Zimbabwe
                                            </option>
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

                              <div className="cart-actions">
                                <div className="row my-3">
                                  <div className="col-6 ">
                                    <button
                                      className="btn btn-danger"
                                      onClick={handleCheckout}
                                    >
                                      Checkout
                                    </button>
                                  </div>
                                  <div className="col-6">
                                    <Link to="/cart" className="btn btn-primary">
                                      View cart
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </div>{" "}
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
                            {product?.category?.hierarchy ? (
                              <span>{product.category.hierarchy}</span>
                            ) : (
                              <span>Uncategorized</span>
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
                          product &&
                          product.product &&
                          product.product.description
                            ? product.product.description
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
                            product.seller_info &&
                            product.seller_info.shop &&
                            urlImage + product.seller_info.shop.logo_url
                              ? urlImage + product.seller_info.shop.logo_url
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
                            <Link
                              to={`/shop/${product?.seller_info?.seller?.id}`}
                            >
                              {product &&
                              product.seller_info &&
                              product.seller_info.shop &&
                              product.seller_info.shop.shop_name
                                ? product.seller_info.shop.shop_name
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
                    <ProductRelatedMobile productId={productId} />
                  )}
                </div>

                <div className="row">
                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : (
                    <ProductSameSellerMobile productId={productId} />
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
