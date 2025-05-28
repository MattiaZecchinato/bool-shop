function CardProductList({ data }) {

    const { name, description, price, game_type, target_age, min_player, max_palyer, image, discount_type, discount_amount, categories } = data

    const { VITE_BE_PATH } = import.meta.env;

    return <>
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={`${VITE_BE_PATH}/img/${image}`} className="img-fluid rounded-start" alt={name} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{price}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CardProductList