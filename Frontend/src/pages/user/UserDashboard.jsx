import { useEffect, useState } from "react";
import API from "../../api/axios";
import ProductCard from "../../components/ProductCard";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await API.get("/products");
      setProducts(data.products);
    };
    fetch();
  }, []);

  return (
    <div className="p-6 grid md:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
};

export default UserDashboard;