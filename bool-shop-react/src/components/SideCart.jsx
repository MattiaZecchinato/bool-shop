import React from "react";
import { useNavigate } from "react-router-dom";

function SideCart({ isOpen, onClose, cartItems, removeFromCart, addToCart, VITE_BE_PATH }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: isOpen ? "block" : "none",
          zIndex: 999,
        }}
      ></div>

      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-350px",
          width: "350px",
          height: "100vh",
          backgroundColor: "white",
          boxShadow: "-2px 0 12px rgba(0,0,0,0.3)",
          padding: "20px",
          transition: "right 0.3s ease",
          zIndex: 1000,
          overflowY: "auto",
        }}
      >
        <button
          className="btn btn-outline-danger mb-3"
          onClick={onClose}
          style={{ float: "right" }}
          aria-label="Chiudi carrello"
        >
          X
        </button>

        <h4 className="mb-4">Prodotti nel carrello</h4>
        {cartItems.length === 0 && <p>Carrello vuoto</p>}

        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {cartItems.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "15px",
              }}
            >
              <img
                src={`${VITE_BE_PATH}/img/${item.image}`}
                alt={item.name}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginRight: "15px",
                  flexShrink: 0,
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <h6 style={{ margin: "0 0 6px", fontWeight: "600" }}>{item.name}</h6>

                <p style={{ margin: "0", fontSize: "0.9rem", color: "#555" }}>
                  Prezzo:{" "}
                  {item.discount_type === "percentage" ? (
                    <>
                      <del style={{ color: "gray", fontSize: "0.85rem" }}>
                        €{Number(item.price).toFixed(2)}
                      </del>{" "}
                      <span style={{ color: "black" }}>
                        €{Number(item.final_price).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <>€{Number(item.price).toFixed(2)}</>
                  )}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginLeft: "10px",
                }}
              >
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => removeFromCart(item.id, 1)}
                  aria-label={
                    item.quantity === 1
                      ? `Rimuovi ${item.name} dal carrello`
                      : `Diminuisci quantità di ${item.name}`
                  }
                  style={{ padding: "4px 8px", minWidth: "32px" }}
                >
                  {item.quantity === 1 ? "🗑️" : "-"}
                </button>
                <span
                  style={{
                    minWidth: "20px",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => addToCart(item)}
                  aria-label={`Aumenta quantità di ${item.name}`}
                  style={{ padding: "4px 8px", minWidth: "32px" }}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>

        {cartItems.length > 0 && (
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <button
              className="btn btn-primary me-2"
              onClick={() => {
                onClose();
                navigate("/cart");
              }}
            >
              Vai al carrello
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
            >
              Vai al checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SideCart;
