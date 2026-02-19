function ProductCard({ product, addToCart }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product._id)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
