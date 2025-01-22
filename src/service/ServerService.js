import httpAxios from "../httpAxios";

const serverService = {
  getIp: () => {
    return httpAxios.get(`/get-ip`);
  },  
  
};

export default serverService;
