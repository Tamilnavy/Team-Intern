import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px" }}>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/category/skincare">Skincare</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
