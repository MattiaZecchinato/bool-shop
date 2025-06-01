import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Header() {
  const { cartItems, removeFromCart, addToCart, prefer } = useCart();
  const { VITE_BE_PATH } = import.meta.env;
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalQuantityCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalQuantityWishList = prefer.reduce((acc, item) => acc + item.quantity, 0);

  // Ref per tenere traccia del precedente numero di prodotti nel carrello
  const prevCartCountRef = useRef(totalQuantityCart);

  // Effetto per aprire automaticamente la sidebar quando si aggiunge il primo prodotto
  useEffect(() => {
    if (prevCartCountRef.current === 0 && totalQuantityCart > 0) {
      setIsSidebarOpen(true);
    }
    prevCartCountRef.current = totalQuantityCart;
  }, [totalQuantityCart]);

  // Funzione per chiudere la sidebar
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

                  {/* Overlay per chiudere la sidebar cliccando fuori */}
                  <div
                    className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
                    onClick={closeSidebar}
                    style={{
                      position: "fixed",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: isSidebarOpen ? "block" : "none",
                      zIndex: 999,
                    }}
                  ></div>

                  {/* Sidebar */}
                  <div
                    className={`sidebar ${isSidebarOpen ? "open" : ""}`}
                    style={{
                      position: "fixed",
                      top: 0,
                      right: isSidebarOpen ? 0 : "-350px",
                      width: "350px",
                      height: "100vh",
                      backgroundColor: "white",
                      boxShadow: "-2px 0 12px rgba(0,0,0,0.3)",
                      padding: "20px",
                      transition: "right 0.3s ease",
                      zIndex: 1000,
                      overflowY: "auto",
                    }}
                  >
                    <button
                      className="btn btn-outline-danger mb-3"
                      onClick={closeSidebar}
                      style={{ float: "right" }}
                      aria-label="Chiudi carrello"
                    >
                      X
                    </button>

                    <h4 className="mb-4">Prodotti nel carrello</h4>
                    {cartItems.length === 0 && <p>Carrello vuoto</p>}
                    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "20px",
                            borderBottom: "1px solid #ddd",
                            paddingBottom: "15px",
                          }}
                        >
                          <img
                            src={`${VITE_BE_PATH}/img/${item.image}`}
                            alt={item.name}
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                              borderRadius: "6px",
                              marginRight: "15px",
                              flexShrink: 0,
                            }}
                          />
                          <div style={{ flexGrow: 1 }}>
                            <h6 style={{ margin: "0 0 6px", fontWeight: "600" }}>{item.name}</h6>

                            <p style={{ margin: "0", fontSize: "0.9rem", color: "#555" }}>
                              Prezzo:{" "}
                              {item.discount_type === "percentage" ? (
                                <>
                                  <del style={{ color: "gray", fontSize: "0.85rem" }}>
                                    €{Number(item.price).toFixed(2)}
                                  </del>{" "}
                                  <span style={{ color: "black" }}>
                                    €{Number(item.final_price).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <>€{Number(item.price).toFixed(2)}</>
                              )}
                            </p>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              marginLeft: "10px",
                            }}
                          >
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => removeFromCart(item.id, 1)}
                              aria-label={
                                item.quantity === 1
                                  ? `Rimuovi ${item.name} dal carrello`
                                  : `Diminuisci quantità di ${item.name}`
                              }
                              style={{ padding: "4px 8px", minWidth: "32px" }}
                            >
                              {item.quantity === 1 ? "🗑️" : "-"}
                            </button>
                            <span
                              style={{
                                minWidth: "20px",
                                textAlign: "center",
                                fontWeight: "600",
                                fontSize: "1rem",
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => addToCart(item)}
                              aria-label={`Aumenta quantità di ${item.name}`}
                              style={{ padding: "4px 8px", minWidth: "32px" }}
                            >
                              +
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {cartItems.length > 0 && (
                      <div style={{ marginTop: "30px", textAlign: "center" }}>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => {
                            closeSidebar();
                            navigate("/cart");
                          }}
                        >
                          Vai al carrello
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            closeSidebar();
                            navigate("/checkout");
                          }}
                        >
                          Vai al checkout
                        </button>
                      </div>
                    )}
                  </div>
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
