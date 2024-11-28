import httpAxios from "../httpAxios";

const orderService = {
  createOrder: (data) => {
    return httpAxios.post(`/orders`, data);
  },
  getCustomerOrders: () => {
    return httpAxios.get(`/orders`);
  },
  getShippings: () => {
    return httpAxios.get(`/shippings`);
  },
  createShipping: (data) => {
    return httpAxios.post(`/shippings`, data);
  }
};
export default orderService;
