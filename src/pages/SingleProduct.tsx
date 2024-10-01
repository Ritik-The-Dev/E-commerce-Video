import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart, setCartState } from "../redux/features/cartSlice";
import { Product } from "../models/Product";
import RatingStar from "../components/RatingStar";
import PriceSection from "../components/PriceSection";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHandHoldingDollar } from "react-icons/fa6";
import ProductList from "../components/ProductList";
import Reviews from "../components/Reviews";
import { MdFavoriteBorder } from "react-icons/md";
import { addToWishlist } from "../redux/features/productSlice";

const lorem =
  "It is important to take care of the patient, to be followed by the patient, but it will happen at such a time that there is a lot of work and pain. For to come to the smallest detail, no one should practice any kind of work unless he derives some benefit from it. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come forth; they are in fault who abandon their duties and soften their hearts, that is, their labors.";

const SingleProduct: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productID } = useParams();
  const [product, setProduct] = useState<Product>();
  const [imgs, setImgs] = useState<string[]>();
  const [selectedImg, setSelectedImg] = useState<string>();
  const [sCategory, setScategory] = useState<string>();
  const [similar, setSimilar] = useState<Product[]>([]);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const items = useAppSelector((state) => state.cartReducer.cartItems);
  const wishlist = useAppSelector((state) => state.productReducer.wishlist);

  useEffect(() => {
    const fetchProductDetails = () => {
      fetch(`https://dummyjson.com/products/${productID}`)
        .then((res) => res.json())
        .then((data) => {
          const { thumbnail, images, category } = data;
          setProduct(data);
          setImgs(images);
          setScategory(category);
          setSelectedImg(thumbnail);
        });
    };
    fetchProductDetails();
  }, [productID]);

  useEffect(() => {
    const fetchPreferences = (cat: string) => {
      fetch(`https://dummyjson.com/products/category/${cat}`)
        .then((res) => res.json())
        .then((data) => {
          const _products: Product[] = data.products;
          const filtered = _products.filter((product) => {
            if (productID && product.id !== parseInt(productID)) return product;
          });
          setSimilar(filtered);
        });
    };
    if (sCategory && sCategory !== "") fetchPreferences(sCategory);
  }, [productID, sCategory]);

  const addCart = () => {
    if (isInCart) {
      dispatch(setCartState(true));
      return;
    }
    if (product)
      dispatch(
        addToCart({
          id: product.id,
          price: product.price,
          title: product.title,
          category: product.category,
          rating: product.rating,
          thumbnail: product.thumbnail,
          discountPercentage: product.discountPercentage,
          image: "",
          onLoad: () => {
            console.log("Image loaded");
          },
          onError: () => {
            console.log("Image failed to load");
          },
        })
      );
    toast.success("item added to cart successfully", {
      duration: 3000,
    });
  };

  const buyNow = () => {
    if (product)
      dispatch(
        addToCart({
          id: product.id,
          price: product.price,
          title: product.title,
          category: product.category,
          rating: product.rating,
          thumbnail: product.thumbnail,
          discountPercentage: product.discountPercentage,
          image: "",
          onLoad: () => {
            console.log("Buy Now loaded");
          },
          onError: () => {
            console.log("Buy Now failed to load");
          },
        })
      );
    dispatch(setCartState(true));
  };

  const addWishlist = () => {
    if (isInWishlist) {
      navigate("/wishlist");
      return;
    }
    if (product) {
      dispatch(addToWishlist(product));
      toast.success("item added to your wishlist", {
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    const ItemInCart = items.filter((e) => e.id.toString() === productID);
    setIsInCart(ItemInCart.length > 0);
  }, [items, productID]);

  // Check if the product is in the wishlist on component mount
  useEffect(() => {
    setIsInWishlist(
      wishlist.some((product) => product.id.toString() === productID)
    );
  }, [wishlist, productID]);

  return (
    <div className="container mx-auto pt-8 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4 font-karla">
        <div className="space-y-2">
          <img src={selectedImg} alt="selected" className="h-80" />
          <div className="flex space-x-1 items-center">
            {imgs &&
              imgs.map((_img) => (
                <img
                  src={_img}
                  key={_img}
                  alt="thumb"
                  className={`w-12 cursor-pointer hover:border-2 hover:border-black ${
                    _img === selectedImg ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setSelectedImg(_img)}
                />
              ))}
          </div>
        </div>
        <div className="px-2">
          <h2 className="text-2xl">{product?.title}</h2>
          {product?.rating && <RatingStar rating={product?.rating} />}
          <div className="mt-1">
            {product?.discountPercentage && (
              <PriceSection
                discountPercentage={product?.discountPercentage}
                price={product?.price}
              />
            )}
          </div>
          <table className="mt-2">
            <tbody>
              <tr>
                <td className="pr-2 font-bold">Brand</td>
                <td>{product?.brand}</td>
              </tr>
              <tr>
                <td className="pr-2 font-bold">Category</td>
                <td>{product?.category}</td>
              </tr>
              <tr>
                <td className="pr-2 font-bold">Stock</td>
                <td>{product?.stock}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <h2 className="font-bold">About the product</h2>
            <p className="leading-5">
              {product?.description} {lorem}
            </p>
          </div>
          <div className="flex flex-wrap items-center mt-4 mb-2 space-x-2">
            <button
              type="button"
              className={`flex items-center space-x-1 mb-2  p-2 rounded ${
                isInCart
                  ? "dark:bg-gray-100 dark:hover:bg-gray-400 hover:bg-gray-100 border-[1px] text-black border-black"
                  : " hover:bg-pink-700 bg-pink-500 text-white"
              }`}
              onClick={addCart}
            >
              <AiOutlineShoppingCart />
              <span>{isInCart ? "GO TO CART" : "ADD TO CART"}</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-1 mb-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              onClick={buyNow}
            >
              <FaHandHoldingDollar />
              <span>BUY NOW</span>
            </button>
            <button
              type="button"
              className={`flex items-center space-x-1 mb-2 p-2 rounded ${
                isInWishlist
                  ? "dark:bg-gray-100 dark:hover:bg-gray-400 hover:bg-gray-100 border-[1px] text-black border-black"
                  : "bg-yellow-500 hover:bg-yellow-700"
              }`}
              onClick={addWishlist}
            >
              <MdFavoriteBorder />
              <span>{isInWishlist ? "Go To Wishlist" : "ADD TO WISHLIST"}</span>
            </button>
          </div>
        </div>
      </div>
      {product && (
        <div className="mt-8 px-4">
          <div className="bg-white dark:bg-slate-600 dark:text-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Customer Reviews</h3>
            <Reviews id={product.id} />
          </div>
        </div>
      )}
      <hr className="mt-4" />
      <ProductList title="Similar Products" products={similar} />
      <br />
    </div>
  );
};

export default SingleProduct;
