import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./features/cart/cartSlice";
import CartPanel from "./components/CartPanel";

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

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>

      <h1>Products</h1>

      <h2>Cart Items: {count}</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "20px"
      }}>

        {products.map(product => {

          const alreadyAdded = cartItems.find(
            i => i.id === product.id
          );

          return (

            <div key={product.id} style={{
              border: "1px solid gray",
              padding: "10px"
            }}>

              <img
                src={product.thumbnail}
                width="100%"
                alt={product.title}
              />

              <h3>{product.title}</h3>
              <p>${product.price}</p>

              <button
                disabled={alreadyAdded}
                onClick={() =>
                  dispatch(addToCart(product))
                }
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