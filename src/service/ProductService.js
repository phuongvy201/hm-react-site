import httpAxios from "../httpAxios";

const productService = {
  getNewProducts: () => {
    return httpAxios.get(`/products-new`);
  },
  getBestSellingProducts: () => {
    return httpAxios.get(`/products-best-selling`);
  },
  getRecentlyViewedProducts: (customerId) => {
    return httpAxios.get(`/products/recently-viewed/${customerId}`);
  },
  getProductDetailBySlug: (slug) => {
    return httpAxios.get(`/products-detail/${slug}`);
  },
  getRelatedProducts: (productId) => {
    return httpAxios.get(`/products/related/${productId}`);
  },
  getProductsBySameSeller: (productId) => {
    return httpAxios.get(`/products/same-seller/${productId}`);
  },
  getProductsByCategory: (slug, page, perPage) => {
    return httpAxios.get(
      `/categories/${slug}/products?page=${page}&per_page=${perPage}`
    );
  },
  getAllProducts: (page, perPage) => {
    return httpAxios.get(`/products?page=${page}&per_page=${perPage}`);
  },
  search: (keyword, page, perPage) => {
    return httpAxios.get(
      `/products-search?keyword=${keyword}&page=${page}&per_page=${perPage}`
    );
  },
};

export default productService;
