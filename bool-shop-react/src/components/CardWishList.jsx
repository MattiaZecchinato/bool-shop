import { CartContext } from "../components/CartContext"
import { useContext } from "react";
import { useCart } from "../components/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import checkDiscount from '../utils/checkDiscount';

function CardWishList({ data }) {
    const { prefercolor, isPrefer } = useContext(CartContext);
    const { addToCart } = useCart();

    const { name, price, image, discount_amount, slug } = data;

    const { VITE_BE_PATH } = import.meta.env;

    const hasDiscount = checkDiscount(data)
    const discountAmountParsed = parseFloat(discount_amount);
    const priceParsed = parseFloat(price);
    const discountPrice = hasDiscount ? (priceParsed - (priceParsed * discountAmountParsed / 100)).toFixed(2) : priceParsed.toFixed(2);

    return <>


        <div className="gold-gradient-border-list mb-3 col-lg-6 col-sm-12 col-md-6 width-wish-cards">
            <div className="card card-style mx-auto h-100">
                <div className="row g-0 align-items-stretch h-100">
                    <div className="col-4 col-sm-4 col-md-4 d-flex flex-column align-items-center justify-content-center h-100 p-1">
                        <FontAwesomeIcon
                            icon={solidHeart}
                            className={prefercolor(data) ? "text-danger" : ''}
                            onClick={() => isPrefer(data)}
                        />
                        <Link to={`/detail/${slug}`}>
                            <img
                                src={`${VITE_BE_PATH}/img/${image}`}
                                className="img-fluid rounded-start image-container h-auto"
                                alt={name}
                            />
                        </Link>
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 d-flex flex-column justify-content-between h-100 ">
                        <div className="card-text-block p-2 ms-2">
                            <h5 className="card-title fw-bold padding-card-title">{name}</h5>
                            {hasDiscount ? (
                                <div className="price-block">
                                    <span className="text-decoration-line-through me-2 text-danger red-price">
                                        {priceParsed.toFixed(2)}€
                                    </span>
                                    <span className="fw-bold text-success green-price">{discountPrice}€</span>
                                    <span className="discount-price-list fw-bold ms-2">
                                        - {discountAmountParsed}%
                                    </span>
                                </div>
                            ) : (
                                <div className="price-block">
                                    <span className="fixed-price">{priceParsed.toFixed(2)}€</span>
                                </div>
                            )}
                        </div>

                        <div className="mb-2 ms-3">
                            <button
                                className="btn-card text-white btn-sm"
                                onClick={() => addToCart(data)}
                            >
                                Aggiungi al carrello
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default CardWishList