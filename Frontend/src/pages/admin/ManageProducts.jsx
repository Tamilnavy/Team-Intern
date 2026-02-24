import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";


const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (



    <AdminLayout>
      <div className="min-h-screen bg-pink-50 px-6 py-10">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

          <div className=" grid md:grid-cols-1 lg:grid-cols-3 gap-5">
            {products.map((p) => (

              <div
                key={p._id}
                className="border p-4 rounded-lg shadow hover:shadow-xl transition flex flex-col h-full relative bg-white"
              >
                {/* Flipkart style image format */}
                <div className="w-full h-48 sm:h-56 mb-4 flex items-center justify-center overflow-hidden relative group bg-white">
                  <img
                    src={p.images?.[0] }
                    alt={p.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h2 className="font-bold mt-2">{p.name}</h2>
                <p className="text-pink-600 font-semibold">₹{p.price}</p>
                <p className="text-pink-600 font-semibold">{p.description}</p>
                <p className="text-pink-600 font-semibold">Stock:{p.stock}</p>

                {/* Button container pushed to bottom */}
                <div className="flex gap-2 mt-auto pt-3">
                  <button
                    onClick={() => navigate(`/admin/edit-product/${p._id}`)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-pink-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>

    </AdminLayout>
  );
};

export default ManageProducts;