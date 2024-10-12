import axios from "axios";
import { Category, Product } from "../interfaces/DataProvider";

export const getSearchProducts = async (
  searchTerm: string
): Promise<Product[]> => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/search?q=${searchTerm}`
  );
  return data.products as Product[];
};

export const fetchProducts = async (limit: number): Promise<Product[]> => {
  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=${limit}`
  );
  return data.products as Product[];
};

export const fetchProductsByCategory = async (
  slug: string | undefined
): Promise<Product[]> => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/category/${slug}`
  );
  return data.products as Product[];
};

export const fetchProductDetail = async (
  productID: string | undefined
): Promise<Product | undefined> => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/${productID}`
  );
  return data as Product;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get("https://dummyjson.com/products/categories");
  return data as Category[];
};
