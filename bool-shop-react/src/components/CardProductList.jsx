import { CartContext } from "../components/CartContext"
import { useContext } from "react";
import { useCart } from "../components/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

function CardProductList({ data }) {
    const { prefercolor, isPrefer } = useContext(CartContext)
    const { addToCart } = useCart();

    const { name, description, price, game_type, target_age, min_player, max_palyer, image, discount_type, discount_amount, categories } = data

    const { VITE_BE_PATH } = import.meta.env;

    const discountAmountParsed = parseFloat(discount_amount);
    const priceParsed = parseFloat(price);
    const hasDiscount = discountAmountParsed > 0;
    const discountPrice = hasDiscount ? (priceParsed - (priceParsed * discountAmountParsed / 100)).toFixed(2) : priceParsed.toFixed(2);

    return <>
        <div className="card mb-3 w-50">
            <div className="row">
                <div className="col-md-3">
                    <FontAwesomeIcon icon={solidHeart} className={prefercolor(data) ? "text-danger" : ''} onClick={() => isPrefer(data)} />
                    <img src={`${VITE_BE_PATH}/img/${image}`} className="img-fluid rounded-start" alt={name} />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        {hasDiscount ? (<div>Prezzo: <span className='text-decoration-line-through me-2'>{priceParsed.toFixed(2)}€</span>
                            <span className='fw-bold'>{discountPrice}€</span><span className='discount-price-list fw-bold ms-2'> - {discountAmountParsed}%</span></div>) : (<span>Prezzo: {priceParsed.toFixed(2)}€</span>)}
                    </div>
                    <button className="btn btn-success btn-sm mb-2" onClick={() => addToCart(data)}>Aggiungi al carrello</button>
                </div>
            </div>

        </div>
    </>
}

export default CardProductList