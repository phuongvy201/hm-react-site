import httpAxios from "../httpAxios";

const shopProfileService = {
  getShopInfo: (sellerId, page) => {
    return httpAxios.get(`products/shopprofile/${sellerId}?page=${page}`);
  },
  follow: (shopId) => {
    return httpAxios.post(`follow`, { followed_shop_id: shopId });
  },
  unfollow: (shopId) => {
    return httpAxios.post(`unfollow`, { followed_shop_id: shopId });
  },
  checkFollow: (shopId) => {
    return httpAxios.get(`check-follow`, {
      params: { followed_shop_id: shopId },
    });
  },
};

export default shopProfileService;
