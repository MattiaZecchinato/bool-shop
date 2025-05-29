import { useCart } from "../components/CartContext";

function CartPage() {
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

    return (
        <div className="container py-4">
            <h2>Carrello</h2>

            {cartItems.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            className="border p-3 mb-3 d-flex justify-content-between align-items-center flex-wrap"
                        >
                            <div>
                                <h5>{item.name}</h5>
                                <p>Prezzo unitario: €{parseFloat(item.price).toFixed(2)}</p>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => removeFromCart(item.id, 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => addToCart(item)}
                                >
                                    +
                                </button>
                            </div>

                            <div className="text-end">
                                <p>
                                    <strong>Totale: €{(parseFloat(item.price) * item.quantity).toFixed(2)}</strong>
                                </p>
                                <button
                                    className="btn btn-sm btn-danger mt-2"
                                    onClick={() => removeFromCart(item.id, item.quantity)}
                                >
                                    🗑️ Rimuovi prodotto
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 text-end">
                        <h4>
                            Totale carrello: €{cartItems
                                .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
                                .toFixed(2)}
                        </h4>
                        <button className="btn btn-danger mt-2" onClick={clearCart}>
                            Svuota carrello
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;
