//import { useCart } from "../components/CartContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

function CardProduct({ data }) {

    const { name, description, price, game_type, target_age, min_player, max_palyer, image, discount_type, discount_amount, categories } = data
    //const { addToCart } = useCart();
    const { VITE_BE_PATH } = import.meta.env;

    return <>

        <div className="card">
            <FontAwesomeIcon icon={solidHeart} />
            <img src={`${VITE_BE_PATH}/img/${image}`} className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
            </div>
            <div className="card-body">
                <span>Prezzo: {price}€</span>
                {parseInt(discount_amount) !== 0 ? <span className="d-inline-block ms-2">Sconto del <strong>{parseInt(discount_amount)}%</strong></span> : ''}
                <p className="card-text">Tipologia: {game_type}</p>
                <p> Anni: {target_age}+</p>
                <p>
                    Categoria: {categories && categories.length > 0
                        ? categories.map(c => c.category_name).join(', ')
                        : 'Nessuna'}
                </p>
            </div>
            {/*<button className="btn btn-success" onClick={() => addToCart(data)}>Aggiungi al carrello</button>*/}
        </div>

    </>
}

export default CardProduct

