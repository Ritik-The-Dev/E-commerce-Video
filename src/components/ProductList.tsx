import { FC } from "react";
import { Product } from "../interfaces/DataProvider";
import ProductCard from "./ProductCard";

const ProductList: FC<{ title: string; products: Product[] }> = ({
  title,
  products,
}) => {
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
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
