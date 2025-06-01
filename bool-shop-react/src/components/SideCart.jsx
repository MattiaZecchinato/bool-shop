import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

function SideCart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const { VITE_BE_PATH } = import.meta.env;
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
          backgroundColor: "rgba(27,38,59,0.8)",
          display: isOpen ? "block" : "none",
          zIndex: 999,
          backdropFilter: "blur(3px)",
        }}
      ></div>

      {/* Sidebar carrello */}
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-380px",
          width: "380px",
          height: "100vh",
          background: "linear-gradient(135deg, #5D3A7D, #1B263B)",
          boxShadow: "-3px 0 15px rgba(0,0,0,0.7)",
          padding: "25px",
          transition: "right 0.35s ease",
          zIndex: 1000,
          overflowY: "auto",
          borderRadius: "10px 0 0 10px",
          color: "#F5F1E9",
          fontFamily: "'Treasure Map Deadhand', cursive, sans-serif",
          letterSpacing: "0.03em",
        }}
      >
        <button
          className="btn mb-4"
          onClick={onClose}
          aria-label="Chiudi carrello"
          style={{
            float: "right",
            backgroundColor: "#7E2430",
            border: "none",
            fontWeight: "700",
            fontSize: "1.1rem",
            padding: "0 12px",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 0 8px #7E2430",
            transition: "background 0.3s ease",
            color: "#F5F1E9",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5B1B22")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7E2430")}
        >
          ✕
        </button>

        <h3
          style={{
            marginBottom: "1.2rem",
            textShadow: "2px 2px 6px #000",
            color: "#C9B037",
          }}
        >
          Prodotti nel carrello
        </h3>

        {cartItems.length === 0 && (
          <p
            style={{
              fontStyle: "italic",
              textAlign: "center",
              marginTop: "40px",
              fontSize: "1.2rem",
              textShadow: "1px 1px 3px #000",
              color: "#F5F1E9",
            }}
          >
            Il carrello è vuoto
          </p>
        )}

        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {cartItems.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "25px",
                paddingBottom: "10px",
                borderBottom: "1px dotted rgba(249, 205, 75, 0.4)",
              }}
            >
              <img
                src={`${VITE_BE_PATH}/img/${item.image}`}
                alt={item.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginRight: "18px",
                  boxShadow: "0 0 10px #C9B037",
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <h5
                  style={{
                    margin: "0 0 6px",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                    color: "#F5F1E9",
                  }}
                >
                  {item.name}
                </h5>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1rem",
                    color: "#4A7C59",
                    textShadow: "1px 1px 3px #00000088",
                  }}
                >
                  Prezzo:{" "}
                  {item.discount_type === "percentage" ? (
                    <>
                      <del
                        style={{
                          color: "#C9B037",
                          fontSize: "0.9rem",
                          marginRight: "8px",
                          opacity: 0.8,
                        }}
                      >
                        €{Number(item.price).toFixed(2)}
                      </del>
                      <span>€{Number(item.final_price).toFixed(2)}</span>
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
                  marginLeft: "12px",
                }}
              >
                <button
                  className="btn"
                  onClick={() => removeFromCart(item.id, 1)}
                  aria-label={
                    item.quantity === 1
                      ? `Rimuovi ${item.name} dal carrello`
                      : `Diminuisci quantità di ${item.name}`
                  }
                  style={{
                    backgroundColor: "#7E2430",
                    border: "none",
                    color: "#F5F1E9",
                    fontSize: "1.3rem",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px #7E2430",
                    cursor: "pointer",
                    userSelect: "none",
                    lineHeight: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
                >
                  {item.quantity === 1 ? "🗑️" : "-"}
                </button>
                <span
                  style={{
                    minWidth: "22px",
                    textAlign: "center",
                    fontSize: "1.1rem",
                    color: "#F5F1E9",
                    textShadow: "0 0 6px #000",
                    userSelect: "none",
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  className="btn"
                  onClick={() => addToCart(item)}
                  aria-label={`Aumenta quantità di ${item.name}`}
                  style={{
                    backgroundColor: "#5D3A7D",
                    border: "none",
                    color: "#F5F1E9",
                    fontSize: "1.3rem",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px #5D3A7D",
                    cursor: "pointer",
                    userSelect: "none",
                    lineHeight: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>

        {cartItems.length > 0 && (
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                color: "#C9B037",
                textShadow: "1px 1px 3px #000",
              }}
            >
              Totale: €
              {cartItems
                .reduce((acc, item) => acc + item.final_price * item.quantity, 0)
                .toFixed(2)}
            </div>

            <button
              className="btn"
              onClick={() => {
                navigate("/checkout");
                onClose();
              }}
              style={{
                backgroundColor: "#7E2430",
                border: "none",
                color: "#F5F1E9",
                fontWeight: "700",
                padding: "10px 18px",
                borderRadius: "8px",
                boxShadow: "0 0 10px #7E2430",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5B1B22")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7E2430")}
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
