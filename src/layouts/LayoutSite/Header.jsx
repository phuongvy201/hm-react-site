import { Link, useNavigate } from "react-router-dom";
import authService from "../../service/AuthService";
import { useEffect, useState } from "react";
import NavigationHeader from "../../components/NavigationHeader";
import productService from "../../service/ProductService";
import Product from "../../components/Product";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/imgs/bluprinter logo.png";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeywordMobile, setSearchKeywordMobile] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();
  var cartItems = useSelector((state) => state.cart.sellers);

  // Giả sử `cartItems` là mảng các seller, mỗi seller có mảng `items`
  const totalItems = cartItems.reduce((total, seller) => {
    // Duyệt qua tất cả items trong mỗi seller và cộng số lượng của từng item
    return (
      total +
      seller.items.reduce((itemTotal, item) => itemTotal + item.count, 0)
    );
  }, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchKeyword.trim())}`);
    }
  };
  const handleLogout = async () => {
    try {
      // Lấy token từ localStorage

      // Gọi API đăng xuất
      await authService.logout();

      // Xóa token khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Chuyển hướng về trang login
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  // Tạo component cho dropdown menu
  const renderDropdownMenu = () => {
    if (token) {
      return (
        <div className="dropdown-menu-header mt-2">
          <div className="d-flex flex-row align-items-center">
            <div className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                ></path>
              </svg>
            </div>
            <div className="p-2">
              <Link to="/myaccount">Profile</Link>
            </div>
          </div>

          {/* <div className="d-flex flex-row align-items-center">
            <div className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
              </svg>
            </div>
            <div className="p-2">
              <Link to="/wishlist">Wishlist</Link>
            </div>
          </div> */}

          <div className="d-flex flex-row align-items-center">
            <div className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-box-seam"
                viewBox="0 0 16 16"
              >
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"></path>
              </svg>
            </div>
            <div className="p-2">
              <Link to="/myorder">My order</Link>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center">
            <div className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-door-open"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"></path>
                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"></path>
              </svg>
            </div>
            <div className="p-2">
              <Link to="#" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="dropdown-menu-header mt-2">
          <div className="d-flex flex-row align-items-center">
            <div className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-box-arrow-in-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                ></path>
              </svg>
            </div>
            <div className="p-2">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      );
    }
  };

  // Tạo component cho mobile menu
  const renderMobileMenu = () => {
    if (token) {
      return (
        <div className="offcanvas-body">
          <div className="user-item-mobile ">
            <i className="fas fa-user" />
            <Link className="text-decoration-none text-dark" to="/myaccount">
              <span>Profile</span>
            </Link>
          </div>
          {/* <div className="user-item-mobile position-relative">
            <i className="fas fa-heart" />
            <Link className="text-decoration-none text-dark" to="/wishlist">
              <span>Wishlist</span>
            </Link>
          </div> */}
          <div className="user-item-mobile">
            <i className="fas fa-box" />
            <Link className="text-decoration-none text-dark" to="/myorder">
              <span>My order</span>
            </Link>
          </div>
          <div className="user-item-mobile">
            <i className="fas fa-key" />
            <Link
              className="text-decoration-none text-dark"
              to="/changepassword"
            >
              <span>Change Password</span>
            </Link>
          </div>
          <div className="user-item-mobile" onClick={handleLogout}>
            <i className="fas fa-door-open" />
            <span>Logout</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="offcanvas-body">
          <div className="user-item-mobile">
            <i className="fas fa-sign-in-alt" />
            <Link className="text-decoration-none text-dark" to="/login">
              <span>Login</span>
            </Link>
          </div>
        </div>
      );
    }
  };

  // Sửa lại hàm handleMobileSearch
  const handleMobileSearch = async (keyword) => {
    if (keyword.trim().length > 0) {
      setIsSearching(true);
      try {
        const response = await productService.search(keyword.trim(), 1, 10);
        if (response.data.success) {
          setSearchResults(response.data.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Chi tiết lỗi tìm kiếm:", error.response || error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <section className="header">
        <div className="container">
          <div className="row align-items-center py-2 justify-content-center">
            {/* Phần điều hướng mới cho điện thoại */}
            <NavigationHeader />
            <div className="header-logo col-4 col-sm-3 col-md-3">
              <Link className="" to="/">
                <img className="img-logo  w-100" src={logo} alt="logo" />
              </Link>
            </div>
            <form
              onSubmit={handleSearch}
              className="header-search col-12 col-sm-7 col-md-7 d-none d-sm-flex justify-content-center"
            >
              <div className="search-container w-100">
                <input
                  type="text"
                  value={searchKeyword}
                  className="border-0"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search products and designs"
                />
                <button type="submit" className="border-0 bg-transparent">
                  <i className="fas fa-search icon-search" />
                </button>
              </div>
            </form>
            {/* Button trigger modal */}

            <form
              onSubmit={handleSearch}
              className="header-search-mobile col-2 d-block d-sm-none d-flex justify-content-center"
            >
              <button
                className="btn-search"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <input type="text" placeholder="Olivia rodrigo" />
                <img
                  style={{ width: 24, height: 24 }}
                  src="https://img.icons8.com/?size=50&id=7695&format=png"
                  alt=""
                />
              </button>
              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-fullscreen">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="search-bar-mobile">
                        <input
                          value={searchKeywordMobile}
                          onChange={(e) => {
                            setSearchKeywordMobile(e.target.value);
                            handleMobileSearch(e.target.value); // Gọi hàm search khi người dùng gõ
                          }}
                          placeholder="Search products and designs"
                          type="text"
                        />
                        <button
                          type="button"
                          className="border-0 bg-transparent"
                        >
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      {isSearching ? (
                        <div className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">
                              Đang tìm kiếm...
                            </span>
                          </div>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="search-results">
                          <div className="container-right">
                            <div className="product-container-occasions">
                              <div className="row">
                                {searchResults.map((product) => (
                                  <Product product={product} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        searchKeywordMobile.trim() !== "" && (
                          <div
                            className="alert alert-info text-center"
                            role="alert"
                          >
                            No product found for "{searchKeywordMobile}"
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="header-quicklink col-4 col-md-2 col-lg-2 row">
              {/* Account Icon with dropdown menu */}
              {/* <div className="col-lg-4 order-tracking">
                <div className="text-center position-relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width={26}
                    height={26}
                    fill="currentColor"
                    x={0}
                    y={0}
                    viewBox="0 0 32 32"
                    style={{ enableBackground: "new 0 0 512 512" }}
                  >
                    <g>
                      <path
                        d="M25 17a1 1 0 0 0 .861-.492C26.553 15.334 30 9.362 30 7c0-2.757-2.243-5-5-5s-5 2.243-5 5c0 2.362 3.447 8.334 4.139 9.508A1 1 0 0 0 25 17zm0-13c1.654 0 3 1.346 3 3 0 1.16-1.6 4.438-3 6.978-1.4-2.54-3-5.819-3-6.978 0-1.654 1.346-3 3-3z"
                        fill="currentColor"
                        data-original="currentColor"
                      />
                      <circle
                        cx={25}
                        cy={7}
                        r={2}
                        fill="currentColor"
                        data-original="currentColor"
                      />
                      <path
                        d="M25 18a1 1 0 0 0-1 1v4.356l-9 4.09V16.645l5.414-2.461a1 1 0 1 0-.828-1.82L14 14.9 5.417 11 14 7.099l3.587 1.63a1 1 0 1 0 .828-1.82l-4.001-1.82a1.002 1.002 0 0 0-.828 0l-11 5A.999.999 0 0 0 2 11v13c0 .393.229.748.586.91l11 5a1.002 1.002 0 0 0 .828 0l11-5A1 1 0 0 0 26 24v-5a1 1 0 0 0-1-1zM4 12.553l9 4.09v10.804l-9-4.09z"
                        fill="currentColor"
                        data-original="currentColor"
                      />
                    </g>
                  </svg>
                  <div className="text-item">Tracking</div>
                </div>
              </div> */}
              <div className="col-6 col-md-6 col-lg-4 d-none d-sm-block ">
                <div className="dropdown text-center position-relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                  {renderDropdownMenu()}
                  <div className="text-item text-dark">Account</div>
                </div>
              </div>
              <div className="col-6 d-block d-sm-none text-center d-flex justify-content-center">
                <button
                  className="btn-user-mobile"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottom"
                  aria-controls="offcanvasBottom"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                </button>
                <div
                  className="offcanvas offcanvas-bottom"
                  tabIndex={-1}
                  id="offcanvasBottom"
                  aria-labelledby="offcanvasBottomLabel"
                >
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasBottomLabel">
                      Account Options
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    />
                  </div>
                  {renderMobileMenu()}
                </div>
              </div>
              <div className="col-6 col-md-6 col-lg-4">
                <div className="text-center position-relative">
                  <Link className="text-decoration-none text-dark" to="/cart">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      className="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                  </Link>
                  <div className="cart-badge">{totalItems}</div>
                  <div className="text-item">Cart</div>
                </div>
              </div>

              {/* Cart Icon */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
