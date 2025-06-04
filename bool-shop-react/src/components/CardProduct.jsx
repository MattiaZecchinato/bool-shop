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

    const hasDiscount = checkDiscount(data)

    const discountAmountParsed = parseFloat(discount_amount);
    const priceParsed = parseFloat(price);
    const discountPrice = hasDiscount ? (priceParsed - (priceParsed * discountAmountParsed / 100)).toFixed(2) : priceParsed.toFixed(2);

    return <>

        <div className="gold-gradient-border mb-4 h-100">
            <div className="card card-style d-flex flex-column h-100 p-2 width-card">

                {/* HEADER: Icona + Immagine */}
                <div className="d-flex justify-content-between">
                    <FontAwesomeIcon
                        icon={solidHeart}
                        className={prefercolor(data) ? "text-danger" : ""}
                        onClick={() => isPrefer(data)}
                    />
                </div>

                <figure className="image-container mt-2">
                    <Link to={`/detail/${slug}`}>
                        <img
                            src={`${VITE_BE_PATH}/img/${image}`}
                            className="card-img-top w-75 mx-auto d-block"
                            alt={name}
                        />
                    </Link>
                </figure>

                {/* BODY */}
                <div className="card-body d-flex flex-column flex-grow-1 align-items-center text-center">
                    <h4 className="card-title fw-bold mb-3 fs-5 font-medieval">{name}</h4>

                    <div className='mt-auto'>
                        {hasDiscount ? (
                            <div className='pb-2'>
                                <span className="text-decoration-line-through me-2 text-danger">
                                    {priceParsed.toFixed(2)}€
                                </span>
                                <span className="fw-bold text-success fs-5 ">{discountPrice}€</span>
                                <span className="discount-price fw-bold"> - {discountAmountParsed}%</span>
                            </div>
                        ) : (
                            <div className='pb-2'>
                                <span className="mb-2 fs-5 fw-bold text-dark pb-2">
                                    {priceParsed.toFixed(2)}€
                                </span>
                            </div>


                        )}

                        <p className="mb-4 fs-5">
                            <strong>Categoria:</strong>{" "}
                            {categories && categories.length > 0
                                ? categories.map((c) => c.category_name).join(", ")
                                : "Nessuna"}
                        </p>

                        {/* FOOTER: Bottone spinto in basso */}
                        <button
                            className="btn-card text-white"
                            onClick={() => addToCart(data)}
                        >
                            Aggiungi al carrello
                        </button>
                    </div>
                </div>

            </div>
        </div >

    </>
}

export default CardProduct

