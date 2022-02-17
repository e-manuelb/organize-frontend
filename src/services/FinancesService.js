import axios from "./Connection";

const financesServices = {
  async getAllFinances() {
    return await axios.get("/finances/get");
  },
  async getFinanceByID(id) {
    return await axios.get(`/finances/search/${id}`);
  },
  async addFinance(data) {
    return await axios.post("/finances/add", data);
  },
  async updateFinance(id, data) {
    return await axios.patch(`/finances/update/${id}`, data);
  },
  async deleteFinance(id) {
    return await axios.delete(`/finances/delete/${id}`);
  },
};

export default financesServices;
