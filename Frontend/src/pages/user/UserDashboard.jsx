import { useEffect, useState } from "react";
import API from "../../api/axios";
import ProductCard from "../../components/ProductCard";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  //  Fetch Categories
  const fetchCategories = async () => {
    const { data } = await API.get("/categories");
    setCategories(data);
  };

  //  Fetch Products
  const fetchProducts = async (categoryId = "all") => {
    if (categoryId === "all") {
      const { data } = await API.get("/products");
      setProducts(data.products);
    } else {
      const { data } = await API.get(`/products?category=${categoryId}`);
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  //  Handle Category Click
  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    fetchProducts(id);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">

      {/*  Category Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">
          Shop by Category
        </h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleCategoryClick("all")}
            className={`px-6 py-2 rounded-full border transition ${
              activeCategory === "all"
                ? "bg-pink-600 text-white"
                : "bg-white text-pink-600 border-pink-600"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat._id)}
              className={`px-6 py-2 rounded-full border transition ${
                activeCategory === cat._id
                  ? "bg-pink-600 text-white"
                  : "bg-white text-pink-600 border-pink-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>

    </div>
  );
};

export default UserDashboard;