import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from "react-router-dom";

function Footer() {

    return <div className="footer-box p-3">
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <h2>Unisciti al Mondo del Gioco!</h2>
                    <p>Resta aggiornato su nuovi arrivi, offerte speciali e consigli di gioco.</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h4>Link Utili</h4>
                    <ul>
                        <li><NavLink>Home</NavLink></li>
                        <li><NavLink>Products</NavLink></li>
                        <li><NavLink></NavLink></li>
                    </ul>
                </div>
                <div className="col">
                    <h4>Info Negozio {'(se sarà presente)'}</h4>
                    <ul>
                        <li>Via del Gioco, 12 – 00100 Roma</li>
                        <li>P.IVA: 12345678901</li>
                        <li>Tel: 06 1234 5678</li>
                    </ul>
                </div>
                <div className="col">
                    <h4>Seguici</h4>

                    <ul>
                        <li>
                            <a href="https://www.facebook.com/">
                                <FontAwesomeIcon icon={faSquareFacebook} size="2x" color="#1877F2" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/">
                                <FontAwesomeIcon icon={faSquareInstagram } size="2x" color="#E4405F" />
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
            <div className="row">
                <div className="col">
                    <a href="https://www.privacypolicies.com/live/9b2ff770-5d29-4d00-92be-23e8454efeea">Privacy Policy</a>
                    <a href="https://www.privacypolicies.com/live/6335734a-012b-4f49-889e-747143e69919">Term Of Service</a>
                    <a href="https://www.privacypolicies.com/live/8c95263d-18fa-4a84-8133-515cd93875c8">Cookie Policy</a>
                </div>                
                <div className="col">
                    © 2025 BoolShop – Tutti i diritti riservati
                </div>
            </div>
        </div>
    </div>
}

export default Footer