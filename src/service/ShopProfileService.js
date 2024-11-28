import httpAxios from "../httpAxios";

const shopProfileService = {
  getShopInfo: (sellerId, page) => {
    return httpAxios.get(`products/shopprofile/${sellerId}?page=${page}`);
  },
};

export default shopProfileService;
