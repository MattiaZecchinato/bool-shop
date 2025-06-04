import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import checkDiscount from "../utils/checkDiscount";

function SideCart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const { VITE_BE_PATH } = import.meta.env;
  const navigate = useNavigate();

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="sidecart-close-btn" onClick={onClose} aria-label="Chiudi carrello">✕</button>

        <h3 className="sidecart-title font-medieval fs-4 fw-bold">Prodotti nel carrello</h3>

        {cartItems.length === 0 && <p className="sidecart-empty">Il carrello è vuoto</p>}

        <ul className="sidecart-list">
          {cartItems.map((item) => {
            const checkDisc = checkDiscount(item)

            return (
              <li key={item.id} className="sidecart-item">
                <div className="sidecart-container-img">
                  <img src={`${VITE_BE_PATH}/img/${item.image}`} alt={item.name} className="sidecart-item-img" />
                </div>
                <div className="sidecart-item-info">
                  <h5 className="sidecart-item-title">{item.name}</h5>
                  <p className="sidecart-item-price">
                    {" "}
                    {item.discount_type === "percentage" && checkDisc ? (
                      <>
                        <del className="sidecart-item-old-price">€{Number(item.price).toFixed(2)}</del>
                        <span className="text-success fw-bold">€{Number(item.final_price).toFixed(2)}</span>
                      </>
                    ) : (
                      <div className="fw-bold">€{Number(item.price).toFixed(2)}</div>
                    )}
                  </p>
                </div>
                <div className="sidecart-item-actions">
                  <div className="sidecart-item-controls">
                    <button onClick={() => removeFromCart(item.id, 1)} className="sidecart-btn-round red">
                      {item.quantity === 1 ? "🗑️" : "-"}
                    </button>
                    <span className="sidecart-item-qty">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="sidecart-btn-round purple">+</button>
                  </div>
                  <button
                    className="sidecart-remove-btn"
                    onClick={() => removeFromCart(item.id, item.quantity)}
                    title="Rimuovi prodotto dal carrello"
                  >
                    <div className="d-flex align-items-center">
                      <span className="remove-icon">🗑️</span>
                      <span className="remove-text">Rimuovi</span>
                    </div>
                  </button>
                </div>
              </li>

            )
          })}
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
