import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../interfaces/All_Interface";
import ProductCard from "../components/ProductCard";
import { FETCH_PRODUCTS_BY_CATEGORY } from "../api/Api";

const SingleCategory: FC = () => {
  const { slug } = useParams();
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    FETCH_PRODUCTS_BY_CATEGORY(slug).then(({ products }) => {
      setProductList(products);
    });
  }, [slug]);

  return (
    <div className="container mx-auto min-h-[83vh] p-4 font-karla">
      <div className="flex items-center space-x-2 text-lg dark:text-white">
        <span>Categories</span>
        <span> {">"} </span>
        <span className="font-bold">{slug}</span>
      </div>
      <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-2">
        {productList?.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            image={
              product && product.images && product.images[1]
                ? product.images[1]
                : product.thumbnail
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SingleCategory;
