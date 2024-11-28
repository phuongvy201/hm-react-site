import httpAxios from "../httpAxios";

const categoryService = {
  getParentCategories: () => {
    return httpAxios.get(`/categories/parent`);
  },
  getAllParentCategories: () => {
    return httpAxios.get(`/categories/all-parent`);
  },
  getChildCategories: (slug) => {
    return httpAxios.get(`/categories/${slug}/child`);
  },
};

export default categoryService;
