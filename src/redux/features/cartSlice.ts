import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../interfaces/DataProvider";

interface CartSlice {
  cartOpen: boolean;
  cartItems: CartItem[];
}

const initialState: CartSlice = {
  cartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { cartItems } = state;
      if (cartItems.findIndex((pro) => pro.id === action.payload.id) === -1) {
        const item = { ...action.payload, quantity: 1 };
        localStorage.setItem("cart", JSON.stringify([...cartItems, item]));
        return { ...state, cartItems: [...cartItems, item] };
      } else {
        const updatedItems = cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity && item.quantity + 1 }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return { ...state, cartItems: updatedItems };
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const { cartItems } = state;
      const updatedItems = cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { ...state, cartItems: updatedItems };
    },
    reduceFromCart: (state, action: PayloadAction<number>) => {
      const { cartItems } = state;
      const _item = cartItems.find((item) => item.id === action.payload);
      if (_item?.quantity && _item?.quantity > 1) {
        const updatedList = cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity && item.quantity - 1 }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedList));
        return { ...state, cartItems: updatedList };
      } else {
        const updatedItems = cartItems.filter(
          (item) => item.id !== action.payload
        );
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return { ...state, cartItems: updatedItems };
      }
    },
    setCartState: (state, action: PayloadAction<boolean>) => {
      return { ...state, cartOpen: action.payload };
    },
    emptyCart: (state) => {
      localStorage.setItem("cart", JSON.stringify([]));
      return { ...state, cartItems: [] };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCartState,
  reduceFromCart,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
