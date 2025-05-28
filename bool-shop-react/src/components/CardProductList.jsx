function CardProductList({ data }) {

    const { name, price, image } = data

    return <>
        <div class="card mb-3" style={{ maxWidth: '540px' }}>
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="..." class="img-fluid rounded-start" alt={name} />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{name}</h5>
                        <p class="card-text">{price}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CardProductList