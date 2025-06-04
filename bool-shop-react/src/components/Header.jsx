import { NavLink, useNavigate, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useState, useEffect, useRef } from "react";
import SideCart from "./SideCart"; // import componente SideCart
import building from "../assets/building.png";
import shoppingCart from "../assets/trolley.png";
import heart from "../assets/heartC.png";

function Header() {
    const { cartItems, prefer } = useCart();
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const totalQuantityCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalQuantityWishList = prefer.reduce((acc, item) => acc + item.quantity, 0);

    const prevCartCountRef = useRef(totalQuantityCart);

    useEffect(() => {
        if (prevCartCountRef.current === 0 && totalQuantityCart > 0) {
            setIsSidebarOpen(true);
        }
        prevCartCountRef.current = totalQuantityCart;
    }, [totalQuantityCart]);

    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <>
            <header className="mb-5 scroll-header">
                <nav className="container navbar navbar-expand p-0">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">
                            <img src="/bool-shop-logo.png" alt="Logo" className="logo" />
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
                            <ul className="navbar-nav align-items-center">
                                <li className="nav-item">
                                    <NavLink className="nav-link active d-flex align-items-center" aria-current="page" to="/">
                                        <img className="nav-img" src={building} alt="building-home" />
                                        <span className="span-style-header">Home</span>
                                    </NavLink>
                                </li>

                                {/* Pulsante Carrello */}
                                <li className="dropdown position-relative">
                                    <Link
                                        className="btn ms-auto position-relative"
                                        onClick={() => setIsSidebarOpen(true)}
                                        aria-label="Mostra carrello"
                                        role="button"
                                    >

                                        <img className="nav-img" src={shoppingCart} alt="shopping-cart" />
                                        {totalQuantityCart > 0 && (
                                            <div className="position-absolute tot-quantity fw-bold">{totalQuantityCart}</div>
                                        )}
                                        <span className="span-style-header">Carrello</span>
                                    </Link>
                                </li>

                                {/* Wishlist */}
                                <li>
                                    <NavLink
                                        to="/wish-list"
                                        className="btn ms-auto position-relative"
                                    >

                                        <img className="nav-img" src={heart} alt="heart" />
                                        {totalQuantityWishList > 0 && (
                                            <div className="position-absolute tot-quantity fw-bold qnt-wish-list">{totalQuantityWishList}</div>
                                        )}
                                        <span className="span-style-header">Wishlist</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <SideCart isOpen={isSidebarOpen} onClose={closeSidebar} />
        </>
    );
}

export default Header;
