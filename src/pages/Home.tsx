import { FC, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import TrendingProducts from "../components/TrendingProducts";
import { useAppDispatch } from "../redux/hooks";
import {
  updateNewList,
  updateFeaturedList,
} from "../redux/features/productSlice";
import { Product } from "../interfaces/DataProvider";
import LatestProducts from "../components/LatestProducts";
import Banner from "../components/Banner";
import Marquee from "react-fast-marquee";
import WhyShopWithUs from "../components/WhyShopWithUs";
import { fetchProducts } from "../api/Api";
import toast from "react-hot-toast";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  const fetchProduct = async () => {
    try {
      const data = await fetchProducts(24);
      if (data) {
        const productList: Product[] = [];
        data.forEach((product: Product) => {
          productList.push({
            id: product.id,
            title: product.title,
            images: product.images,
            price: product.price,
            rating: product.rating,
            thumbnail: product.thumbnail,
            description: product.description,
            category: product.category,
            discountPercentage: product.discountPercentage,
            image: "",
          });
        });
        dispatch(updateFeaturedList(productList.slice(0, 8)));
        dispatch(updateNewList(productList.slice(8, 16)));
      }
    } catch (error: any) {
      toast.error(`Error Fetching Products ${error}`, {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [dispatch]);

  return (
    <div className="dark:bg-slate-800">
      <Marquee className="bg-yellow-300 text-black font-bold">
        Summer Sale: 70% off select items
      </Marquee>
      <div style={{ margin: "10px 0" }}>
        <HeroSection />
      </div>
      <div style={{ margin: "10px 0" }}>
        <Features />
      </div>
      <div style={{ margin: "10px 0" }}>
        <TrendingProducts />
      </div>
      <div style={{ margin: "10px 0" }}>
        <Banner />
      </div>
      <div style={{ margin: "10px 0" }}>
        <LatestProducts />
      </div>
      <div style={{ margin: "10px 0" }}>
        <WhyShopWithUs />
      </div>
      <br />
    </div>
  );
};

export default Home;
