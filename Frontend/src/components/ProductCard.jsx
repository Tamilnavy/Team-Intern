import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addToCart = async () => {
    await API.post("/cart", {
      productId: product._id,
      quantity: 1,
    });
    alert("Added to Cart");
  };

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await API.post("/wishlist", {
        productId: product._id,
      });
      setIsWishlisted(!isWishlisted);
      alert(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-xl transition flex flex-col h-full relative">

      {/* Flipkart style image format with Wishlist Icon */}
      <div className="w-full h-48 sm:h-56 mb-4 flex items-center justify-center overflow-hidden relative group bg-white">
        <button
          onClick={toggleWishlist}
          title="Add to Wishlist"
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white shadow-sm border border-gray-200 hover:scale-110 transition-transform focus:outline-none ${isWishlisted ? 'text-[#ff4343]' : 'text-gray-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill={isWishlisted ? "#ff4343" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        <img
          src={product.images?.[0] || "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/placeholder_fcebae.svg"}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h2 className="font-bold mt-2">{product.name}</h2>
      <p className="text-pink-600 font-semibold">₹{product.price}</p>
      <p className="text-pink-600 font-semibold">{product.description}</p>
      <p className="text-pink-600 font-semibold">Stock:{product.stock}</p>

      {/* Button container pushed to bottom */}
      <div className="flex gap-2 mt-auto pt-3">
        <Link
          to={`/product/${product._id}`}
          className="bg-gray-400 text-white px-3 py-1 rounded"
        >
          View
        </Link>
        <button
          onClick={addToCart}
          className="bg-pink-600 text-white px-3 py-1 rounded"
        >
          Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
