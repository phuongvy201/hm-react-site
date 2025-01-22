import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../../../service/ProductService";
import { urlImage } from "../../../config";
import ProductRelated from "./ProductRelated";
import ProductRelatedMobile from "./ProductRelatedMobile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProductSameSeller from "./ProductSameSeller";
import ProductSameSellerMobile from "./ProductSameSellerMobile";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/AuthContext";
import "../../../assets/css/sizeguide.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../state/cartSlice";
import orderService from "../../../service/OrderService";
import { ColorOptions } from "../../../constants/productConstants";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "../../../state/cartSlice";
import * as bootstrap from "bootstrap";
import { Modal } from "bootstrap";
import serverService from "../../../service/ServerService";
import axios from "axios";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import RecentlyViewed from "./RecentlyViewed";
import { productMeasurements, sizeCharts } from "../../../constants/sizeCharts";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [price, setPrice] = useState(0);
  const [priceSale, setPriceSale] = useState(0);
  const { slug } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [productId, setProductId] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const { isAuthenticated } = useAuth();
  const [ip, setIp] = useState("");
  const [country, setCountry] = useState("");
  const [deliveryStartDate, setDeliveryStartDate] = useState("");
  const [deliveryEndDate, setDeliveryEndDate] = useState("");

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const navigate = useNavigate();

  const [selectedVariantImage, setSelectedVariantImage] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(product?.product?.images[0]);

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
    country: "united-states",
    city: "",
    zipCode: "",
    shippingNotes: "",
    internalNotes: "",
  });

  var cartItems = useSelector((state) => state.cart.sellers);
  console.log("cartItems", cartItems);

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

          // Lưu sản phẩm vào danh sách đã xem
          saveToRecentlyViewed({
            id: productData.product.id,
            name: productData.product.name,
            slug: productData.product.slug,
            main_image: productData.product.main_image,
            price: productData.product.base_price,
            sale: productData.sale,
            category_id: productData.category?.current?.id,
            seller_id: productData.product.seller_id,
          });
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
    const fetchIp = async () => {
      try {
        // Gọi API từ backend để lấy địa chỉ IP
        const response = await serverService.getIp(); // Đảm bảo serverService có phương thức getIp
        const clientIp = response.data.ip; // Lấy địa chỉ IP từ phản hồi
        setIp(clientIp);
        console.log("IP:", clientIp);
        console.log("response", response);

        // Thêm thời gian chờ trước khi gọi dịch vụ geolocation
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 giây

        // Gọi dịch vụ geolocation để lấy thông tin quốc gia
        const geoResponse = await axios.get(
          `https://ipinfo.io/${clientIp}/json`
        );
        console.log("geoResponse", geoResponse);
        setCountry(geoResponse.data.country); // Lưu quốc gia
        console.log("Country:", geoResponse.data.country);
      } catch (error) {
        console.error("Error fetching IP or country:", error);
      }
    };

    fetchIp();
  }, []);

  useEffect(() => {
    if (selectedVariant?.image) {
      setSelectedVariantImage(selectedVariant.image);
    } else {
      setSelectedVariantImage(null);
    }
  }, [selectedVariant]);

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
        title: "Please select a color before adding to cart!",
      });
      return;
    }

    if (hasSize && !selectedAttributes["Size"]) {
      Toast.fire({
        icon: "error",
        title: "Please select a size before adding to cart!",
      });
      return;
    }

    if (hasType && !selectedAttributes["Type"]) {
      Toast.fire({
        icon: "error",
        title: "Please select a type before adding to cart!",
      });
      return;
    }

    // Tính toán giá sản phẩm
    const finalPrice = calculatePrice(product, selectedVariant, selectedColor);

    // Xử lý hình ảnh
    let productImage = "";
    if (selectedVariant && selectedVariant.image) {
      productImage = selectedVariant.image; // Lấy hình ảnh của variant nếu có
    } else if (product.product.images.length > 0) {
      productImage = urlImage + product.product.images[0]; // Lấy hình ảnh đầu tiên trong mảng images
    }
    console.log("productImage", productImage);
    // Tạo item để thêm vào giỏ hàng
    const cartItem = {
      id: product.product.id,
      name: product.product.name,
      image: productImage,
      slug: product.product.slug,
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
      title: "Product added to cart!",
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    // Nếu form hợp lệ, đóng modal và chuyển trang
    const modal = Modal.getInstance(document.getElementById("cartModal"));
    if (modal) {
      modal.hide();
    }

    // Sau khi đóng modal, chuyển sang trang checkout
    navigate("/checkout", {
      state: {
        cartItems,
        shippingCost,
        total,
        totalAmount: total + shippingCost,
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

  useEffect(() => {
    const calculateDeliveryDate = () => {
      const currentDate = new Date();
      const readyToShipInDays = 2; // 2 ngày chuẩn bị hàng

      // Tính ngày chuẩn bị hàng
      const readyDate = new Date(currentDate);
      readyDate.setDate(currentDate.getDate() + readyToShipInDays);

      let deliveryDaysMin, deliveryDaysMax;

      if (country === "US") {
        // Tính ngày giao hàng cho US
        deliveryDaysMin = 7; // Tối thiểu 7 ngày
        deliveryDaysMax = 13; // Tối đa 13 ngày
      } else if (country === "VN") {
        // Tính ngày giao hàng cho Việt Nam
        deliveryDaysMin = 3; // Tối thiểu 3 ngày
        deliveryDaysMax = 5; // Tối đa 5 ngày
      } else {
        // Tính ngày giao hàng cho các quốc gia khác
        deliveryDaysMin = 15; // Tối thiểu 15 ngày
        deliveryDaysMax = 18; // Tối đa 18 ngày
      }

      // Tính ngày giao hàng
      const deliveryStartDate = new Date(readyDate);
      deliveryStartDate.setDate(readyDate.getDate() + deliveryDaysMin);

      const deliveryEndDate = new Date(readyDate);
      deliveryEndDate.setDate(readyDate.getDate() + deliveryDaysMax);

      // Cập nhật state với ngày giao hàng
      setDeliveryStartDate(deliveryStartDate.toLocaleDateString());
      setDeliveryEndDate(deliveryEndDate.toLocaleDateString());
    };

    calculateDeliveryDate();
  }, [country]);

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

  const handleAddToCartAndShowModal = (e) => {
    e.preventDefault();

    if (!product) {
      Toast.fire({
        icon: "error",
        title: "Product does not exist!",
      });
      return;
    }

    const hasColor = colorAttribute && colorAttribute.values.length > 0;
    const hasSize = sizeAttribute && sizeAttribute.values.length > 0;
    const hasType = typeAttribute && typeAttribute.values.length > 0;

    if (hasColor && !selectedColor) {
      Toast.fire({
        icon: "error",
        title: "Please select a color before adding to cart!",
      });
      return;
    }

    if (hasSize && !selectedAttributes["Size"]) {
      Toast.fire({
        icon: "error",
        title: "Please select a size before adding to cart!",
      });
      return;
    }

    if (hasType && !selectedAttributes["Type"]) {
      Toast.fire({
        icon: "error",
        title: "Please select a type before adding to cart!",
      });
      return;
    }

    handleAddToCart();
    const modal = new Modal(document.getElementById("cartModal"));
    modal.show();
  };

  useEffect(() => {
    // Khởi tạo tất cả các popover
    const popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });

    // Cleanup function
    return () => {
      popoverList.forEach((popover) => {
        if (popover) {
          popover.dispose();
        }
      });
    };
  }, []); // Empty dependency array means this runs once on mount

  // Hàm lưu sản phẩm vào localStorage
  const saveToRecentlyViewed = (product) => {
    try {
      // Lấy danh sách sản phẩm đã xem từ localStorage
      const recentlyViewed = JSON.parse(
        localStorage.getItem("recentlyViewed") || "[]"
      );

      // Kiểm tra xem sản phẩm đã tồn tại trong danh sách chưa
      const existingIndex = recentlyViewed.findIndex(
        (p) => p.id === product.id
      );

      // Nếu sản phẩm đã tồn tại, xóa khỏi vị trí cũ
      if (existingIndex !== -1) {
        recentlyViewed.splice(existingIndex, 1);
      }

      // Thêm sản phẩm mới vào đầu danh sách
      recentlyViewed.unshift(product);

      // Giới hạn số lượng sản phẩm lưu trữ (tối đa 10 sản phẩm)
      if (recentlyViewed.length > 8) {
        recentlyViewed.pop();
      }

      // Lưu danh sách mới vào localStorage
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error("Error saving to recently viewed:", error);
    }
  };

  // Thêm state để quản lý trạng thái hiển thị modal size guide
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Thêm state để quản lý việc hiển thị dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedGuide, setSelectedGuide] = useState("Baseball Jackets");
  const [unit, setUnit] = useState("cm");

  const sizeGuides = [
    "Baseball Jackets",
    "Baseball Jerseys",
    "Baseball Tees",
    "High Top Sneakers",
    "Hockey Jerseys",
    "Hoodies",
    "Joggers",
    "Long Sleeves",
    "Men Comfort Colors Tee",
    "Men's Bomber Jackets",
    "men's boxer underwear",
    "Men's Pajamas Set",
    "Men's Sportswear Suits Tights Sets",
    "Men's Stand Collar Raglan Jackets",
    "Men's Cooling Performance Color Blocked Jersey",
    "Pajamas Long Sleeves Set",
    "Polo",
    "Shorts",
    "SweatShirts",
    "Tactical Hoodies",
    "Tank Tops",
    "T-Shirts",
    "Women's Underwear",
  ];

  // Lọc danh sách dựa trên searchText
  const filteredGuides = sizeGuides.filter((guide) =>
    guide.toLowerCase().includes(searchText.toLowerCase())
  );

  // Thêm hàm xử lý khi chọn item
  const handleSelectGuide = (guide) => {
    setSelectedGuide(guide);
    setIsDropdownOpen(false);
    setSearchText("");
  };

  // Thêm state để quản lý trạng thái activeButton
  const [activeButton, setActiveButton] = useState("Male");

  // Lấy measurements cho sản phẩm và gender hiện tại
  const getCurrentMeasurements = () => {
    return (
      productMeasurements[selectedGuide]?.[activeButton] || {
        sizes: ["S", "M", "L", "XL", "2XL"],
        types: ["SLEEVE LENGTH", "LENGTH", "1/2 BUST"],
      }
    );
  };

  // Lấy dữ liệu size chart cho sản phẩm, gender và đơn vị đo hiện tại
  const getCurrentSizeChart = () => {
    return sizeCharts[selectedGuide]?.[activeButton]?.[unit] || {};
  };

  return (
    <section className="content py-5">
      <div className="container">
        <div className="product-main-content">
          <div className="row">
            <div className="col-12 col-md-7 col-lg-7">
              <div
                className="carousel-container"
                style={{ position: "relative" }}
              >
                <div
                  id="productCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {product?.product?.images?.map((image, index) => (
                      <div
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                        key={index}
                      >
                        <img
                          src={
                            image.startsWith("images")
                              ? urlImage + image
                              : image
                          }
                          className="d-block w-100 rounded-2"
                          style={{ height: "100%", objectFit: "cover" }} // Đảm bảo hình ảnh chiếm toàn bộ carousel
                          alt={`Product image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="prev"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ đen
                      borderRadius: "50%", // Bo tròn nút
                      width: "40px", // Chiều rộng nút
                      height: "40px", // Chiều cao nút
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background-color 0.3s", // Hiệu ứng chuyển màu
                      position: "absolute", // Đặt vị trí tuyệt đối
                      top: "50%", // Đặt ở giữa theo chiều dọc
                      left: "10px", // Khoảng cách từ bên trái
                      transform: "translateY(-50%)", // Căn giữa theo chiều dọc
                      zIndex: 1, // Đảm bảo nút nằm trên hình ảnh
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "rgba(0, 0, 0, 0.8)")
                    } // Tối màu khi hover
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "rgba(0, 0, 0, 0.5)")
                    } // Trở lại màu ban đầu
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                      style={{
                        backgroundColor: "transparent", // Đảm bảo biểu tượng không có nền
                        width: "20px", // Kích thước biểu tượng
                        height: "20px", // Kích thước biểu tượng
                      }}
                    />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="next"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ đen
                      borderRadius: "50%", // Bo tròn nút
                      width: "40px", // Chiều rộng nút
                      height: "40px", // Chiều cao nút
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background-color 0.3s", // Hiệu ứng chuyển màu
                      position: "absolute", // Đặt vị trí tuyệt đối
                      top: "50%", // Đặt ở giữa theo chiều dọc
                      right: "10px", // Khoảng cách từ bên phải
                      transform: "translateY(-50%)", // Căn giữa theo chiều dọc
                      zIndex: 1, // Đảm bảo nút nằm trên hình ảnh
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "rgba(0, 0, 0, 0.8)")
                    } // Tối màu khi hover
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "rgba(0, 0, 0, 0.5)")
                    } // Trở lại màu ban đầu
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                      style={{
                        backgroundColor: "transparent", // Đảm bảo biểu tượng không có nền
                        width: "20px", // Kích thước biểu tượng
                        height: "20px", // Kích thước biểu tượng
                      }}
                    />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>

              {productId ? (
                <ProductRelated productId={productId} />
              ) : (
                <div className="text-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              )}
              <RecentlyViewedProducts />
            </div>

            <div className="col-md-5 col-12 col-lg-5">
              <div className="d-flex flex-column mb-3 product-info">
                <div className="p-2 product-title">
                  {product && product.product.name ? product.product.name : ""}
                </div>

                <div className="p-2">
                  {product?.pricing?.discount_info ? (
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
                          : product?.pricing?.base_price}
                      </span>
                    </>
                  ) : (
                    <span className="pricesale me-2">
                      ${" "}
                      {selectedVariant
                        ? Number(selectedVariant?.price || 0).toFixed(2)
                        : Number(product?.pricing?.base_price || 0).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="p-2 discount-name">
                  {product?.pricing?.discount_info &&
                    `${product.pricing.discount_info.discount_value}% OFF - ${product.pricing.discount_info.discount_name} `}
                </div>
                <div className="py-2 return-policy">
                  <button
                    type="button"
                    className="border-0 bg-transparent text-decoration-none"
                    style={{ color: "#258635" }}
                    data-bs-toggle="popover"
                    data-bs-trigger="focus"
                    title="Return this item for free"
                    data-bs-content="Free returns are available for the shipping address you chose. You can return the item for any reason in new and unused condition: no return shipping charges."
                  >
                    FREE Returns
                  </button>
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

                <div className="p-2 stock-info d-flex ">
                  <span className="me-auto p-2 text-success me-2">
                    <span className="fw-bold">✔</span> In Stock
                  </span>
                  <Link
                    to="#"
                    className="text-decoration-none mt-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSizeGuide(true);
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1437/1437317.png"
                      alt=""
                      style={{ width: "20px", height: "20px" }}
                    />{" "}
                    <span className="ms-2 text-success text-decoration-none">
                      View size guide
                    </span>
                  </Link>
                </div>

                {/* Thêm modal size guide */}
                <div
                  className={`modal fade ${showSizeGuide ? "show" : ""}`}
                  style={{ display: showSizeGuide ? "block" : "none" }}
                  tabIndex="-1"
                  aria-hidden={!showSizeGuide}
                  id="sizeGuideModal"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-center">
                          Size & Fit Info
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowSizeGuide(false)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p className="text-center">
                          If you're in between sizes, order a size up as our
                          items can shrink up to half a size in the wash.
                        </p>

                        <div className="d-flex gap-3 mb-4">
                          {["Male", "Female", "Youth", "Unisex", "Kids"].map(
                            (type) => (
                              <button
                                key={type}
                                style={{
                                  backgroundColor:
                                    activeButton === type ? "#2c1a5b" : "white",
                                  color:
                                    activeButton === type ? "white" : "#2c1a5b",
                                  border: `1px solid ${
                                    activeButton === type
                                      ? "#2c1a5b"
                                      : "#dee2e6"
                                  }`,
                                  transition: "all 0.3s ease",
                                }}
                                className="btn"
                                onClick={() => setActiveButton(type)}
                              >
                                {type}
                              </button>
                            )
                          )}
                        </div>

                        <div
                          style={{ position: "relative", maxWidth: "300px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            {/* Select dropdown */}
                            <div style={{ flex: 1, marginRight: "10px" }}>
                              <div
                                onClick={() =>
                                  setIsDropdownOpen(!isDropdownOpen)
                                }
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  backgroundColor: "white",
                                }}
                              >
                                <span>{selectedGuide}</span>
                                <i
                                  className={`fas fa-chevron-${
                                    isDropdownOpen ? "up" : "down"
                                  }`}
                                />
                              </div>
                            </div>

                            {/* Unit toggle buttons */}
                            <div style={{ display: "flex", gap: "4px" }}>
                              {["cm", "inches"].map((measureUnit) => (
                                <button
                                  key={measureUnit}
                                  className="btn btn-sm"
                                  onClick={() => setUnit(measureUnit)}
                                  style={{
                                    minWidth: "60px",
                                    backgroundColor:
                                      unit === measureUnit
                                        ? "#2c1a5b"
                                        : "white",
                                    color:
                                      unit === measureUnit
                                        ? "white"
                                        : "#2c1a5b",
                                    border: `1px solid ${
                                      unit === measureUnit
                                        ? "#2c1a5b"
                                        : "#dee2e6"
                                    }`,
                                    transition: "all 0.3s ease",
                                  }}
                                >
                                  {measureUnit}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Dropdown menu */}
                          {isDropdownOpen && (
                            <ul
                              id="sizeGuideMenu"
                              className="size-guide-list guide-menu"
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                zIndex: 1000,
                                display: "block",
                                maxHeight: "300px",
                                overflowY: "auto",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                padding: "0",
                                margin: "4px 0 0",
                                backgroundColor: "white",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            >
                              <li
                                id="find-size-guide"
                                className="guide-menu-item"
                                style={{
                                  padding: "10px",
                                  borderBottom: "1px solid #ddd",
                                }}
                              >
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Find size guide"
                                  value={searchText}
                                  onChange={(e) =>
                                    setSearchText(e.target.value)
                                  }
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ width: "100%" }}
                                />
                              </li>

                              {filteredGuides.map((guide, index) => (
                                <li
                                  key={index}
                                  className={`guide-menu-item ${
                                    selectedGuide === guide ? "selected" : ""
                                  }`}
                                  onClick={() => handleSelectGuide(guide)}
                                  style={{
                                    padding: "10px 15px",
                                    cursor: "pointer",
                                    backgroundColor:
                                      selectedGuide === guide
                                        ? "#f0f0f0"
                                        : "transparent",
                                    borderBottom: "1px solid #ddd",
                                    transition: "background-color 0.2s",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                      "#f8f9fa")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                      selectedGuide === guide
                                        ? "#f0f0f0"
                                        : "transparent")
                                  }
                                >
                                  <span className="guide-menu-item-link">
                                    {guide}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Product Measurements</th>
                                {getCurrentMeasurements().sizes.map((size) => (
                                  <th key={size}>{size}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {getCurrentMeasurements().types.map((type) => (
                                <tr key={type}>
                                  <td>{type}</td>
                                  {getCurrentSizeChart()[type]?.map(
                                    (value, index) => (
                                      <td key={index}>{value}</td>
                                    )
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thêm backdrop cho modal */}
                {showSizeGuide && (
                  <div
                    className="modal-backdrop fade show"
                    onClick={() => setShowSizeGuide(false)}
                  ></div>
                )}

                <div className="p-2 type-product">
                  {" "}
                  <div className="row">
                    {" "}
                    <div className="col-sm-10 d-flex justify-content-center">
                      {" "}
                      <button
                        onClick={handleAddToCartAndShowModal}
                        className="add-to-cart-btn"
                      >
                        <i className="fas fa-shopping-bag" /> Add to cart
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
                                <div className="table-responsive mt-3 ">
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
                                                  className="fas fa-store text-danger me-2 mt-3"
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
                                                        item.image.startsWith(
                                                          "images"
                                                        )
                                                          ? urlImage +
                                                            item.image
                                                          : item.image
                                                      }
                                                      width={100}
                                                    />
                                                    <div>
                                                      <div
                                                        className="item-title"
                                                        style={{
                                                          maxWidth: "250px",
                                                          overflow: "hidden",
                                                          textOverflow:
                                                            "ellipsis",
                                                          whiteSpace: "nowrap",
                                                          display: "block",
                                                        }}
                                                      >
                                                        <Link
                                                          to={`/product/${item.slug}`}
                                                          style={{
                                                            textDecoration:
                                                              "none",
                                                            color: "inherit",
                                                          }}
                                                        >
                                                          {item.name}
                                                        </Link>
                                                      </div>
                                                      <div>
                                                        {item.size
                                                          ? "Size: " + item.size
                                                          : ""}
                                                      </div>
                                                      <div>
                                                        {item.color
                                                          ? "Color: " +
                                                            item.color
                                                          : ""}
                                                      </div>
                                                      <div>
                                                        {item.type
                                                          ? "Type: " + item.type
                                                          : ""}
                                                      </div>
                                                      <div className="mt-2">
                                                        <Link
                                                          className="remove-item-cart text-danger"
                                                          to="#"
                                                          onClick={() =>
                                                            dispatch(
                                                              removeFromCart({
                                                                id: item.id,
                                                                color:
                                                                  item.color,
                                                                size: item.size,
                                                                type: item.type,
                                                                sellerId:
                                                                  item.seller_id,
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
                                                  <div className="text-success fw-bold">
                                                    $
                                                    {parseFloat(
                                                      item.price
                                                    ).toFixed(2)}
                                                  </div>
                                                </td>
                                                <td className="align-middle">
                                                  <div className="d-flex align-items-center">
                                                    <div
                                                      className="d-flex border border-secondary rounded"
                                                      style={{
                                                        width: "100%",
                                                        maxWidth: "150px",
                                                        minWidth: "100px",
                                                      }}
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
                                                              sellerId:
                                                                item.seller_id,
                                                            })
                                                          )
                                                        }
                                                        style={{
                                                          width: "33.33%",
                                                          height: "40px",
                                                          border: "none",
                                                          background: "none",
                                                          cursor: "pointer",
                                                          fontSize:
                                                            "calc(14px + 0.2vw)",
                                                          fontWeight: "bold",
                                                          padding: "0",
                                                          minWidth: "30px",
                                                        }}
                                                      >
                                                        -
                                                      </button>
                                                      <div
                                                        id="count"
                                                        className="d-flex justify-content-center align-items-center border-start border-end border-secondary"
                                                        style={{
                                                          width: "33.33%",
                                                          height: "40px",
                                                          fontSize:
                                                            "calc(14px + 0.2vw)",
                                                          fontWeight: "500",
                                                          minWidth: "30px",
                                                        }}
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
                                                              sellerId:
                                                                item.seller_id,
                                                            })
                                                          )
                                                        }
                                                        style={{
                                                          width: "33.33%",
                                                          height: "40px",
                                                          border: "none",
                                                          background: "none",
                                                          cursor: "pointer",
                                                          fontSize:
                                                            "calc(14px + 0.2vw)",
                                                          fontWeight: "bold",
                                                          padding: "0",
                                                          minWidth: "30px",
                                                        }}
                                                      >
                                                        +
                                                      </button>
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="subtotal text-danger fw-bold align-middle">
                                                  $
                                                  {parseFloat(
                                                    item.price * item.count
                                                  ).toFixed(2)}
                                                </td>
                                              </tr>
                                            </React.Fragment>
                                          ))}
                                        </React.Fragment>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              <div className="cart-actions">
                                <div className="row my-3">
                                  <div className="col-6">
                                    <button
                                      className="btn btn-danger"
                                      onClick={handleCheckout}
                                    >
                                      Checkout
                                    </button>
                                  </div>
                                  <div className="col-6">
                                    <button
                                      onClick={() => {
                                        const modal = Modal.getInstance(
                                          document.getElementById("cartModal")
                                        );
                                        if (modal) {
                                          modal.hide();
                                        }
                                        navigate("/cart");
                                      }}
                                      className="btn btn-primary"
                                    >
                                      View cart
                                    </button>
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
                      Don't love it? We'll fix it. For free.
                      <br />
                      <Link to="#" className="guarentee-link">
                        Bluprinter Guarantee
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
                <div className="p-2 type-product">
                  <div className="features-title">
                    Shipping and return policies
                  </div>
                  <div className="d-flex flex-row shipping-policy">
                    <div className="p-2">
                      {" "}
                      <img
                        alt="Delivery truck icon"
                        className="icon"
                        height={30}
                        src="https://cdn-icons-png.flaticon.com/128/9274/9274440.png"
                        width={30}
                      />{" "}
                    </div>
                    <div className="p-2">
                      {" "}
                      <span>
                        Deliver to <b>{country}</b>
                      </span>
                      <br />
                      <b>Standard</b> between {deliveryStartDate} -{" "}
                      {deliveryEndDate}
                      <br />
                      <b>Ready To Ship In</b>: 2 business days
                      <br />
                    </div>
                  </div>
                  <div className="d-flex flex-row shipping-policy">
                    <div className="p-2">
                      {" "}
                      <img
                        alt="Return policy icon"
                        className="icon"
                        height={30}
                        src="https://cdn-icons-png.flaticon.com/128/15178/15178178.png"
                        width={30}
                      />{" "}
                    </div>
                    <div className="p-2">
                      <p>
                        Eligible for{" "}
                        <Link
                          style={{ color: "#e2150c" }}
                          className="text-decoration-none"
                          to="/page/refund-policy"
                        >
                          Refund
                        </Link>{" "}
                        or{" "}
                        <Link
                          style={{ color: "#e2150c" }}
                          className="text-decoration-none"
                          to="/page/returns-exchanges-policy"
                        >
                          Return and Replacement
                        </Link>{" "}
                        within 30 days from the date of delivery
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="seller-info">
                    <div className="d-flex flex-row ">
                      <div className=" rounded-3 my-auto">
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
                          <div
                            className="title-design"
                            style={{ color: "#005366" }}
                          >
                            Designed and sold by
                          </div>
                          <div className="name">
                            <Link
                              style={{ color: "#e2150c" }}
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
                    productId && <ProductRelatedMobile productId={productId} />
                  )}
                </div>

                <div className="row">
                  <RecentlyViewed />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
