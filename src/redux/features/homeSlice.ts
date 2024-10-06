import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: HomeSlice = {
  isBannerVisible: true,
  isDarkMode: false,
};

interface HomeSlice {
  isBannerVisible: boolean;
  isDarkMode: boolean;
}

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    updateBanner: (state, action: PayloadAction<boolean>) => {
      return { ...state, isBannerVisible: action.payload };
    },
    updateDarkMode: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem("isDarkMode", JSON.stringify(action.payload));
      return { ...state, isDarkMode: action.payload };
    },
  },
});

export const { updateBanner, updateDarkMode } = homeSlice.actions;
export default homeSlice.reducer;
