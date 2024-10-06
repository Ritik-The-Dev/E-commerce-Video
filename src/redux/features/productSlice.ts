import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/DataProvider";

const initialState: ProductSlice = {
  allProducts: [],
  categories: [],
  newProducts: [],
  featuredProducts: [],
  wishlist: [],
};

interface Category {
  name: string;
  slug: string;
  url: string;
}

interface ProductSlice {
  allProducts: Product[];
  newProducts: Product[];
  featuredProducts: Product[];
  wishlist: Product[];
  categories: Category[];
}

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    updateNewList: (state, action: PayloadAction<Product[]>) => {
      return { ...state, newProducts: action.payload };
    },
    updateFeaturedList: (state, action: PayloadAction<Product[]>) => {
      return { ...state, featuredProducts: action.payload };
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const { wishlist } = state;
      if (wishlist.findIndex((item) => item.id === action.payload.id) === -1) {
        const updatedList = [...state.wishlist, action.payload];
        localStorage.setItem("wishlist", JSON.stringify(updatedList));
        return { ...state, wishlist: updatedList };
      }
    },
    addCategories: (state, action: PayloadAction<Category[]>) => {
      return { ...state, categories: action.payload };
    },
    addProducts: (state, action: PayloadAction<Product[]>) => {
      return { ...state, allProducts: action.payload };
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      localStorage.setItem(
        "wishlist",
        JSON.stringify(
          state.wishlist.filter((item) => item.id !== action.payload)
        )
      );
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      };
    },
    clearWishlist: (state) => {
      localStorage.setItem("wishlist", JSON.stringify([]));
      return { ...state, wishlist: [] }; // Clears the wishlist
    },
  },
});

export const {
  updateNewList,
  updateFeaturedList,
  addToWishlist,
  addCategories,
  addProducts,
  removeFromWishlist,
  clearWishlist,
} = productSlice.actions;
export default productSlice.reducer;
