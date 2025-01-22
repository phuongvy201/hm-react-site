import React, { useEffect, useState } from "react";
import productService from "../../../service/ProductService";
import Product from "../../../components/Product";
import ProductCardSm from "../../../components/ProductCardSm";
import ProductCardCol3 from "../../../components/ProductCardCol3";

export default function ProductRelated({ productId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerView = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        window.scrollTo(0, 0);

        // Chỉ fetch related products sau khi có product.id
        const relatedResponse = await productService.getRelatedProducts(
          productId
        );
        if (relatedResponse.data.success) {
          setRelatedProducts(relatedResponse.data.data);
        }
      } catch (err) {
        setError("Không thể tải sản phẩm");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(
        prevIndex + productsPerView,
        relatedProducts.length - productsPerView
      )
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - productsPerView, 0));
  };

  return (
    <div className="container d-none d-md-block d-lg-block">
      <div className="popular-product" style={{ position: "relative" }}>
        {relatedProducts && relatedProducts.length > 0 ? (
          <>
            <h4 className="component-heading">Products you'll love!</h4>
            <div className="position-relative">
              <div className="row">
                {relatedProducts
                  .slice(currentIndex, currentIndex + productsPerView)
                  .map((product) => (
                    <ProductCardCol3 key={product.id} product={product} />
                  ))}
              </div>
              {relatedProducts.length > productsPerView && (
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    top: "35%",
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
                        currentIndex >= relatedProducts.length - productsPerView
                          ? "not-allowed"
                          : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "auto",
                      transition: "all 0.3s ease",
                      opacity:
                        currentIndex >= relatedProducts.length - productsPerView
                          ? 0.5
                          : 1,
                      right: "-20px",
                      position: "absolute",
                    }}
                    onClick={handleNext}
                    disabled={
                      currentIndex >= relatedProducts.length - productsPerView
                    }
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
