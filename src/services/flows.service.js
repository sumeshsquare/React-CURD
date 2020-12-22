import http from "../http-common";

class FlowsDataService {
  getAll() {
    return http.get("/flows");
  }

  get(id) {
    return http.get(`/flows/${id}`);
  }

  create(data) {
    return http.post("/flows", data);
  }

  update(id, data) {
    return http.put(`/flows/${id}`, data);
  }

  delete(id) {
    return http.delete(`/flows/${id}`);
  }

  deleteAll() {
    return http.delete(`/flows`);
  }

  findByFlow(flow) {
    return http.get(`/flows/${flow}`);
  }
}

export default new FlowsDataService();