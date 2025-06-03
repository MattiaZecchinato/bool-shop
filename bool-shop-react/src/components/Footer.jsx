import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from "react-router-dom";
import { faXTwitter, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

function Footer() {

    return (
        <footer className="text-light p-5 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <figure className="d-flex justify-content-center">
                            <img src="/bool-shop-logo.png" alt="logo" style={{ width: "100px" }} />
                        </figure>
                    </div>
                </div>
                <div className="row">
                    {/* Link Utili - Sinistra su desktop, sotto a sinistra su mobile/tablet */}
                    <div className="col-6 col-lg-4 order-2 order-lg-0 text-center text-lg-start d-flex flex-column align-items-center">
                        <h5 className="fw-bold">Link Utili</h5>
                        <ul className="list-unstyled d-flex flex-column align-items-center">
                            <li><NavLink className="text-decoration-none text-white" to="/">Home</NavLink></li>
                            <li><NavLink className="text-decoration-none text-white" to="/search">Catalogo</NavLink></li>
                            <li><NavLink className="text-decoration-none text-white" to="/boardgames">Giochi Da Tavolo</NavLink></li>
                            <li><NavLink className="text-decoration-none text-white" to="/puzzles">Puzzle</NavLink></li>
                            <li><NavLink className="text-decoration-none text-white">Contatti</NavLink></li>
                        </ul>
                    </div>

                    {/* Unisciti - Centrale su desktop, in alto su mobile/tablet */}
                    <div className="col-12 col-lg-4 order-0 order-lg-1 text-center mb-4 mb-lg-0">
                        <h4 className="mb-3 fw-bold">Unisciti al mondo dei giochi da tavolo!</h4>
                        <p className="fst-italic">Resta aggiornato su nuovi arrivi, offerte speciali e consigli di gioco.</p>
                        <ul className="list-unstyled">
                            <li>Via del Gioco, 12 – 00100 Roma</li>
                            <li>P.IVA: 12345678901</li>
                            <li>Tel: 06 1234 5678</li>
                        </ul>
                    </div>

                    {/* Social - Destra su desktop, sotto a destra su mobile/tablet */}
                    <div className="col-6 col-lg-4 order-3 order-lg-2 text-center text-lg-end d-flex flex-column align-items-center ">
                        <h5 className="fw-bold">Seguici sui social</h5>
                        <ul className="list-unstyled d-flex justify-content-center justify-content-lg-end align-items-center gap-3">
                            <li>
                                <a href="https://x.com/" style={{
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '30px',
                                    height: '30px',
                                    // padding rimosso
                                }}>
                                    <FontAwesomeIcon icon={faXTwitter} color="#000" style={{ fontSize: '1.25em' }} />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/" style={{
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '30px',
                                    height: '30px',
                                }}>
                                    <FontAwesomeIcon icon={faInstagram} color="#E4405F" style={{ fontSize: '1.25em' }} />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/" style={{
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '30px',
                                    height: '30px',
                                }}>
                                    <FontAwesomeIcon icon={faFacebookF} color="#1877F2" style={{ fontSize: '1.25em' }} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>


                <div className="row">
                    <div className="col text-center mt-3 fst-italic">
                        <p> © 2025 BoolShop – Tutti i diritti riservati</p>
                    </div>
                </div>
            </div>
        </footer>
    )

}

export default Footer