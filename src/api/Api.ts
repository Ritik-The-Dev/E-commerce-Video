import axios from "axios";

export const GET_SEARCH_PRODUCTS = async (searchTerm: string) => {
  try {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${searchTerm}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const FETCH_CATEGORIES = async () => {
  try {
    const { data } = await axios.get(
      "https://dummyjson.com/products/categories"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const FETCH_PRODUCTS = async (limit: number) => {
  try {
    const { data } = await axios.get(
      `https://dummyjson.com/products?limit=${limit}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const FETCH_PRODUCTS_BY_CATEGORY = async (slug: string | undefined) => {
  try {
    const { data } = await axios.get(
      `https://dummyjson.com/products/category/${slug}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const FETCH_PRODUCT_DETAIL = async (productID: string | undefined) => {
  try {
    const { data } = await axios.get(
      `https://dummyjson.com/products/${productID}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
