import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, [id]);

  const fetchCategory = async () => {
    try {
      const { data } = await API.get(`/categories`);
      const selected = data.find((c) => c._id === id);
      setCategory(selected);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await API.get(`/products?category=${id}`);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  if (!category) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-white px-6 md:px-16 py-10">

      {/* Category Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          {category.name}
        </h1>

        <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded-lg shadow-sm">
          <p className="text-gray-700 text-lg leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </div>

    </div>
  );
};

export default CategoryPage;