import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    stock: "",
  });

  //  Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  //  Handle input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.put(`/products/${id}`, product);

    alert("Product Updated Successfully");
    navigate("/admin/products");
  };

  return (
    <AdminLayout>
        <div className="min-h-screen bg-pink-50 px-6 py-10">
    <div className="min-h-screen  p-8">
      <div className="max-w-lg mx-auto bg-pink-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-pink-600">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="Product Name"
          />

          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="Brand"
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="Description"
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="Price"
          />

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="Stock"
          />

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700"
          >
            Update Product
          </button>

        </form>
      </div>
    </div>
    </div>
    </AdminLayout>
  );
};

export default EditProduct;