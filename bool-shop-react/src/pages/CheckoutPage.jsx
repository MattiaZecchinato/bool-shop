import { useState } from "react";
import axios from "axios";
import { useCart } from "../components/CartContext";
import checkDiscount from '../utils/checkDiscount'

function CheckoutPage() {
    const { cartItems, clearCart } = useCart();
    const { VITE_BE_PATH } = import.meta.env;

    const [formData, setFormData] = useState({
        user_first_name: "",
        user_last_name: "",
        user_email: "",
        user_address: "",
        user_phone: "",
    });

    // Funzione per calcolare prezzo scontato se sconto percentuale
    const getDiscountedPrice = (item) => {

        const checkDisc = checkDiscount(item)
        if (item.discount_type === "percentage" && item.discount_amount && checkDisc) {
            const discountPercent = parseFloat(item.discount_amount);
            const price = parseFloat(item.price);
            return price * (1 - discountPercent / 100);
        }
        return parseFloat(item.price);
    };

    // Calcolo totale tenendo conto dello sconto sui singoli prodotti
    const totalOrder = cartItems.reduce((acc, item) => {
        return acc + getDiscountedPrice(item) * item.quantity;
    }, 0);

    const freeshipping = totalOrder >= 50 ? 1 : 0;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const products = cartItems.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            tot_price: (getDiscountedPrice(item) * item.quantity).toFixed(2),
        }));

        const payload = {
            ...formData,
            total_order: (totalOrder + (freeshipping ? 0 : 4.99)).toFixed(2),
            freeshipping,
            products,
        };
        console.log(payload)
        axios.post(`${VITE_BE_PATH}/shop/checkout`, payload)
            .then(() => {
                alert("Ordine completato con successo!");
                clearCart();
                setFormData({
                    user_first_name: "",
                    user_last_name: "",
                    user_email: "",
                    user_address: "",
                    user_phone: "",
                });
            })
            .catch((err) => {
                console.error(err.response?.data);
                alert("Errore durante il checkout.");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Checkout</h2>

            {cartItems.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <>
                    <h4>Prodotti nel carrello:</h4>
                    <ul className="list-group mb-3">
                        {cartItems.map((item) => {
                            const originalPrice = parseFloat(item.price);
                            const discountedPrice = getDiscountedPrice(item);
                            const checkDisc = checkDiscount(item)
                            const hasDiscount = item.discount_type === "percentage" && item.discount_amount && checkDisc;

                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                                    <div>
                                        <span>{item.name} (x{item.quantity})</span><br />
                                        {hasDiscount && (
                                            <small className="text-danger me-2">
                                                -{item.discount_amount}%
                                            </small>
                                        )}
                                    </div>
                                    <div>
                                        {hasDiscount ? (
                                            <>
                                                <span style={{ textDecoration: "line-through", color: "gray", marginRight: "8px" }}>
                                                    {(originalPrice * item.quantity).toFixed(2)}€
                                                </span>
                                                <span className="fw-bold">{(discountedPrice * item.quantity).toFixed(2)}€</span>
                                            </>
                                        ) : (
                                            <span>{(originalPrice * item.quantity).toFixed(2)}€</span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Spedizione</span>
                            <span>{freeshipping ? "GRATIS" : "4.99€"}</span>
                        </li>

                        <li className="list-group-item d-flex justify-content-between fw-bold">
                            <span>Totale finale</span>
                            <span>{(totalOrder + (freeshipping ? 0 : 4.99)).toFixed(2)}€</span>
                        </li>
                    </ul>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Nome</label>
                                <input type="text" className="form-control" name="user_first_name" value={formData.user_first_name} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Cognome</label>
                                <input type="text" className="form-control" name="user_last_name" value={formData.user_last_name} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="user_email" value={formData.user_email} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Telefono</label>
                                <input type="text" className="form-control" name="user_phone" value={formData.user_phone} onChange={handleChange} required />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Indirizzo</label>
                                <input type="text" className="form-control" name="user_address" value={formData.user_address} onChange={handleChange} required />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-success w-100">Invia Ordine</button>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}

export default CheckoutPage;
