import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Receipt from "./components/Receipt";

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/products/")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);


  const addToCart = (p) => {
  setCart(prev => {
    const exist = prev.find(i => i.id === p.id);

    if (exist) {

      const newQty = exist.qty + p.qty;

      if (newQty > exist.stock) {
        alert(`Only ${exist.stock} items available in stock`);
        return prev;
      }

      return prev.map(i =>
        i.id === p.id
          ? { ...i, qty: newQty }
          : i
      );
    }

   
    if (p.qty > p.stock) {
      alert(`Only ${p.stock} items available in stock`);
      return prev;
    }

    return [...prev, p];
  });
};

  
  const updateQty = (id, qty) => {
    setCart(prev =>
      prev.map(i =>
        i.id === id ? { ...i, qty: Number(qty) } : i
      )
    );
  };

 
 const checkout = async () => {
  try {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const total = cart.reduce(
      (sum, i) => sum + i.price * i.qty,
      0
    );

    const res = await axios.post(
      "http://127.0.0.1:8000/api/checkout/",
      {
        items: cart,
        total
      }
    );

    console.log("RECEIPT:", res.data);

    setReceipt(res.data); 
    setCart([]);

  } catch (err) {
    console.log(err);
    alert(err?.response?.data?.error || "Checkout failed");
  }
};

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center",marginTop: "20px" }}>Mini POS System</h1>
      </div>
      <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>

        <ProductList
          products={products}
          addToCart={addToCart}
        />

        <Cart
          cart={cart}
          setCart={setCart}
          updateQty={updateQty}
          checkout={checkout}
        />

        
        {receipt && (
          <Receipt
            data={receipt}
            onClose={() => setReceipt(null)}
          />
        )}

      </div>
  </>
  );
}

export default App;