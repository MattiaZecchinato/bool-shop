import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useState, useEffect, useRef } from "react";
import SideCart from "./SideCart"; // importa il nuovo componente

function Header() {
  const { cartItems, removeFromCart, addToCart, prefer } = useCart();
  const { VITE_BE_PATH } = import.meta.env;
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
                    Home
                  </NavLink>
                </li>
                <li className="dropdown position-relative">
                  <button
                    className="btn btn-outline-primary ms-auto"
                    onClick={() => setIsSidebarOpen(true)}
                    aria-haspopup="true"
                    aria-expanded={isSidebarOpen}
                  >
                    Carrello ({totalQuantityCart})
                  </button>

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
                  <NavLink to="/wish-list" className="btn btn-outline-primary ms-auto">
                    Wish List ({totalQuantityWishList})
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
