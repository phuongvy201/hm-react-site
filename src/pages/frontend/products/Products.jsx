import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../../../service/ProductService";
import Product from "../../../components/Product";
import ReactPaginate from "react-paginate";
import Loading from "../../../components/Loading";

export default function Products() {
  const [pagination, setPagination] = useState({});
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(40);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts(page, perPage);
      if (response.data.success) {
        setProducts(response.data.data);
        setPagination(response.data.meta);
	console.log(response.data.data);
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
  }, [page]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="breadcrumb-link">
          <p className="text-center">Products</p>
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
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={pagination.last_page || 1}
              forcePage={pagination.current_page - 1}
              previousLabel="Previous"
              renderOnZeroPageCount={null}
              containerClassName="pagination pagination-sm flex-wrap"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              breakAfterClassName="break-after-hidden" 
              breakBeforeClassName="break-before-hidden" 
            />
          </div>
        )}

        {!error && products.length === 0 && (
          <div className="alert alert-info text-center" role="alert">
            Không có sản phẩm nào
          </div>
        )}
      </div>
    </>
  );
}
