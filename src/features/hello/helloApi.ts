import { apiClient } from "../../services/apiClient";

export const sayHello = async (name: string) => {
  const response = await apiClient.get(`/api/hello?name=${name}`);
  return response.data;
};
