import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Cosmetic Store 💄</h1>
      <Link to="/products">
        <button>Shop Now</button>
      </Link>
    </div>
  );
}

export default Home;
