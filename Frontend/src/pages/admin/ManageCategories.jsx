import { useEffect, useState } from "react";
import API from "../../api/axios";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const { data } = await API.get("/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

 const addCategory = async () => {
  const formData = new FormData();
  formData.append("name", name);

  await API.post("/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  setName("");
  fetchCategories();
};

  const deleteCategory = async (id) => {
    await API.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="border p-2"
        />
        <button
          onClick={addCategory}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Add
        </button>
      </div>

      {categories.map((cat) => (
        <div
          key={cat._id}
          className="flex justify-between border p-3 mb-2 bg-white rounded"
        >
          <span>{cat.name}</span>
          <button
            onClick={() => deleteCategory(cat._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageCategories;  // 🔥 THIS LINE VERY IMPORTANT