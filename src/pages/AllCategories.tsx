import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addCategories } from "../redux/features/productSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import {
  faPumpSoap,
  faCouch,
  faUtensils,
  faLaptop,
  faShirt,
  faShoePrints,
  faChargingStation,
  faMotorcycle,
  faMobileAlt,
  faDumbbell,
  faTabletAlt,
  faTshirt,
  faCar,
  faClock,
  faStore,
  faBagShopping,
  faBasketShopping,
  faGem,
} from "@fortawesome/free-solid-svg-icons"; // Import icons
import { fetchCategories } from "../api/Api";

const categoryIcons = {
  Fragrances: faPumpSoap,
  Furniture: faCouch,
  Groceries: faBasketShopping,
  "Kitchen Accessories": faUtensils,
  Laptops: faLaptop,
  "Mens Shirts": faShirt,
  "Mens Shoes": faShoePrints,
  "Mobile Accessories": faChargingStation,
  Motorcycle: faMotorcycle,
  Smartphones: faMobileAlt,
  "Sports Accessories": faDumbbell,
  Tablets: faTabletAlt,
  Tops: faTshirt,
  Vehicle: faCar,
  "Womens Bags": faBagShopping,
  "Womens Jewellery": faGem,
  "Womens Watches": faClock,
  Default: faStore, // Default icon
};

const AllCategories: FC = () => {
  const dispatch = useAppDispatch();

  const allCategories = useAppSelector(
    (state) => state.productReducer.categories
  );

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await fetchCategories();
        if (data) {
          dispatch(addCategories(data));
        }
      } catch (error:any) {
        console.log(`Error fetching Categories ${error}`);
      }
    };

    if (allCategories.length === 0) {
      fetchCategory();
    }
  }, [allCategories, dispatch]);

  return (
    <div className="container mx-auto min-h-[83vh] p-4 font-karla">
      <span className="text-lg dark:text-white">Categories</span>
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 my-2">
        {allCategories &&
          allCategories.map((category) => (
            <div
              key={category.slug}
              className="bg-gray-100 dark:bg-slate-600 dark:text-white px-4 py-4 font-karla mr-2 mb-2 flex flex-col items-center cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" // Changed to flex-col for vertical alignment
              onClick={() =>
                (window.location.href = `/category/${category.slug}`)
              } // Convert to button action
            >
              <FontAwesomeIcon
                icon={
                  categoryIcons[category.name as keyof typeof categoryIcons] ||
                  categoryIcons.Default
                }
                className="mb-2"
                size="2x"
              />
              <div className="text-lg">{category.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllCategories;
