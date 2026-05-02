function Receipt({ data, onClose }) {

  const handlePrint = () => window.print();

  return (
    <div className="receipt" style={{
      width: "300px",
      fontFamily: "monospace",
      border: "1px dashed black",
      padding: 10,
      position: "absolute",
      right: 20,
      top: 20,
      background: "white"
    }}>

      <h3 style={{ textAlign: "center" }}>MY SHOP</h3>
      <hr />

      {data?.receipt?.map((i, idx) => (
        <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{i.name} x{i.qty}</span>
          <span>{Number(i.price).toFixed(2)}</span>
        </div>
      ))}

      <hr />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <b>Total</b>
        <b>{Number(data?.total).toFixed(2)}</b>
      </div>

      <p style={{ textAlign: "center" }}>
        Order ID: {data?.order_id}
      </p>

      <button onClick={handlePrint} style={{ width: "100%", marginTop: 10 }}>
        Print 🖨️
      </button>

      <button onClick={onClose} style={{ width: "100%", marginTop: 5 }}>
        Close
      </button>

    </div>
  );
}

export default Receipt;