//import { useCart } from "../components/CartContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../components/CartContext"
import { useContext } from "react";
import { useCart } from "../components/CartContext";
import { Link } from 'react-router-dom';

function CardDetails({ data }) {

    const { prefercolor, isPrefer } = useContext(CartContext);
    const { name, description, price, game_type, target_age, min_player, max_player, image, discount_amount, categories, slug, discount_start, discount_end } = data;
    const { addToCart } = useCart();
    const { VITE_BE_PATH } = import.meta.env;

    const discountAmountParsed = parseFloat(discount_amount);
    const priceParsed = parseFloat(price);
    const hasDiscount = discountAmountParsed > 0;
    const discountPrice = hasDiscount ? (priceParsed - (priceParsed * discountAmountParsed / 100)).toFixed(2) : priceParsed.toFixed(2);

    const dateFormatStart = new Date(discount_start).toLocaleDateString('it-IT');
    const dateFormatEnd = new Date(discount_end).toLocaleDateString('it-IT');

    return <>

        <div className="card-detail d-flex mb-5">
            <FontAwesomeIcon icon={solidHeart} className={prefercolor(data) ? "text-danger" : ''} onClick={() => isPrefer(data)} />
            <figure className='d-flex details-img'>
                <img src={`${VITE_BE_PATH}/img/${image}`} className="card-img-top" alt={name} />
            </figure>
            <div className="d-flex flex-column ms-5">
                <h5 className="text-center fw-bold fs-3 mb-4">{name}</h5>
                <p className="fst-italic fs-4">{description}</p>
                {hasDiscount ? (
                    <div>
                        <div className='mb-3'>
                            Prezzo:
                            <span className='text-decoration-line-through me-2 '>{priceParsed.toFixed(2)}€</span>
                            <span className='fw-bold'>{discountPrice}€</span><span className='fw-bold card-detail-discount ms-2 p-1'> - {discountAmountParsed}%</span>
                        </div>
                        <p >A partire dal <strong>{dateFormatStart}</strong> fino al <strong>{dateFormatEnd}</strong></p></div>) : (<span className='mb-3'>Prezzo: {priceParsed.toFixed(2)}€</span>)}
                {/* <p className="">Tipologia: {game_type}</p> */}
                {game_type === 'puzzle' ? '' : <p>Giocatori: {min_player} - {max_player}</p>}
                <p> Età: {target_age}+</p>
                <p>
                    Categoria: {categories && categories.length > 0
                        ? categories.map(c => c.category_name).join(', ')
                        : 'Nessuna'}
                </p>
                <div className="text-center">
                    <button className="btn btn-success w-25" onClick={() => addToCart(data)}>Aggiungi al carrello</button>
                </div>
            </div>
        </div>

    </>
}

export default CardDetails;