import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../components/CartContext"



function TestPage() {
    const { prefercolor, isPrefer } = useContext(CartContext)


    const { VITE_BE_PATH } = import.meta.env;

    const [data, setData] = useState([]);
    const url = `${VITE_BE_PATH}/shop`;

    function getData() {
        axios.get(url)
            .then(res => {

                setData(res.data);
            })
            .catch(err => console.log(err))
    }




    useEffect(getData, []);

    return (
        <>
            <div id="carouselExampleAutoplaying" className="carousel carousel-container slide img-fluid m-auto" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="./src/assets/carosello-giochi.jpg" className="d-block w-100 carousel-img" alt="giochi-da-tavolo" />
                    </div>
                    <div className="carousel-item">
                        <img src="./src/assets/carosello-puzzle.jpg" className="d-block w-100 carousel-img" alt="puzzle" />
                    </div>
                    <div className="carousel-item">
                        <img src="./src/assets/spedizione-gratuita.jpg" className="d-block w-100 carousel-img" alt="spedizione-gratuita" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <h2>Gli ultimi arrivi:</h2>

            <ul className="list-unstyled row">
                {data && data
                    .filter(element => {
                        const rifDate = new Date('2024-01-01');
                        const createdDate = new Date(element.created_at);
                        return createdDate > rifDate;
                    })
                    .map(element => <li key={element.id} className="col-md-4 mb-4">
                        <div className="card">
                            <FontAwesomeIcon icon={solidHeart} className={prefercolor(element) ? "text-danger" : ''} onClick={() => isPrefer(element)} />
                            <img src={`${VITE_BE_PATH}/img/${element.image}`} className="card-img-top" alt={element.name} />
                            <div className="card-body">
                                <h5 className="card-title">{element.name}</h5>
                                <p className="card-text">{element.description}</p>
                                <a href="#" className="btn btn-primary">Acquista ora</a>
                            </div>
                        </div>
                    </li>)}

            </ul >

            <h2>In promozione:</h2>

            <ul className="list-unstyled row">
                {data && data
                    .filter(element => {
                        const discountAmount = element.discount_amount;

                        return discountAmount >= 15.00 & discountAmount <= 25.00;
                    })
                    .map(element => <li key={element.id} className="col-md-4 mb-4">
                        <div className="card">
                            <FontAwesomeIcon icon={solidHeart} />
                            <img src={`${VITE_BE_PATH}/img/${element.image}`} className="card-img-top" alt={element.name} />
                            <div className="card-body">
                                <h5 className="card-title">{element.name}</h5>
                                <p className="card-text">{element.description}</p>
                                <p>Categoria: <em>{element.categories.map(cat => ` ${cat.category_name}`)}</em></p>
                                <p>In promozione al {parseInt(element.discount_amount)}%</p>
                                <a href="#" className="btn btn-primary">Acquista ora</a>
                            </div>
                        </div>
                    </li>)}
            </ul>


        </>)
}

export default TestPage;


