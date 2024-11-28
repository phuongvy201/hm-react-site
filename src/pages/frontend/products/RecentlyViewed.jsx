import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../../../service/ProductService";
import ProductCardSm from "../../../components/ProductCardSm";

export default function RecentlyViewed() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = localStorage.getItem("user");
  const customerId = user ? JSON.parse(user).id : null;

  const fetchProducts = async () => {
    if (!customerId) {
      setError("Vui lòng đăng nhập để xem sản phẩm đã xem");
      return;
    }

    try {
      setLoading(true);
      const response = await productService.getRecentlyViewedProducts(
        customerId
      );
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="container">
      <div className="recently-viewed">
        <h4 className="component-heading">Shop Popular Products </h4>
        <div className="row">
          {products.map((product) => (
            <ProductCardSm key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
