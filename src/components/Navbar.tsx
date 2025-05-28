import { FC, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setCartState } from "../redux/features/cartSlice";
import { Link } from "react-router-dom";
import { updateDarkMode } from "../redux/features/homeSlice";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Product } from "../interfaces/DataProvider";
import { getSearchProducts } from "../api/Api";
import toast from "react-hot-toast";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(
    (state) => state.cartReducer.cartItems.length
  );
  const isDarkMode = useAppSelector((state) => state.homeReducer.isDarkMode);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setSearchResults([]);
  }, []);

  const clearSearchResults = useCallback(() => {
    setSearchResults([]);
    setSearchTerm("");
  }, []);

  const handleProductClick = useCallback(
    (productId: number) => {
      clearSearch();
      navigate(`/product/${productId}`);
    },
    [clearSearch, navigate]
  );

  const showCart = () => {
    dispatch(setCartState(true));
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;
    try {
      const data = await getSearchProducts(searchTerm);
      if (data) {
        setSearchResults(data);
      }
    } catch (error: any) {
      toast.error(
        `Error fetching search results ${error.response.data.error}`,
        {
          position: "top-right",
        }
      );
    }
  };

  const navItems = [
    {
      id: 1,
      name: "Products",
      url: "/products",
      dataTest: "main-products",
      onClick: toggleDrawer,
    },
    {
      id: 2,
      name: "Categories",
      url: "/categories",
      dataTest: "main-categories",
      onClick: toggleDrawer,
    },
    {
      id: 3,
      name: "Wishlist",
      url: "/wishlist",
      dataTest: "main-wishlist",
      onClick: toggleDrawer,
    },
  ];
  return (
    <div className="py-4 bg-white dark:bg-slate-800 top-0 sticky z-10 shadow-lg font-karla">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-4xl font-bold dark:text-white"
            data-test="main-logo"
          >
            SHOPEASY
          </Link>
          <div className="lg:flex hidden w-full max-w-[500px]">
            <input
              type="text"
              placeholder="Search for a product..."
              className="border-2 border-blue-500 px-6 py-2 w-full dark:text-white dark:bg-slate-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <div
              className="bg-blue-500 text-white text-[26px] grid place-items-center px-4 cursor-pointer"
              onClick={handleSearch}
            >
              <BsSearch />
            </div>
          </div>
          <div className="hidden lg:flex gap-4 md:gap-8 items-center dark:text-white">
            {navItems.map((navItem) => (
              <Link
                key={navItem.id}
                to={navItem.url}
                className="text-xl font-bold"
                data-test={navItem.dataTest}
              >
                {navItem.name}
              </Link>
            ))}
            <div
              onClick={() => {
                dispatch(updateDarkMode(!isDarkMode));
                document.body.classList.toggle("dark");
              }}
            >
              {isDarkMode ? (
                <MdOutlineLightMode className="cursor-pointer" size={30} />
              ) : (
                <MdOutlineDarkMode className="cursor-pointer" size={30} />
              )}
            </div>
          </div>
          <div
            className="text-gray-500 text-[32px] relative hover:cursor-pointer hover:opacity-80"
            onClick={showCart}
            data-test="cart-btn"
          >
            <AiOutlineShoppingCart className="dark:text-white" />
            <div
              className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"
              data-test="cart-item-count"
            >
              {cartCount}
            </div>
          </div>
          <div className="lg:hidden flex items-center gap-4">
            <AiOutlineMenu
              className="text-gray-500 dark:text-white text-3xl cursor-pointer"
              onClick={toggleDrawer}
            />
          </div>
        </div>
      </div>
      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-end">
            <button
              onClick={toggleDrawer}
              className="text-gray-500 dark:text-white text-2xl"
            >
              &times;
            </button>
          </div>
          {/* Add search input to mobile drawer */}
          <div className="mt-4 mb-6">
            <div className="flex">
              <input
                type="text"
                placeholder="Search for a product..."
                className="border-2 border-blue-500 px-3 py-2 w-full text-sm dark:text-white dark:bg-slate-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="bg-blue-500 text-white px-3 py-2"
                onClick={handleSearch}
              >
                <BsSearch />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            {navItems.map((navItem) => (
              <Link
                key={navItem.id}
                to={navItem.url}
                className="text-xl font-bold dark:text-white"
                data-test={navItem.dataTest}
                onClick={navItem.onClick}
              >
                {navItem.name}
              </Link>
            ))}
            <div
              onClick={() => {
                dispatch(updateDarkMode(!isDarkMode));
                document.body.classList.toggle("dark");
              }}
            >
              {isDarkMode ? (
                <MdOutlineLightMode
                  className="cursor-pointer dark:text-white"
                  size={30}
                />
              ) : (
                <MdOutlineDarkMode
                  className="cursor-pointer dark:text-white"
                  size={30}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Display search results */}
      {searchTerm && (
        <div className="container mx-auto px-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold dark:text-white">
              Search Results:
            </h2>
            <button
              onClick={clearSearchResults}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
            >
              {/* Clear Search */}
              <AiOutlineClose />
            </button>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="border p-4 rounded dark:bg-slate-700 dark:text-white hover:shadow-md transition-shadow duration-200 cursor-pointer flex items-center"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-16 h-16 object-cover mr-4 rounded"
                  />
                  <div>
                    <h3 className="font-bold">{product.title}</h3>
                    <p className="line-clamp-2">{product.description}</p>
                    <p className="font-bold mt-2">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xl dark:text-white">No Results Found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
