import { Link } from "react-router-dom";
import { Package, PlusCircle, LayoutGrid } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-pink-50 px-6 py-10">

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-pink-600 tracking-tight">
          Cosmetic Store Admin Panel
        </h1>
        <p className="text-gray-600 mt-2">
          Manage products, categories and store operations professionally.
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Manage Products */}
        <Link
          to="/admin/products"
          className="group bg-white border border-pink-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <div className="bg-pink-100 w-14 h-14 flex items-center justify-center rounded-xl mb-6 group-hover:bg-pink-500 transition">
            <Package className="text-pink-600 group-hover:text-white transition" size={28} />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Manage Products
          </h2>
          <p className="text-gray-500 text-sm">
            View, edit, and delete all available cosmetic products.
          </p>
        </Link>

        {/* Add Product */}
        <Link
          to="/admin/add-product"
          className="group bg-white border border-pink-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <div className="bg-pink-100 w-14 h-14 flex items-center justify-center rounded-xl mb-6 group-hover:bg-pink-500 transition">
            <PlusCircle className="text-pink-600 group-hover:text-white transition" size={28} />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Add New Product
          </h2>
          <p className="text-gray-500 text-sm">
            Add new beauty and skincare products to your store.
          </p>
        </Link>

         {/* Manage Categories  */}
        <Link
          to="/admin/categories"
          className="group bg-white border border-pink-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <div className="bg-pink-100 w-14 h-14 flex items-center justify-center rounded-xl mb-6 group-hover:bg-pink-500 transition">
            <LayoutGrid className="text-pink-600 group-hover:text-white transition" size={28} />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Manage Categories
          </h2>
          <p className="text-gray-500 text-sm">
            Organize your store with product categories.
          </p>
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;