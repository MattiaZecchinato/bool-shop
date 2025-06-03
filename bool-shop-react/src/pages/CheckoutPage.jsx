import { useState } from "react";
import axios from "axios";
import { useCart } from "../components/CartContext";
import checkDiscount from '../utils/checkDiscount'
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
    const { cartItems, clearCart } = useCart();
    const { VITE_BE_PATH } = import.meta.env;
    const navigate = useNavigate()

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
        axios.post(`${VITE_BE_PATH}/shop/checkout`, payload)
            .then(() => {
                clearCart();
                setFormData({
                    user_first_name: "",
                    user_last_name: "",
                    user_email: "",
                    user_address: "",
                    user_phone: "",
                });
                alert("Ordine completato con successo!");
                navigate('/order-recap', { state: { payload } })
            })
            .catch((err) => {
                console.error(err.response?.data);
                alert("Errore durante il checkout.");
            });
    };

    return (

        <div className="container mt-4 text-white" style={{ maxWidth: "600px" }}>
            {cartItems.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <div className=" p-4 border border-dark bg-light rounded">
                    <h4 className="mb-3 text-dark">🛒 Riepilogo Carrello</h4>
                    <ul className="list-group mb-3">
                        {cartItems.map((item) => {
                            const originalPrice = parseFloat(item.price);
                            const discountedPrice = getDiscountedPrice(item);
                            const checkDisc = checkDiscount(item)
                            const hasDiscount = item.discount_type === "percentage" && item.discount_amount && checkDisc;

                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-center bg-list-checkout text-dark border border-dark" key={item.id} >
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
                        <li className="list-group-item d-flex justify-content-between bg-list-checkout border border-dark">
                            <span>Spedizione</span>
                            <span className="text-success">{freeshipping ? "GRATIS" : "4.99€"}</span>
                        </li>

                        <li className="list-group-item d-flex justify-content-between fw-bold bg-list-checkout border border-dark">
                            <span>Totale finale</span>
                            <span>{(totalOrder + (freeshipping ? 0 : 4.99)).toFixed(2)}€</span>
                        </li>
                    </ul>

                    <form onSubmit={handleSubmit}>
                        <h2 className="text-center mt-5 mb-4 text-dark">Inserisci i tuoi dati</h2>
                        <div className="row g-3 d-flex justify-content-center">
                            <div className="col-md-6 ">
                                <label className="form-label text-dark">Nome</label>
                                <input type="text" className="form-control bg-list-checkout border border-dark" name="user_first_name" value={formData.user_first_name} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-dark">Cognome</label>
                                <input type="text" className="form-control bg-list-checkout border border-dark" name="user_last_name" value={formData.user_last_name} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-dark">Email</label>
                                <input type="email" className="form-control bg-list-checkout border border-dark" name="user_email" value={formData.user_email} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-dark">Telefono</label>
                                <input type="text" className="form-control bg-list-checkout border border-dark" name="user_phone" value={formData.user_phone} onChange={handleChange} required />
                            </div>
                            <div className="col-12">
                                <label className="form-label text-dark">Indirizzo</label>
                                <input type="text" className="form-control bg-list-checkout border border-dark" name="user_address" value={formData.user_address} onChange={handleChange} required />
                            </div>
                            <div className="col-12 col-md-4">
                                <button type="submit" className="btn btn-dark w-100">Invia ordine</button>
                            </div>
                        </div>
                    </form>

                    { }
                </div>
            )
            }
        </div >
    );
}

export default CheckoutPage;
