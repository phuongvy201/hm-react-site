import React, { useEffect, useState } from "react";
import Product from "../../../components/Product";

export default function HomeRecentlyViewedProducts() {
  const [viewedProducts, setViewedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerView = 4;

  useEffect(() => {
    // Lấy sản phẩm từ localStorage
    const recentlyViewed = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );

    console.log("recentlyViewed", recentlyViewed);
    setViewedProducts(recentlyViewed);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(
        prevIndex + productsPerView,
        viewedProducts.length - productsPerView
      )
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - productsPerView, 0));
  };

  if (viewedProducts.length === 0) return null;

  return (
    <div className="container d-none d-md-block d-lg-block mt-4">
      <div className="popular-product" style={{ position: "relative" }}>
        <h4 className="component-heading">Recently viewed products</h4>
        <div className="position-relative">
          <div className="row">
            {viewedProducts
              .slice(currentIndex, currentIndex + productsPerView)
              .map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </div>
          {viewedProducts.length > productsPerView && (
            <div
              style={{
                position: "absolute",
                width: "100%",
                top: "30%",
                transform: "translateY(-50%)",
                display: "flex",
                justifyContent: "space-between",
                pointerEvents: "none",
              }}
            >
              <button
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #ddd",
                  cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "auto",
                  transition: "all 0.3s ease",
                  opacity: currentIndex === 0 ? 0.5 : 1,
                  left: "-20px",
                  position: "absolute",
                }}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #ddd",
                  cursor:
                    currentIndex >= viewedProducts.length - productsPerView
                      ? "not-allowed"
                      : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "auto",
                  transition: "all 0.3s ease",
                  opacity:
                    currentIndex >= viewedProducts.length - productsPerView
                      ? 0.5
                      : 1,
                  right: "-20px",
                  position: "absolute",
                }}
                onClick={handleNext}
                disabled={
                  currentIndex >= viewedProducts.length - productsPerView
                }
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
