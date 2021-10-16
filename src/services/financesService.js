import axios from "./connection";

const financesServices = {
  async getAllFinances() {
    return await axios.get("/finances/get");
  },
  async addFinance(data) {
    return await axios.post("/finances/add", data);
  },
  async deleteFinance(id) {
    return await axios.delete(`/finances/delete/${id}`);
  },
};

export default financesServices;
