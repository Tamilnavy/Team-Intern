import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await API.get("/categories");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setForm({ ...form, images: e.target.files });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("brand", form.brand);
    formData.append("description", form.description);
    formData.append("category", form.category);  // 🔥 category ID
    formData.append("price", form.price);
    formData.append("stock", form.stock);

    if (form.images) {
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }
    }

    await API.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Product Added Successfully");
    navigate("/admin/products");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form onSubmit={submit} className="grid gap-3 max-w-md">
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="border p-2"
          required
        />

        <input
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          className="border p-2"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2"
        />

        {/* 🔥 Category Dropdown */}
        <select
          name="category"
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="border p-2"
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleChange}
          className="border p-2"
          required
        />

        <input
          type="file"
          name="images"
          multiple
          onChange={handleChange}
          className="border p-2"
        />

        <button className="bg-green-600 text-white p-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;