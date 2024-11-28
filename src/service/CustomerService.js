import httpAxios from "../httpAxios";

const customerService = {
  getCurrentCustomer: () => {
    return httpAxios.get(`/customer`);
  },
  updateCurrentUser: (data) => {
    return httpAxios.post(`/profile`, data);
  },
};

export default customerService;
