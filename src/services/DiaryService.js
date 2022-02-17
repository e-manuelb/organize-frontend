import axios from "./Connection";

const diaryServices = {
  async saveDiary(data) {
    return await axios.post("/diary/", data);
  },
  async getDiaries() {
    return await axios.get("/diary/");
  },
  async searchDiary(id) {
    return await axios.get(`/diary/${id}`);
  },
  async updateDiary(id, data) {
    return await axios.patch(`/diary/${id}`, data);
  },
  async deleteDiary(id) {
    return await axios.delete(`/diary/${id}`);
  },
};

export default diaryServices;
