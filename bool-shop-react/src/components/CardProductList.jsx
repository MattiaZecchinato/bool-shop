import { CartContext } from "../components/CartContext"
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

function CardProductList({ data }) {
    const { prefercolor, isPrefer } = useContext(CartContext)

    const { name, description, price, game_type, target_age, min_player, max_palyer, image, discount_type, discount_amount, categories } = data

    const { VITE_BE_PATH } = import.meta.env;

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
                        <p className="card-text">Prezzo: {price}€</p>
                    </div>
                    <button className="btn btn-success" onClick={() => addToCart(data)}>Aggiungi al carrello</button>
                </div>
            </div>

        </div>
    </>
}

export default CardProductList