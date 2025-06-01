import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useState, useEffect, useRef } from "react";
import SideCart from "./SideCart"; // importa il nuovo componente
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Header() {
  const { cartItems, removeFromCart, addToCart, prefer } = useCart();
  const { VITE_BE_PATH } = import.meta.env;


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
      <header className="mb-5">
        <nav className="container navbar navbar-expand-lg">
          <div className="container-fluid">
            <NavLink className="navbar-brand logo-container" to="/">
              <img src="/bool-shop-logo.png" alt="Logo" width="70" height="70" className="logo" />
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
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">
                    <FontAwesomeIcon icon={faHome} className="fs-4 text-white" />
                  </NavLink>
                </li>
                <li className="dropdown position-relative">
                  <Link
                    className="btn ms-auto position-relative"
                    onClick={() => setIsSidebarOpen(true)}
                    aria-haspopup="true"
                    aria-expanded={isSidebarOpen}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="fs-4 text-white nav-icon" />
                    <div className="position-absolute tot-quantity fw-bold">{totalQuantityCart}</div>
                  </Link>

                  {/* Qui inserisci il componente SideCart */}
                  <SideCart
                    isOpen={isSidebarOpen}
                    onClose={closeSidebar}
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                    addToCart={addToCart}
                    VITE_BE_PATH={VITE_BE_PATH}
                  />
                </li>
                <li>
                  <NavLink to="/wish-list" className="btn ms-auto position-relative">
                    <FontAwesomeIcon icon={solidHeart} className="fs-4 text-white nav-icon" />
                    <div className="position-absolute tot-quantity fw-bold">{totalQuantityWishList}</div>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
