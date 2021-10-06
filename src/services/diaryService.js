import axios from "./connection";

const diaryServices = {
  async saveDiary(data) {
    return await axios.post("/diary/add", data);
  },
  async searchDiary(data) {
    return await axios.get("/diary/search");
  },
};

export default diaryServices;
