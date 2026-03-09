import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./features/cart/cartSlice";
import CartPanel from "./components/CartPanel";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const count = useSelector(state => state.cart.items.length);

  useEffect(() => {

    axios.get("https://dummyjson.com/products")
      .then(res => {
        setProducts(res.data.products);
        setLoading(false);
      });

  }, []);

  if (loading) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="container">

      <h1 className="title">🛒 Product Store</h1>

      <h2 className="cartCount">Cart Items: {count}</h2>

      <div className="productGrid">

        {products.map(product => {

          const alreadyAdded = cartItems.find(
            i => i.id === product.id
          );

          return (

            <div key={product.id} className="card">

              <img
                src={product.thumbnail}
                alt={product.title}
              />

              <h3>{product.title}</h3>

              <p className="price">${product.price}</p>

              <button
                disabled={alreadyAdded}
                onClick={() => dispatch(addToCart(product))}
              >
                {alreadyAdded ? "Added" : "Add To Cart"}
              </button>

            </div>

          );

        })}

      </div>
<hr />
      <CartPanel />

    </div>
  );
}

export default App;