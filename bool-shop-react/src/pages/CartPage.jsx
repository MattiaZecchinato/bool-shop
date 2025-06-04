import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";
import sadUnicorn from "../assets/unicorn-sad.png"

function CartPage() {
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

    return (
        <div className="p-4 border border-dark bg-light rounded rounded-3 text-dark rounded container py-4 text-white " style={{ maxWidth: "600px" }}>
            <h3 className="text-dark text-center mb-4">🛒 Carrello</h3>

            {cartItems.length === 0 ? (
                <div className="container bg-light fst-italic rounded rounded-3 d-flex align-items-center gap-2 justify-content-center mb-5" style={{ maxWidth: "600px" }}>
                    <p className="text-dark fst-italic text-center fs-5 my-auto">Il carrello è vuoto</p>
                    <img src={sadUnicorn} alt="sad-unicorn" style={{ width: "50px" }} />
                </div>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            className="border p-3 mb-2 d-flex text-dark justify-content-between align-items-center flex-wrap  bg-list-checkout rounded rounded-2"
                        >
                            <div>
                                <h5 className="fst-italic">{item.name}</h5>
                                <p>Prezzo unitario: €{parseFloat(item.price).toFixed(2)}</p>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={() => removeFromCart(item.id, 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={() => addToCart(item)}
                                >
                                    +
                                </button>
                            </div>

                            <div className="text-center">
                                <p>
                                    <strong>Totale: €{(parseFloat(item.price) * item.quantity).toFixed(2)}</strong>
                                </p>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => removeFromCart(item.id, item.quantity)}
                                >
                                    🗑️ Rimuovi
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="text-end">
                        <h4>
                            Totale carrello: €{cartItems
                                .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
                                .toFixed(2)}
                        </h4>
                        <div className="d-flex justify-content-center gap-2">
                            <button className="btn btn-danger mt-2" onClick={clearCart}>
                                Svuota carrello
                            </button>
                            <Link to="/checkout" className="btn btn-success mt-2">
                                Procedi al checkout
                            </Link>
                        </div>
                    </div>
                </>
            )
            }
        </div >
    );
}

export default CartPage;
