function CardProduct({ data }) {

    const { name, description, price, game_type, target_age, min_player, max_palyer, image, discount_type, discount_amount } = data

    return <>
        <div className="col-4">
            <div className="card" style={{ width: '18rem' }}>
                <img src={`http://127.0.0.1:3000/img/${image}`} className="card-img-top" alt={name} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{price}€</li>
                    <li className="list-group-item">{game_type}</li>
                    <li className="list-group-item">{target_age}</li>
                </ul>
            </div>
        </div>
    </>
}

export default CardProduct