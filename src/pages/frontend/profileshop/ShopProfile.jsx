import React, { useEffect, useState } from "react";
import shopProfileService from "../../../service/ShopProfileService";
import { Link, useParams } from "react-router-dom";
import { urlImage } from "../../../config";
import Product from "../../../components/Product";

export default function ShopProfile() {
  const [shopInfo, setShopInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { sellerId } = useParams();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  return (
    <div className="container">
      <div className="seller-profile">
        <div className="seller-banner">
          <img
            src={shopInfo?.shop?.banner_url || "default-banner-url"}
            alt="Banner"
            className="banner-img"
          />
        </div>
        <div className="seller-info">
          <div className="seller-avatar">
            <img
              src={shopInfo?.shop?.logo_url || "default-avatar-url"}
              alt="Avatar"
            />
          </div>
          <div className="seller-details">
            <h1 className="seller-name">{shopInfo.shopName}</h1>
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
            </div>
            <div className="seller-actions">
              <button className="btn-follow">
                <i className="fas fa-heart" />
                Follow
              </button>
              <button className="btn-contact">
                <i className="fas fa-envelope" />
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="shopprofile-content mt-4">
        <h2>Shop all items</h2>
        <div className="shopprofile-category-list">
          {categories.map((category) => (
            <div key={category.id} className="shopprofile-category-item">
              <img
                alt={`${category.name} items`}
                height={100}
                src={urlImage + "images/" + category.image}
                width={100}
              />
              <p>{category.name}</p>
            </div>
          ))}
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
