import { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-sm">This is a E-commerce website whose main purpose is to teach viewers how to build a E-commerce website using React.</p>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm">
            <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-300">Products</Link></li>
            <li><Link to="/categories" className="hover:text-blue-300">Categories</Link></li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <p className="text-sm mb-2">Follow us on social media:</p>
          {/* Add social media icons/links here */}
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Shopify. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;