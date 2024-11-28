import React, { useEffect, useState } from "react";
import productService from "../../../service/ProductService";
import Product from "../../../components/Product";

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
            <h4 className="component-heading">Related Products</h4>
            <div className="row">
              {relatedProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
