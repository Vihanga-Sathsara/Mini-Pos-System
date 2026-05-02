import { useState } from "react";

function Cart({ cart, setCart, checkout }) {

  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const increaseQty = (id) => {
    setCart(prev =>
        prev.map(i => {

        if (i.id === id) {
            if (i.qty >= i.stock) {
            alert(`Only ${i.stock} items available in stock`);
            return i;
            }

            return { ...i, qty: i.qty + 1 };
        }

        return i;
        })
    );
};

  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(i =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleCheckout = async () => {
    setLoading(true);
    await checkout();   
    setLoading(false);
  };

  return (
    <div style={{ width: "50%", padding: 20 }}>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map(i => (
          <div key={i.id} style={{ display: "flex", justifyContent: "space-between" }}>
            
            <div>
              <b>{i.name}</b>
              <p>Rs.{i.price} x {i.qty} = Rs.{(i.price * i.qty).toFixed(2)}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <button
                style={{
                    backgroundColor: "#909704",
                    border: "1px solid #ccc",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    cursor: "pointer"
                }} 
                onClick={() => decreaseQty(i.id)}>-</button>
              <span>{i.qty}</span>
              <button 
                style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
                onClick={() => increaseQty(i.id)}>+</button>
              <button
                style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    cursor: "pointer" 
                }}
                onClick={() => removeItem(i.id)}>X</button>
            </div>

          </div>
        ))
      )}

      <h3>Total: Rs. {total.toFixed(2)}</h3>

      <button
        onClick={handleCheckout}
        disabled={loading || cart.length === 0}
      >
        {loading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
}

export default Cart;