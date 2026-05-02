import { useState } from "react";

function ProductList({ products = [], addToCart }) {

  const [selectedId, setSelectedId] = useState("");
  const [qty, setQty] = useState(1);

 const handleAdd = () => {
  const product = products.find(p => p.id === Number(selectedId));

  if (!product) return;

  const requestedQty = Number(qty);

  if (requestedQty > product.stock) {
    alert(`Only ${product.stock} items available in stock`);
    return;
  }

  if (product) {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      qty: Number(qty)  
    });

    setSelectedId("");
    setQty(1);
  }
};

  return (
    <div style={{ width: "50%", padding: 20 }}>
      <h2>Products</h2>

      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <>
          
          <select
            id="prod_list"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 10 }}
          >
            <option value="">-- Select Product --</option>

            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} - Rs. {p.price} (Stock: {p.stock})
              </option>
            ))}
          </select>

         
          <input
            id="p_qty"
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="Qty"
            style={{ width: "95%", padding: 8, marginBottom: 10 }}
          />

          <button
            onClick={handleAdd}
            disabled={!selectedId}
          >
            Add to Cart
          </button>
        </>
      )}
    </div>
  );
}

export default ProductList;