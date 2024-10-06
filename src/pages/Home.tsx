import { FC, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import TrendingProducts from "../components/TrendingProducts";
import { useAppDispatch } from "../redux/hooks";
import {
  updateNewList,
  updateFeaturedList,
} from "../redux/features/productSlice";
import { Product } from "../interfaces/All_Interface";
import LatestProducts from "../components/LatestProducts";
import Banner from "../components/Banner";
import Marquee from "react-fast-marquee";
import WhyShopWithUs from "../components/WhyShowWithUs";
import { FETCH_PRODUCTS } from "../api/Api";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    FETCH_PRODUCTS(24).then(({ products }) => {
      const productList: Product[] = [];
      products.forEach((product: Product) => {
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
          onLoad: () => {
            console.log("Image loaded");
          },
          onError: () => {
            console.log("Image failed to load");
          },
        });
      });
      dispatch(updateFeaturedList(productList.slice(0, 8)));
      dispatch(updateNewList(productList.slice(8, 16)));
    });
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
