import { FC } from "react";
import { Product } from "../interfaces/DataProvider";
import ProductCard from "./ProductCard";

const ProductList: FC<{ title: string; products: Product[] }> = ({
  title,
  products,
}) => {
  // Handle image loading issues
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "/loader.svg"; // Add a fallback image
  };
  return (
    <>
      <style>{`
      /* Add this to your CSS file */
.custom-grid {
  grid-template-columns: repeat(1, 1fr); /* Default for <= 320px */
}

@media (min-width: 321px) and (max-width: 425px) {
  .custom-grid {
    grid-template-columns: repeat(2, 1fr); /* For > 320px and <= 425px */
  }
}

@media (min-width: 426px) {
  .custom-grid {
    grid-template-columns: repeat(4, 1fr); /* For > 425px */
  }
}
    `}</style>
      <div className="container mt-8 mx-auto px-4 dark:bg-slate-800">
        <div className="sm:flex items-center justify-center">
          <h2 className="text-4xl font-medium font-lora dark:text-white text-center">
            {title}
          </h2>
        </div>
        {/* <div
        className="grid gap-6 md:grid-cols-2 p-5 grid-col-1 lg:grid-cols-4 mt-4"
        data-test="product-list-container"
      >
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            image={
              product && product.images && product.images[1]
                ? product.images[1]
                : product.thumbnail
            }
            id={product.id}
            category={product.category}
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
            rating={product.rating}
            discountPercentage={product.discountPercentage}
            onLoad={() => {
              console.log("Image loaded");
            }}
            onError={() => {
              console.log("Image failed to load");
            }}
          />
        ))}
      </div> */}
        <div className="grid gap-4 mt-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {products.map((product) => (
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
    </>
  );
};

export default ProductList;
