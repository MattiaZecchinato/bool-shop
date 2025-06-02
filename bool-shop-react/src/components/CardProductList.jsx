import { CartContext } from "../components/CartContext"
import { useContext } from "react";
import { useCart } from "../components/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import checkDiscount from '../utils/checkDiscount';

function CardProductList({ data }) {
    const { prefercolor, isPrefer } = useContext(CartContext);
    const { addToCart } = useCart();

    const { name, price, image, discount_amount, slug } = data;

    const { VITE_BE_PATH } = import.meta.env;

    const hasDiscount = checkDiscount(data)
    const discountAmountParsed = parseFloat(discount_amount);
    const priceParsed = parseFloat(price);
    const discountPrice = hasDiscount ? (priceParsed - (priceParsed * discountAmountParsed / 100)).toFixed(2) : priceParsed.toFixed(2);

    return <>
        <div className="card mb-3 col-lg-8 col-sm-12 col-md-10 mx-auto">
            <div className="row g-0 align-items-center">
                <div className="col-3 col-sm-3 col-md-3">
                    <FontAwesomeIcon icon={solidHeart} className={prefercolor(data) ? "text-danger" : ''} onClick={() => isPrefer(data)} />
                    <Link to={`/detail/${slug}`}><img src={`${VITE_BE_PATH}/img/${image}`} className="img-fluid rounded-start" alt={name} /></Link>

                </div>
                <div className="col-9 col-sm-9 col-md-9">
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