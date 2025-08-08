import { httpClient, API_URL } from "../http/httpClient";

export default class UserService {
  static async getUsers() {
    return httpClient.get(`${API_URL}/auth/users`);
  }
}
