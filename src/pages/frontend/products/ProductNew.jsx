import React, { useEffect, useState } from "react";
import Product from "../../../components/Product";
import productService from "../../../service/ProductService";

export default function ProductNew() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getNewProducts();
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
      <div className="explore-product">
        <h4 className="component-heading">New products</h4>
        <div className="row">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
