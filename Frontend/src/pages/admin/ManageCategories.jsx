import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const fetchCategories = async () => {
    const { data } = await API.get("/categories");
    setCategories(data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);



  const handleEditClick = (category) => {
    setEditingCategory(category._id);
    setFormData({
      name: category.name,
      description: category.description,
    });
  };



  const handleUpdate = async (e) => {
    e.preventDefault();

    await API.put(`/categories/${editingCategory}`, formData);
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    fetchCategories();
  };


  const handleDelete = async (id) => {
    await API.delete(`/categories/${id}`);
    fetchCategories();
  };

  const handleAddCategory = async (e) => {
  e.preventDefault();

  await API.post("/categories", formData);
  setFormData({ name: "", description: "" });
  fetchCategories();
};


  return (
    <AdminLayout>
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-3xl font-bold mb-8 text-pink-600">
        Manage Categories
      </h2>

      {/* add categories */}
      {/* ADD CATEGORY FORM */}
<form
  onSubmit={handleAddCategory}
  className="bg-white border p-6 rounded-xl shadow-lg mb-8 space-y-4"
>
  <h3 className="text-xl font-semibold text-pink-600">
    Add New Category
  </h3>

  <input
    type="text"
    value={formData.name}
    onChange={(e) =>
      setFormData({ ...formData, name: e.target.value })
    }
    className="w-full p-3 border rounded focus:outline-pink-400"
    placeholder="Category Name"
    required
  />

  <textarea
    value={formData.description}
    onChange={(e) =>
      setFormData({ ...formData, description: e.target.value })
    }
    className="w-full p-3 border rounded focus:outline-pink-400"
    placeholder="Category Description"
    required
  />

  <button className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition">
    Add Category
  </button>
</form>


      {/* EDIT FORM */}
      {editingCategory && (
        <form
          onSubmit={handleUpdate}
          className="bg-pink-50 p-6 rounded-xl shadow-lg mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold text-pink-700">
            Edit Category
          </h3>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full p-3 border rounded"
            placeholder="Category Name"
          />

          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-3 border rounded"
            placeholder="Description"
          />

          <button className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700">
            Update Category
          </button>
        </form>
      )}

      {/* CATEGORY LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-pink-100 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-pink-700">
              {cat.name}
            </h3>

            <p className="text-gray-600 mt-2">
              {cat.description}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEditClick(cat)}
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-800"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(cat._id)}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </AdminLayout>
  );
};

export default ManageCategories;