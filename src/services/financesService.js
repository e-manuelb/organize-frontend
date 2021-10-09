import axios from "./connection";

const financesServices = {
  async searchFinances() {
    return await axios.get("/finances/search");
  },
};

export default financesServices;
