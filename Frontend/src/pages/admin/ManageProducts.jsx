import { useEffect, useState } from "react";
import API from "../../api/axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Product Image */}
            {p.images && p.images.length > 0 && (
              <img
                src={p.images[0]}
                alt={p.name}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.brand}</p>

              <p className="mt-2 text-gray-700">
                {p.description}
              </p>

              <p className="mt-2 font-semibold text-green-600">
                ₹{p.price}
              </p>

              <p className="text-sm text-gray-500">
                Stock: {p.stock}
              </p>

              <p className="text-sm text-blue-600">
                Category: {p.category?.name}
              </p>

              <button
                onClick={() => deleteProduct(p._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;