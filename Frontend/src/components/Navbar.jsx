import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow">
      <div className="flex justify-between items-center">

        {/* Logo - Role Based Redirect */}
        <Link
          to={
            user
              ? user.role === "admin"
                ? "/admin"
                : "/dashboard"
              : "/login"
          }
          className="text-xl font-bold tracking-wide"
        >
          CosmeticStore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          {/* Not Logged In */}
          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-pink-400 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-pink-400 transition"
              >
                Register
              </Link>
            </>
          )}

          {/* User Menu */}
          {user && user.role === "user" && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-pink-400 transition"
              >
                Shop
              </Link>
              <Link
                to="/cart"
                className="hover:text-pink-400 transition"
              >
                Cart
              </Link>
              <Link
                to="/wishlist"
                className="hover:text-pink-400 transition"
              >
                Wishlist
              </Link>
            </>
          )}

          {/* Admin Menu */}
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-yellow-400 transition"
            >
              Admin Panel
            </Link>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-gray-800 p-4 rounded">

          {!user && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}

          {user && user.role === "user" && (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                Shop
              </Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                Cart
              </Link>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                Wishlist
              </Link>
            </>
          )}

          {user && user.role === "admin" && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              Admin Panel
            </Link>
          )}

          {user && (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="bg-red-500 p-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;