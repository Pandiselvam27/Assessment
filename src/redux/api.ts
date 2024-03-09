import axios from "axios";
import { Model } from "../type";

export const getModelService = async () => {
  const response = await axios.get("http://localhost:8000/logos");
  return response.data;
};

export const submitModelService = async (payload: Model) => {
  const response = await axios.post(`http://localhost:8000/models`, payload);
  return response.data;
};

export const getAllProductsService = async () => {
  const response = await axios.get('http://localhost:8000/models');
  return response.data;
};
