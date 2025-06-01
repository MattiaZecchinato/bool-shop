import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

function SideCart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const { VITE_BE_PATH } = import.meta.env;
  const navigate = useNavigate();

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="sidecart-close-btn" onClick={onClose} aria-label="Chiudi carrello">✕</button>

        <h3 className="sidecart-title">Prodotti nel carrello</h3>

        {cartItems.length === 0 && <p className="sidecart-empty">Il carrello è vuoto</p>}

        <ul className="sidecart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="sidecart-item">
              <img src={`${VITE_BE_PATH}/img/${item.image}`} alt={item.name} className="sidecart-item-img" />
              <div className="sidecart-item-info">
                <h5 className="sidecart-item-title">{item.name}</h5>
                <p className="sidecart-item-price">
                  Prezzo:{" "}
                  {item.discount_type === "percentage" ? (
                    <>
                      <del className="sidecart-item-old-price">€{Number(item.price).toFixed(2)}</del>
                      <span>€{Number(item.final_price).toFixed(2)}</span>
                    </>
                  ) : (
                    <>€{Number(item.price).toFixed(2)}</>
                  )}
                </p>
              </div>
              <div className="sidecart-item-controls">
                <button onClick={() => removeFromCart(item.id, 1)} className="sidecart-btn-round red">
                  {item.quantity === 1 ? "🗑️" : "-"}
                </button>
                <span className="sidecart-item-qty">{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="sidecart-btn-round purple">+</button>
              </div>
            </li>
          ))}
        </ul>

        {cartItems.length > 0 && (
          <div className="sidecart-footer">
            <div className="sidecart-total">
              Totale: €
              {cartItems
                .reduce((acc, item) => acc + item.final_price * item.quantity, 0)
                .toFixed(2)}
            </div>
            <div className="sidecart-buttons">
              <button
                className="sidecart-btn primary"
                onClick={() => {
                  navigate("/checkout");
                  onClose();
                }}
              >
                Vai al checkout
              </button>
              <button
                className="sidecart-btn secondary"
                onClick={() => {
                  navigate("/cart");
                  onClose();
                }}
              >
                Vai al carrello
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SideCart;
