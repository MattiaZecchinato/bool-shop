import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from "react-router-dom";

function Footer() {

    return (
        <footer className="bg-dark text-light p-5 mt-5">
            <div className="container">
                <div className="row d-flex justify-content-around align-items-center">
                    <div className="col-md-3 col-12 text-center">
                        <h4>Link Utili</h4>
                        <ul className="list-unstyled">
                            <li><NavLink className="text-decoration-none text-white" to="/">Home</NavLink></li>
                            <li><NavLink className="text-decoration-none text-white" to="/search">Catalogo</NavLink></li>
                            <li><NavLink className="text-decoration-none text-white" to="/privacy-policy">Privacy Policy</NavLink></li>
                            <li><NavLink className="text-decoration-none text-white" to="/term-of-service">Term Of Service</NavLink></li>
                            <li><NavLink className="text-decoration-none text-white">Contatti</NavLink></li>
                        </ul>
                    </div>
                    <div className="col-md-6 text-center col-sm-12">
                        <figure>
                            <img src="../public/bool-shop-logo.png" alt="logo" className="w-25" />
                        </figure>
                        <h2 className="mb-3">Unisciti al mondo dei giochi da tavolo!</h2>
                        <p className="fst-italic">Resta aggiornato su nuovi arrivi, offerte speciali e consigli di gioco.</p>
                        <ul className="list-unstyled">
                            <li>Via del Gioco, 12 – 00100 Roma</li>
                            <li>P.IVA: 12345678901</li>
                            <li>Tel: 06 1234 5678</li>
                        </ul>
                    </div>
                    <div className="col-md-3 text-md-end text-center col-12">
                        <h5 className="text-center pb-2">Seguici sui social</h5>
                        <ul className="text-center list-unstyled d-flex justify-content-center gap-3">
                            <li>
                                <a href="https://www.facebook.com/">
                                    <FontAwesomeIcon icon={faSquareFacebook} size="2x" color="#1877F2" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/">
                                    <FontAwesomeIcon icon={faSquareInstagram} size="2x" color="#E4405F" />
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/">
                                    <FontAwesomeIcon icon={faSquareXTwitter} size="2x" color="#000" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-3 fst-italic">
                    <p> © 2025 BoolShop – Tutti i diritti riservati</p>
                </div>
            </div>
        </footer >



    )

}

export default Footer