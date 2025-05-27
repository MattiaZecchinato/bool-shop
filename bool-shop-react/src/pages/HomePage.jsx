import axios from "axios";
import { useState, useEffect } from "react";


function HomePage() {

    const [data, setData] = useState('');
    const url = 'http://127.0.0.1:3000/shop';

    function getData() {
        axios.get(url)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => console.log(err))
    }

    useEffect(getData, []);

    return (<>
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="./src/assets/spedizione-gratuita.jpg" className="d-block w-50" alt="spedizione" />
                </div>
                <div className="carousel-item">
                    <img src="./src/assets/catan.jpg" className="d-block w-50" alt="catan" />
                </div>
                <div className="carousel-item">
                    <img src="./src/assets/van-gogh.jpg" className="d-block w-50" alt="van gogh" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

        <h2>Gli ultimi arrivi:</h2>

        <ul>
            {data && data
                .filter(element => {
                    const rifDate = new Date('2024-01-01');
                    const createdDate = new Date(element.created_at);
                    return createdDate > rifDate;
                })
                .map(element => <li key={element.id}>
                    <div className="card col-3">
                        <img src={`http://127.0.0.1:3000/img/${element.image}`} className="card-img-top" alt={element.name} />
                        <div className="card-body">
                            <h5 className="card-title">{element.name}</h5>
                            <p className="card-text">{element.description}</p>
                            <a href="#" className="btn btn-primary">Acquista ora</a>
                        </div>
                    </div>
                </li>)}

        </ul >

    </>)
}

export default HomePage;
