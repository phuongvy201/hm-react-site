import React, { useEffect, useState } from "react";
import productService from "../../../service/ProductService";
import Product from "../../../components/Product";
import ProductCardSm from "../../../components/ProductCardSm";

export default function ProductRelatedMobile({ productId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
  return (
    <div className="container d-block d-md-none d-lg-none">
      <div className="popular-product">
        {relatedProducts && relatedProducts.length > 0 ? (
          <>
            <h4 >Products you'll love!</h4>
            <div
              className="products-scroll"
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE and Edge
                paddingBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  gap: "15px",
                }}
              >
                {relatedProducts.map((product) => (
                  <div
                    key={product.id}
                    style={{ width: "200px", flex: "0 0 auto" }}
                  >
                    <ProductCardSm product={product} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
