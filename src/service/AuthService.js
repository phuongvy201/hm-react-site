import httpAxios from "../httpAxios";

const authService = {
  login: (data) => {
    return httpAxios.post(`/login`, data);
  },
  logout: () => {
    return httpAxios.post(`/logout`);
  },
  register: (data) => {
    return httpAxios.post(`/register`, data);
  },
  changePassword: (data) => {
    return httpAxios.post(`/change-password`, data);
  },
};

export default authService;
