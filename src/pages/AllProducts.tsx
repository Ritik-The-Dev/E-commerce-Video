import { FC, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addProducts } from "../redux/features/productSlice";
import ProductCard from "../components/ProductCard";
import { Product } from "../interfaces/All_Interface";
import { FETCH_PRODUCTS } from "../api/Api";

const AllProducts: FC = () => {
  const dispatch = useAppDispatch();
  const sortRef = useRef<HTMLSelectElement>(null);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const allProducts = useAppSelector(
    (state) => state.productReducer.allProducts
  );
  const [offset, setOffset] =  useState<number>(50);

  // Fetch products and cache them
  useEffect(() => {
    const cachedProducts = localStorage.getItem("cachedProducts");
    const cachedTime = localStorage.getItem("cacheTime");

    if (
      cachedProducts &&
      cachedTime &&
      Date.now() - parseInt(cachedTime) < 86400000
    ) {
      dispatch(addProducts(JSON.parse(cachedProducts)));
    } else {
      FETCH_PRODUCTS(500).then(({ products }) => {
        localStorage.setItem("cachedProducts", JSON.stringify(products));
        localStorage.setItem("cacheTime", Date.now().toString());
        dispatch(addProducts(products));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (allProducts.length > 0) {
      console.log(currentProducts);
      setCurrentProducts(allProducts.slice(0, 50));
      setVisibleProducts(allProducts.slice(0, 50));
    }
  }, [allProducts]);

  // Load more products on scroll
  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.pageYOffset >=
      document.documentElement.scrollHeight - 500;
    if (bottom && offset < allProducts.length) {
      const newProducts = allProducts.slice(offset, offset + 50);
      setVisibleProducts((prev) => [...prev, ...newProducts]);
      setOffset((prevOffset) => prevOffset + 50);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, allProducts]);

  const sortProducts = (sortValue: string) => {
    if (sortValue === "asc") {
      setVisibleProducts(
        [...visibleProducts].sort((a, b) => {
          const aPrice =
            a.price - (a.price * (a.discountPercentage ?? 0)) / 100;
          const bPrice =
            b.price - (b.price * (b.discountPercentage ?? 0)) / 100;
          return aPrice - bPrice;
        })
      );
    } else if (sortValue === "desc") {
      setVisibleProducts(
        [...visibleProducts].sort((a, b) => {
          const aPrice =
            a.price - (a.price * (a.discountPercentage ?? 0)) / 100;
          const bPrice =
            b.price - (b.price * (b.discountPercentage ?? 0)) / 100;
          return bPrice - aPrice;
        })
      );
    } else {
      setVisibleProducts([...visibleProducts].sort((a, b) => a.id - b.id));
    }
  };

  // Handle image loading issues
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "/loader.svg"; // Add a fallback image
  };

  return (
    <div className="container mx-auto min-h-[83vh] p-4 font-karla">
      <div className="grid grid-cols-4 gap-1">
        <div className="col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="sm:flex items-center justify-center">
              <h2 className="text-4xl p-2 px-5 font-medium font-lora dark:text-white text-center">
                All Products
              </h2>
            </div>
            <select
              ref={sortRef}
              className="border border-black dark:border-white rounded p-1 dark:text-white dark:bg-slate-600"
              onChange={(e) => sortProducts(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="asc">Price (low to high)</option>
              <option value="desc">Price (high to low)</option>
            </select>
          </div>
          <div className="grid mt-5 gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                image={
                  product && product.images && product.images[1]
                    ? product.images[1]
                    : product.thumbnail
                }
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
