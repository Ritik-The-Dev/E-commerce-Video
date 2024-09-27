import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks"; // Import useAppDispatch
import { clearWishlist } from "../redux/features/productSlice"; // Import the action to clear the wishlist
import ProductList from "../components/ProductList";

const Wishlist: FC = () => {
  const dispatch = useAppDispatch(); // Initialize dispatch
  const wishlist = useAppSelector((state) => state.productReducer.wishlist);

  const handleClearWishlist = () => {
    dispatch(clearWishlist()); // Dispatch action to clear the wishlist
  };

  return (
    <div className="container mx-auto font-karla min-h-[83vh]">
      <button
        onClick={handleClearWishlist}
        className="mb-4 p-2 bg-red-500 text-white rounded mt-10"
      >
        Clear Wishlist
      </button>
      {wishlist.length > 0 ? (
        <ProductList title="Your Wishlist" products={wishlist} />
      ) : (
        <div className="flex flex-col justify-center items-center p-8">
          <img src="/emptyCart.jpg" className="w-60" alt="empty" />
          <p className="text-center text-xl font-semibold my-2 dark:text-white">
            Your wishlist is empty
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
