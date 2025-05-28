// src/pages/CartPage.jsx
import { useCart } from "../components/CartContext";

function CartPage() {
    const { cartItems, removeFromCart } = useCart();

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container mt-4">
            <h2>Il tuo carrello</h2>
            {cartItems.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <ul className="list-group">
                    {cartItems.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{item.name}</strong> - {item.price} € × {item.quantity}
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id, 1)}>Rimuovi 1</button>
                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id, item.quantity)}>Rimuovi Tutto</button>
                        </li>
                    ))}
                </ul>
            )}
            <hr />
            <h4>Totale: {total.toFixed(2)} €</h4>
        </div>
    );
}

export default CartPage;
