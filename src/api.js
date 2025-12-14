import axios from "axios";

export const analyzeProduct = async (url) => {
  const response = await axios.post("http://localhost:8000/analyze", { url });
  return response.data;
};