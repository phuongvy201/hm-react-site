import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryService from "../../service/CategoryService";
import { urlImage } from "../../config";

export default function CategoryHome() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getParentCategories();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (err) {
      setError("Không thể tải danh sách danh mục");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="container">
      <div className="list-home-category row">
        {categories.map((category) => (
          <div className="col-6 col-md-6 col-lg-4 mt-4">
            <div className="category-item mx-auto">
              <img
                src={urlImage + category.image}
                alt="category"
                style={{ height: "280px", objectFit: "cover", width: "100%" }}
              />
              <Link
                to={`/category/${category.slug}`}
                className="text-category  py-2 rounded-pill"
              >
                {category.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
