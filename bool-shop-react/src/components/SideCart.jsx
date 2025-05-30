import { NavLink } from "react-router-dom";
import { useCart } from "./CartContext";

function SideCart() {

    const { cartItems, addToCart, removeFromCart } = useCart();
    const { VITE_BE_PATH } = import.meta.env;

    return <>

        {cartItems.length === 0 ? ('') : (<div className="border">
            <p>
                Totale carrello: {cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0).toFixed(2)}€
            </p>
            <NavLink to="/cart">Vai al carrello</NavLink>
            <div className="mt-3">
                {cartItems.length === 0 ? (<p>carrello vuoto</p>) : (<>{cartItems.map(item => {
                    return <div className="border-bottom mb-2 p-2 ">
                        <img src={`${VITE_BE_PATH}/img/${item.image}`} alt={item.name} style={{ width: '100px' }} />
                        <p>{item.price}€</p>
                        <button className="btn btn-outline-secondary" onClick={() => removeFromCart(item.id, 1)}>
                            {item.quantity === 1 ? '🗑️' : '-'}
                        </button>
                        <span>{item.quantity}</span>
                        <button className="btn btn-outline-secondary" onClick={() => addToCart(item)}>
                            +
                        </button>
                    </div>
                })}</>)}
            </div>
        </div>)}
    </>
}

export default SideCart