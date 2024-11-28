import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import productService from "../../../service/ProductService";
import Product from "../../../components/Product";
import ReactPaginate from "react-paginate";
import Loading from "../../../components/Loading";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [pagination, setPagination] = useState({});
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(40);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const keyword = searchParams.get("keyword") || "";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.search(keyword, page, perPage);
      if (response.data.success) {
        setProducts(response.data.data);
        setPagination(response.data.meta);
      }
    } catch (err) {
      setError("Unable to load products");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) {
      fetchProducts();
    } else {
      setProducts([]);
      setPagination({});
    }
  }, [keyword, page]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="breadcrumb-link">
          <p className="text-center">Search results for: "{keyword}"</p>
        </div>

        <div className="container-right mt-5">
          <div className="product-container-occasions mt-2">
            <div className="row">
              {error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                products?.map((product) => (
                  <Product key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>

        {!error && products.length > 0 && (
          <div className="pagination-wrapper d-flex justify-content-center my-4">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pagination.last_page || 1}
              forcePage={pagination.current_page - 1}
              previousLabel="Previous"
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
            No products found matching "{keyword}"
          </div>
        )}
      </div>
    </>
  );
}
