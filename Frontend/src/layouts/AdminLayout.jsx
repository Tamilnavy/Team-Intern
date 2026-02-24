import { Link } from "react-router-dom";
import { Package, PlusCircle, Layers, LogOut,LayoutDashboard } from "lucide-react";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl hidden md:flex flex-col justify-between">
        <div>
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-pink-600">
              Glow Admin
            </h2>
          </div>

          <nav className="p-4 space-y-3">

            <Link
              to="/admin/"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-100 transition"
            >
              <LayoutDashboard size={20} />
              Admin Dashboard
            </Link>

            <Link
              to="/admin/products"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-100 transition"
            >
              <Package size={20} />
              Manage Products
            </Link>

            <Link
              to="/admin/add-product"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-100 transition"
            >
              <PlusCircle size={20} />
              Add Product
            </Link>

            <Link
              to="/admin/categories"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-100 transition"
            >
              <Layers size={20} />
              Manage Categories
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;