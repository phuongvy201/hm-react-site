import React, { useEffect, useState } from "react";
import shopProfileService from "../../../service/ShopProfileService";
import { Link, useParams } from "react-router-dom";
import { urlImage } from "../../../config";
import Product from "../../../components/Product";
import Swal from "sweetalert2";

export default function ShopProfile() {
  const [shopInfo, setShopInfo] = useState([]);
  const [idShop, setIdShop] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const { sellerId } = useParams();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await shopProfileService.getShopInfo(
          sellerId,
          currentPage
        );
        if (response.data.success) {
          setShopInfo(response.data.data);
          setCategories(Object.values(response.data.data.categories));
          setTotalPages(response.data.data.products.last_page);
          setIdShop(response.data.data.shop.id);
          console.log(response.data.data.shop.id);
        }
      } catch (error) {
        setError("Không thể tải thông tin shop");
        console.error("Error fetching shop data:", error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchShopData();
  }, [sellerId, currentPage]);
  useEffect(() => {
    const checkFollowStatus = async () => {
      if (idShop) {
        try {
          const response = await shopProfileService.checkFollow(idShop);
          console.log(response.data.is_following);
          setIsFollowing(response.data.is_following);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    checkFollowStatus();
  }, [idShop]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };
  const handleFollow = async () => {
    try {
      const response = await shopProfileService.follow(idShop);
      setIsFollowing(true);
      Toast.fire({ icon: "success", title: "Successfully followed the shop!" });
    } catch (error) {
      console.error("Error:", error);
      Toast.fire({ icon: "error", title: "Error following the shop!" });
    }
  };
  const handleUnfollow = async () => {
    try {
      const response = await shopProfileService.unfollow(idShop);
      setIsFollowing(false);
      Toast.fire({
        icon: "success",
        title: "Successfully unfollowed the shop!",
      });
    } catch (error) {
      console.error("Error:", error);
      Toast.fire({ icon: "error", title: "Error unfollowing the shop!" });
    }
  };
  return (
    <div className="container">
      <div className="seller-profile py-4">
        <div className="seller-banner">
          <img
            src={urlImage + shopInfo?.shop?.banner_url || "default-banner-url"}
            alt="Banner"
            className="banner-img"
          />
        </div>
        <div className="seller-info">
          <div className="seller-avatar">
            <img
              src={urlImage + shopInfo?.shop?.logo_url || "default-avatar-url"}
              alt="Avatar"
            />
          </div>
          <div className="seller-details">
            <h1 className="seller-name mt-2">{shopInfo?.shop?.name}</h1>
            <div className="seller-stats">
              <div className="stat-item">
                <span className="stat-number">
                  {shopInfo?.shop?.followers_count}
                </span>
                <span className="stat-label">Followers</span>
              </div>

              <div className="stat-item">
                <span className="stat-number">
                  {shopInfo?.shop?.products_count}
                </span>
                <span className="stat-label">Products</span>
              </div>
              {token !== null ? (
                <div className="seller-actions">
                  <button
                    className="btn-follow"
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                  >
                    <i className="fas fa-heart" />
                    {isFollowing===true ? "Unfollow" : "Follow"}
                  </button>
                  {/* <button className="btn-contact">
                 <i className="fas fa-envelope" />
                 Contact
               </button> */}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="product-container-occasions mt-4">
        <div className="row">
          {shopInfo?.products?.data?.map((product) => (
            <Product product={product} />
          ))}
        </div>
      </div>
      <div className="blog-pagination-container">
        <hr />
        <div className="blog-pagination">
          <Link
            to="#"
            className="arrow"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageClick(currentPage - 1);
            }}
          >
            &larr;
          </Link>

          {getPageNumbers().map((page) => (
            <span
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => handlePageClick(page)}
              style={{ cursor: "pointer" }}
            >
              {page}
            </span>
          ))}

          <Link
            to="#"
            className="arrow"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageClick(currentPage + 1);
            }}
          >
            &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
