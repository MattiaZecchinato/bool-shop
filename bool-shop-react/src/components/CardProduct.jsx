//import { useCart } from "../components/CartContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../components/CartContext"
import { useContext } from "react";
import { useCart } from "../components/CartContext";
import { Link } from 'react-router-dom';
import checkDiscount from '../utils/checkDiscount';

function CardProduct({ data }) {

    const { prefercolor, isPrefer } = useContext(CartContext);
    const { name, price, image, discount_amount, categories, slug, discount_start, discount_end } = data;
    const { addToCart } = useCart();
    const { VITE_BE_PATH } = import.meta.env;

    const hasDiscount = checkDiscount(name, discount_start, discount_end)

    const discountAmountParsed = parseFloat(discount_amount);
    const priceParsed = parseFloat(price);
    const discountPrice = hasDiscount ? (priceParsed - (priceParsed * discountAmountParsed / 100)).toFixed(2) : priceParsed.toFixed(2);

    return <>

        <div className="card d-flex flex-column h-100 p-3">
            <FontAwesomeIcon icon={solidHeart} className={prefercolor(data) ? "text-danger" : ''} onClick={() => isPrefer(data)} />
            <figure className='image-container'>
                <Link to={`/detail/${slug}`}>
                    <img src={`${VITE_BE_PATH}/img/${image}`} className="card-img-top" alt={name} />
                </Link>
            </figure>
            <div className="card-body flex-grow-1 d-flex flex-column">
                <h5 className="card-title">{name}</h5>
            </div>
            <div className="card-body">
                {hasDiscount ? (<div>Prezzo: <span className='text-decoration-line-through me-2'>{priceParsed.toFixed(2)}€</span>
                    <span className='fw-bold'>{discountPrice}€</span><span className='discount-price fw-bold'> - {discountAmountParsed}%</span></div>) : (<span>Prezzo: {priceParsed.toFixed(2)}€</span>)}
                <p>
                    Categoria: {categories && categories.length > 0
                        ? categories.map(c => c.category_name).join(', ')
                        : 'Nessuna'}
                </p>
                <button className="btn btn-success" onClick={() => addToCart(data)}>Aggiungi al carrello</button>
            </div>
        </div>
    </>
}

export default CardProduct

