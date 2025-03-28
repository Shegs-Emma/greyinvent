import { CreateTodoInterface } from "@/components/utils/interface";
import axios from "axios";

// export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const API_URL = "https://jsonplaceholder.typicode.com/";

export default class TodosService {
  static async fetchTodos() {
    return axios.get(`${API_URL}todos?_limit=50`);
  }

  static async createTodo(data: CreateTodoInterface) {
    return axios.post(`${API_URL}todos`, data);
  }
}
