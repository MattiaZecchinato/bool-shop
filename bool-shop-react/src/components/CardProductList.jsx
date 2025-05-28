function CardProductList({ data }) {

    const { name, price, image } = data

    return <>
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start" alt={name} />
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