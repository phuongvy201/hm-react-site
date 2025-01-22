import React, { useEffect, useState } from "react";
import ProductCardSm from "../../../components/ProductCardSm";

export default function RecentlyViewed() {
  const [viewedProducts, setViewedProducts] = useState([]);

  useEffect(() => {
    // Lấy sản phẩm từ localStorage
    const recentlyViewed = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );

    console.log("recentlyViewed", recentlyViewed);
    setViewedProducts(recentlyViewed);
  }, []);

  if (viewedProducts.length === 0) return null;

  return (
    <div className="container d-block d-md-none d-lg-none">
      <div className="popular-product">
        <h4>Recently viewed products</h4>
        <div
          className="products-scroll"
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: "10px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              gap: "15px",
            }}
          >
            {viewedProducts.map((product) => (
              <div
                key={product.id}
                style={{ width: "200px", flex: "0 0 auto" }}
              >
                <ProductCardSm product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
