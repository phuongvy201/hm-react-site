import React, { useEffect, useState } from "react";
import productService from "../../../service/ProductService";
import Product from "../../../components/Product";

export default function ProductSameSeller({ productId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Chỉ fetch related products sau khi có product.id
        const sameSellerResponse = await productService.getProductsBySameSeller(
          productId
        );
        if (sameSellerResponse.data.success) {
          setRelatedProducts(sameSellerResponse.data.data);
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
    <div className="container d-none d-md-block d-lg-block">
      <div className="popular-product">
        {relatedProducts && relatedProducts.length > 0 ? (
          <>
            <h4 className="component-heading">Shop Product Popular</h4>
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
