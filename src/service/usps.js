import httpAxios from "../httpAxios";

const uspsService = {
  validateAddress: (address) => {
    return httpAxios.post(`/api/usps/validate-address`, address);
  },
  calculateShipping: (data) => {
    return httpAxios.post(`/api/usps/prices`, data);
  },
  createPickup: (pickupDetails) => {
    return httpAxios.post(`/api/usps/pickup`, pickupDetails);
  },
};

export default uspsService;
