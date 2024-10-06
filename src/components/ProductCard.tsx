import { FC, useState, useEffect } from "react";
import { Product } from "../interfaces/DataProvider";
import RatingStar from "./RatingStar";
import { addToCart, setCartState } from "../redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import PriceSection from "./PriceSection";
import { FaHeart } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/features/productSlice";
import { CartItem } from "../interfaces/DataProvider";

const ProductCard: FC<Product> = ({
  id,
  price,
  thumbnail,
  onLoad = () => {},
  onError = () => {},
  title,
  category,
  rating,
  discountPercentage,
  image = [],
}) => {
  const dispatch = useAppDispatch();
  const [imageToShow, setImageToShow] = useState<string | undefined>(thumbnail); // Default to thumbnail
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const items = useAppSelector((state) => state.cartReducer.cartItems);
  const wishlist = useAppSelector((state) => state.productReducer.wishlist);

  // Preload hover image
  useEffect(() => {
    const imgSrc = typeof image === "string" ? image : ""; // Default to an empty string if not a string
    if (imgSrc) {
      const img = new Image();
      img.src = imgSrc;
    }
  }, [image]);

  // Check if the product is in the wishlist on component mount
  useEffect(() => {
    setIsInWishlist(wishlist.some((product) => product.id === id));
  }, [wishlist, id]);

  const addCart = () => {
    if (isInCart) {
      dispatch(setCartState(true));
      return;
    }

    // Define the product
    const product: CartItem = {
      id,
      price,
      title,
      category,
      rating,
      thumbnail,
      discountPercentage,
      image: "",
      onLoad: () => {
        console.log("Image loaded");
      },
      onError: () => {
        console.log("Image failed to load");
      },
    };

    // Dispatch addToCart action
    dispatch(addToCart(product));

    // Show a success toast
    toast.success("Item added to cart successfully", {
      duration: 3000,
    });
    setIsInCart(true);
  };

  const addWishlist = () => {
    const product = {
      id,
      price,
      title,
      category,
      rating,
      thumbnail,
      discountPercentage,
      image: Array.isArray(image) ? "" : image,
      onLoad: () => {
        console.log("Image loaded");
      },
      onError: () => {
        console.log("Image failed to load");
      },
    };

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      setIsInWishlist(false);
      toast.success("Item removed from your wishlist", {
        duration: 3000,
      });
    } else {
      dispatch(addToWishlist(product));
      setIsInWishlist(true);
      toast.success("Item added to your wishlist", {
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    const ItemInCart = items.filter((e) => e.id === id);
    setIsInCart(ItemInCart.length > 0);
  }, [items, id]);

  const handleMouseEnter = () => {
    setImageToShow(image as string | undefined);
  };

  const handleMouseLeave = () => {
    setImageToShow(thumbnail);
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div
        className="relative h-full font-lato bg-white  rounded-lg dark:bg-opacity-5 group"
        data-test="product-card"
      >
        <div className="absolute top-2 right-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-20 ">
          <div
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg cursor-pointer p-2"
            onClick={addWishlist}
          >
            <FaHeart
              className={`text-2xl ${
                isInWishlist ? "text-red-500" : "text-gray-500"
              }`}
            />
          </div>
        </div>
        <div className="text-center">
          <Link to={{ pathname: `/product/${id}` }}>
            <img
              src={imageToShow}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              alt={title}
              loading="eager"
              onLoad={onLoad}
              onError={onError}
              className="inline-block p-5 h-[300px] w-[358px] object-cover transition-transform duration-200 hover:scale-110"
            />
          </Link>
        </div>
        <div className="px-8 pt-4 text-center">
          <p className="text-gray-500 text-[14px] font-medium dark:text-white">
            {category}
          </p>
          <Link
            className="font-semibold hover:underline dark:text-white"
            to={{ pathname: `/product/${id}` }}
          >
            {title}
          </Link>
        </div>
        <div className="flex items-center justify-center ">
          <RatingStar rating={rating} />
        </div>
        <div className="flex items-center justify-center ">
          {discountPercentage && (
            <PriceSection
              discountPercentage={discountPercentage}
              price={price}
            />
          )}
        </div>
        <div className="flex items-center p-2 justify-center  opacity-0 group-hover:opacity-100">
          <button
            type="button"
            className={`flex items-center space-x-2 py-2 px-4 rounded border ${
              isInCart
                ? "bg-white text-black border-black"
                : "bg-black text-white border-white"
            } hover:bg-white hover:text-black hover:border-black`}
            onClick={addCart}
            data-test="add-cart-btn"
          >
            <AiOutlineShoppingCart />
            <span>{isInCart ? "GO TO CART" : "ADD TO CART"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
