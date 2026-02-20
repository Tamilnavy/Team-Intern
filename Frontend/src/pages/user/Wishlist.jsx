import { useEffect, useState } from "react";
import API from "../../api/axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState({ products: [] });

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get("/wishlist");
      setWishlist(data);
    } catch (error) {
      console.log("Wishlist error:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeItem = async (id) => {
    await API.delete(`/wishlist/${id}`);
    fetchWishlist();
  };

  const addToCart = async (id) => {
    await API.post("/cart", { productId: id, quantity: 1 });
    alert("Added to cart");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.products.length === 0 ? (
        <p className="text-gray-600">Wishlist is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.products.map((p) => (
            <div key={p._id} className="bg-white shadow rounded p-4">
              {p.images?.length > 0 && (
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="h-40 w-full object-cover mb-3"
                />
              )}

              <h3 className="font-bold">{p.name}</h3>
              <p>₹{p.price}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => addToCart(p._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => removeItem(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;