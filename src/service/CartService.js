import httpAxios from "../httpAxios";

const cartService = {
  addToCart: (cartItems) => {
    return httpAxios.post(`/cart`, cartItems);
  },
  countItems: () => {
    return httpAxios.get(`/cart/count`);
  },
  getCart: () => {
    return httpAxios.get(`/cart`);
  },
  updateQuantity: (itemId, quantity) => {
    return httpAxios.post(`/cart/update-quantity`, { itemId, quantity });
  },
  removeFromCart: (itemId) => {
    return httpAxios.delete(`/cart/${itemId}`);
  },
  clearCart: () => {
    return httpAxios.delete(`/cart`);
  },
};

export default cartService;
