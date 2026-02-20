import { useEffect, useState } from "react";
import API from "../../api/axios";

const Cart = () => {
  const [cart, setCart] = useState({ products: [], totalAmount: 0 });

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");
      setCart(data);
    } catch (error) {
      console.log("Cart error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);
    fetchCart();
  };

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    await API.put(`/cart/${id}`, { quantity: qty });
    fetchCart();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart 🛒</h2>

      {cart.products.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-xl text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDE - PRODUCTS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.products.map((item) => {
              if (!item.product) return null;

              return (
                <div
                  key={item.product._id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row gap-4"
                >
                  {/* Product Image */}
                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {item.product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Brand: {item.product.brand}
                    </p>

                    <p className="text-pink-600 font-bold mt-2 text-lg">
                      ₹{item.priceSnapshot}
                    </p>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQty(item.product._id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        −
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(item.product._id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-red-500 mt-3 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="bg-white rounded-xl shadow p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{cart.totalAmount}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{cart.totalAmount}</span>
            </div>

            <button className="w-full bg-pink-600 text-white py-3 rounded-lg mt-6 hover:bg-pink-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;