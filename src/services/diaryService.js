import axios from "./connection";

const diaryServices = {
  async saveDiary(data) {
    return await axios.post("/diary/add", data);
  },
  async getDiaries() {
    return await axios.get("/diary/get");
  },
  async searchDiary(id) {
    return await axios.get(`/diary/search/${id}`);
  },
  async updateDiary(id, data) {
    return await axios.patch(`/diary/update/${id}`, data);
  },
  async deleteDiary(id) {
    return await axios.delete(`/diary/delete/${id}`);
  },
};

export default diaryServices;
