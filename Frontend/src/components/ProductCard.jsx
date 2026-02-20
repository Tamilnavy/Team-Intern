import { Link } from "react-router-dom";
import API from "../api/axios";

const ProductCard = ({ product }) => {

  const addToCart = async () => {
    await API.post("/cart", {
      productId: product._id,
      quantity: 1,
    });
    alert("Added to Cart");
  };

  const addToWishlist = async () => {
    await API.post("/wishlist", {
      productId: product._id,
    });
    alert("Added to Wishlist");
  };

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-xl transition">
      <img
        src={product.images[0]}
        className="h-40 w-full object-cover rounded"
      />
      <h2 className="font-bold mt-2">{product.name}</h2>
      <p className="text-pink-600 font-semibold">₹{product.price}</p>

      <div className="flex gap-2 mt-3">
        <Link
          to={`/product/${product._id}`}
          className="bg-gray-800 text-white px-3 py-1 rounded"
        >
          View
        </Link>

        <button
          onClick={addToCart}
          className="bg-pink-600 text-white px-3 py-1 rounded"
        >
          Cart
        </button>

        <button
          onClick={addToWishlist}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Wish
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
