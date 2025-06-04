//import { useCart } from "../components/CartContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../components/CartContext"
import { useContext } from "react";
import { useCart } from "../components/CartContext";
import { Link } from 'react-router-dom';
import checkDiscount from '../utils/checkDiscount';

function CardDetails({ data }) {

    const { prefercolor, isPrefer } = useContext(CartContext);
    const { name, description, price, game_type, target_age, min_player, max_player, image, discount_amount, categories, slug, discount_start, discount_end } = data;
    const { addToCart } = useCart();
    const { VITE_BE_PATH } = import.meta.env;

    const hasDiscount = checkDiscount(data)
    const discountAmountParsed = parseFloat(discount_amount);
    const priceParsed = parseFloat(price);
    const discountPrice = hasDiscount ? (priceParsed - (priceParsed * discountAmountParsed / 100)).toFixed(2) : priceParsed.toFixed(2);

    const dateFormatStart = new Date(discount_start).toLocaleDateString('it-IT');
    const dateFormatEnd = new Date(discount_end).toLocaleDateString('it-IT');

    return <>

        <div className="gold-gradient-border mb-5 card-detail-width">
            <div className="card-detail card card-style d-flex flex-column flex-md-row p-4">
                <FontAwesomeIcon
                    icon={solidHeart}
                    className={prefercolor(data) ? 'text-danger' : ''}
                    onClick={() => isPrefer(data)}
                />
                <figure className="d-flex w-100 w-md-50 align-items-center justify-content-center mb-3 mb-md-0">
                    <img
                        src={`${VITE_BE_PATH}/img/${image}`}
                        className="detail-img img-fluid image-container"
                        alt={name}
                        style={{ objectFit: 'contain' }}
                    />
                </figure>
                <div className="d-flex flex-column desciption-section ps-0 m-4 description-section justify-content-center">
                    <h5 className="text-center fw-bold mb-4 title-detail font-medieval">{name}</h5>
                    <p className="fst-italic fs-5 description-text">{description}</p>
                    {hasDiscount ? (
                        <div>
                            <div className="mb-3 detail-text">
                                <span className="text-decoration-line-through me-2 text-danger detail-price">{priceParsed.toFixed(2)}€</span>
                                <span className="fw-bold text-success detail-price">{discountPrice}€</span>
                                <span className="fw-bold card-detail-discount ms-2 p-1"> - {discountAmountParsed}%</span>
                            </div>
                            <p className='detail-text'>
                                Dal <strong>{dateFormatStart}</strong> al{' '}
                                <strong>{dateFormatEnd}</strong>
                            </p>
                        </div>
                    ) : (
                        <span className="mb-3 detail-text">Prezzo: {priceParsed.toFixed(2)}€</span>
                    )}
                    {game_type === 'puzzle' ? '' : <p className='detail-text'>Giocatori: {min_player} - {max_player}</p>}
                    <p className='detail-text'><strong>Età:</strong> {target_age}+</p>
                    <p className='detail-text mb-4'>
                        <strong>Categoria:</strong>{' '}
                        {categories && categories.length > 0
                            ? categories.map((c) => c.category_name).join(', ')
                            : 'Nessuna'}
                    </p>
                    <div className="text-center">
                        <button className="btn-card btn-detail text-white" onClick={() => addToCart(data)}>
                            Aggiungi al carrello
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CardDetails;