import { create } from "apisauce";
import { Product } from "../libs/constant/orderbook";

const api = create({
  baseURL: "https://api.bsx.exchange",
});

export const fetchProducts = async (): Promise<{ products: Product[] }> => {
  const response = await api.get<{ products: Product[] }>("/products");
  if (response.ok && response.data) {
    return response.data;
  } else {
    throw new Error("Failed to fetch products");
  }
};
