import { NavLink, useNavigate, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useState, useEffect, useRef } from "react";
import SideCart from "./SideCart"; // import componente SideCart
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

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
      <header className="mb-5">
        <nav className="container navbar navbar-expand-lg">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
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

                {/* Pulsante Carrello */}
                <li className="dropdown position-relative">
                  <Link
                    className="btn ms-auto position-relative"
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label="Mostra carrello"
                    role="button"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="fs-4 text-white nav-icon" />
                    {totalQuantityCart > 0 && (
                      <div className="position-absolute tot-quantity fw-bold">{totalQuantityCart}</div>
                    )}
                  </Link>
                </li>

                {/* Wishlist */}
                <li>
                  <NavLink
                    to="/wish-list"
                    className="btn ms-auto position-relative"
                  >
                    <FontAwesomeIcon icon={solidHeart} className="fs-4 text-white nav-icon" />
                    {totalQuantityWishList > 0 && (
                      <div className="position-absolute tot-quantity fw-bold">{totalQuantityWishList}</div>
                    )}
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
