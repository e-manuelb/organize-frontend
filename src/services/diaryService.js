import axios from "./connection";

const diaryServices = {
  async saveDiary(data) {
    return await axios.post("/diary/add", data);
  },
  async getDiaries() {
    return await axios.get("/diary/get");
  },
  async searchDiary(id) {
    return await axios.get("/diary/search");
  },
};

export default diaryServices;
