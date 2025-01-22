import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import productService from "../../../service/ProductService";
import Product from "../../../components/Product";
import ReactPaginate from "react-paginate";
import Loading from "../../../components/Loading";
import categoryService from "../../../service/CategoryService";

export default function ProductCategory() {
  const [pagination, setPagination] = useState({});
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [childCategories, setChildCategories] = useState([]);
  const [error, setError] = useState("");
  const { slug, setSlug } = useParams();
  const productListRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProductsByCategory(
        slug,
        page,
        perPage
      );
      if (response.data.success) {
        console.log(response.data.data);
        setProducts(response.data.data.products);
        setCategoryName(response.data.data.category.name);
        setPagination(response.data.data.pagination);
     
      }
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchChildCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getChildCategories(slug);
      if (response.data.success) {
        setChildCategories(response.data.data);
      }
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    navigate(`/category/${selectedValue}`);
    setPage(1);
  };
  useEffect(() => {
    fetchProducts();
    fetchChildCategories();
  }, [page, slug]);

  // Xử lý khi chuyển trang
  const handlePageClick = (event) => {
    setPage(event.selected + 1);

    // Cuộn đến vị trí của danh sách sản phẩm
    if (productListRef.current) {
      productListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="breadcrumb-link">
          <p className="result text-center my-3 fs-5">
            {categoryName} <span>({pagination.total} result)</span>
          </p>
        </div>

        <div className="container-right ">
          <div className="filters">
            <div className="d-flex justify-content-end filters-scroll">
              {childCategories.length > 0 && (
                <select
                  className="filter-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All categories</option>
                  {childCategories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div
            ref={productListRef}
            className="product-container-occasions mt-2"
          >
            <div className="row">
              {error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                products.map((product) => (
                  <Product key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
        {!error && products.length > 0 && (
          <div className="pagination-wrapper d-flex justify-content-center my-4 ">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pagination.total_pages || 1}
              previousLabel="First"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              breakClassName="page-item"
              breakLinkClassName="page-link"
            />
          </div>
        )}
        {!error && products.length === 0 && (
          <div className="alert alert-info text-center" role="alert">
            No products in this category
          </div>
        )}
       
      </div>
    </>
  );
}
