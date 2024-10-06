import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import SingleProduct from "./pages/SingleProduct";
import Wishlist from "./pages/Wishlist";
import AllProducts from "./pages/AllProducts";
import ScrollToTopButton from "./components/ScrollToTopButton";
import BannerPopup from "./components/BannerPopup";
import AllCategories from "./pages/AllCategories";
import SingleCategory from "./pages/SingleCategory";
import { useEffect } from "react";
import { addToCart } from "./redux/features/cartSlice";
import { addToWishlist } from "./redux/features/productSlice";
import { CartItem } from "./interfaces/DataProvider";
import { useAppDispatch } from "./redux/hooks";
import { updateDarkMode } from "./redux/features/homeSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const darkMode = localStorage.getItem("isDarkMode") === "true";
    storedCart.forEach((element: CartItem) => {
      dispatch(addToCart(element));
    });
    storedWishlist.forEach((element: CartItem) => {
      dispatch(addToWishlist(element));
    });
    dispatch(updateDarkMode(darkMode));
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/product/:productID" element={<SingleProduct />} />
        <Route path="/category/:slug" element={<SingleCategory />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Footer />
      <Cart />
      <ScrollToTopButton />
      <BannerPopup />
    </>
  );
}

export default App;
