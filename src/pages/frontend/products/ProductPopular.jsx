import React, { useState, useEffect } from "react";
import Product from "../../../components/Product";
import loadingimg from "../../../assets/imgs/circle-1700_256.gif";
import productService from "../../../service/ProductService";

export default function ProductPopular() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getBestSellingProducts();
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
      <div className="popular-product">
        <h4 className="component-heading">Shop Popular Products </h4>
        <div className="row">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
