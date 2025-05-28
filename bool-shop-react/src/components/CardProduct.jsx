//import { useCart } from "../components/CartContext"
function CardProduct({ data }) {

    const { name, description, price, game_type, target_age, min_player, max_palyer, image, discount_type, discount_amount, categories } = data
    //const { addToCart } = useCart();
    const { VITE_BE_PATH } = import.meta.env;

    return <>
        <div className="col-4">
            <div className="card" style={{ width: '18rem' }}>
                <img src={`${VITE_BE_PATH}/img/${image}`} className="card-img-top" alt={name} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{price}€</li>
                    <li className="list-group-item">{game_type}</li>
                    <li className="list-group-item">{target_age}</li>
                    <li className="list-group-item">
                        {categories && categories.length > 0
                            ? categories.map(c => c.category_name).join(', ')
                            : 'Nessuna'}
                    </li>
                </ul>
                {/*<button className="btn btn-success" onClick={() => addToCart(data)}>Aggiungi al carrello</button>*/}
            </div>
        </div>
    </>
}

export default CardProduct