import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";
import sadUnicorn from "../assets/unicorn-sad.png"
import checkDiscount from "../utils/checkDiscount";

function CartPage() {
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

    const getDiscountedPrice = (item) => {
        const isDiscounted = checkDiscount(item);
        if (item.discount_type === "percentage" && item.discount_amount && isDiscounted) {
            const discount = parseFloat(item.discount_amount);
            const price = parseFloat(item.price);
            return price * (1 - discount / 100);
        }
        return parseFloat(item.price);
    };

    const totalCart = cartItems.reduce((acc, item) => {
        return acc + getDiscountedPrice(item) * item.quantity;
    }, 0);

    return (
        <div className="p-4 border border-dark bg-light rounded rounded-3 text-dark container py-4 text-white" style={{ maxWidth: "600px" }}>
            <h3 className="text-dark text-center mb-4">🛒 Carrello</h3>

            {cartItems.length === 0 ? (
                <div className="container bg-light fst-italic rounded rounded-3 d-flex align-items-center gap-2 justify-content-center mb-5">
                    <p className="text-dark fst-italic text-center fs-5 my-auto">Il carrello è vuoto</p>
                    <img src={sadUnicorn} alt="sad-unicorn" style={{ width: "50px" }} />
                </div>
            ) : (
                <>
                    {cartItems.map(item => {
                        const originalPrice = parseFloat(item.price);
                        const discountedPrice = getDiscountedPrice(item);
                        const hasDiscount = discountedPrice < originalPrice;

                        return (
                            <div
                                key={item.id}
                                className="border p-3 mb-4 d-flex text-dark justify-content-between align-items-center flex-wrap bg-list-checkout rounded rounded-2"
                            >
                                <div>
                                    <h5 className="fst-italic">{item.name}</h5>
                                    {hasDiscount ? (
                                        <>
                                            <p>
                                                Prezzo unitario:{" "}
                                                <span style={{ textDecoration: "line-through", color: "gray" }}>
                                                    €{originalPrice.toFixed(2)}
                                                </span>{" "}
                                                <span className="text-danger fw-bold">
                                                    €{discountedPrice.toFixed(2)}
                                                </span>
                                            </p>
                                            <p className="text-danger small">-{item.discount_amount}%</p>
                                        </>
                                    ) : (
                                        <p>Prezzo unitario: €{originalPrice.toFixed(2)}</p>
                                    )}
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <button
                                        className="btn-cart-prev-next"
                                        onClick={() => removeFromCart(item.id, 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <span>-</span>
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="btn-cart-prev-next"
                                        onClick={() => addToCart(item)}
                                    >
                                        <span>+</span>
                                    </button>
                                </div>

                                <div className="text-center">
                                    <p>
                                        <strong>Totale: €{(discountedPrice * item.quantity).toFixed(2)}</strong>
                                    </p>
                                    <button
                                        className="btn-cart-fail"
                                        onClick={() => removeFromCart(item.id, item.quantity)}
                                    >
                                        Rimuovi
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <div className="text-end">
                        <h4 className="text-black fs-5">
                            Totale carrello: <strong>{totalCart.toFixed(2)}€</strong>
                        </h4>
                        <div className="d-flex justify-content-center gap-2">
                            <button className="btn-cart-fail mt-2" onClick={clearCart}>
                                Svuota carrello
                            </button>
                            <Link to="/checkout" className="btn-cart-success mt-2">
                                Procedi al checkout
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;
