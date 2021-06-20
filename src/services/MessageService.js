import axios from 'axios';

const http = axios.create({
  baseURL: "http://localhost:3000"
});

export default {

  get(id) {
    return http.get(`/messages/${id}`);
  },

  createMessage(message) {
    return http.post('/messages', message);
  },

  updateTheMessage(id, message) {
    return http.put(`/messages/${id}`, message);
  },

  deleteTheMessage(id) {
    return http.delete(`/messages/${id}`);
  }

}
