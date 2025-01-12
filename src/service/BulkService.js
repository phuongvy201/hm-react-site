import httpAxios from "../httpAxios";

const bulkService = {
  submitForm: (data) => {
    return httpAxios.post(`/submit-form`, data);
  },
};

export default bulkService;
