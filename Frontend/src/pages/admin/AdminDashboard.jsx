import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/admin/products" className="bg-white p-6 shadow rounded">
          Manage Products
        </Link>

        <Link to="/admin/add-product"
        className="bg-green-600 text-white p-4 rounded">
                Add Product
                </Link>

        <Link to="/admin/categories" className="bg-white p-6 shadow rounded">
          Manage Categories
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;