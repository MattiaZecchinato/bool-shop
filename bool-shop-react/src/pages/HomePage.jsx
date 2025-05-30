import axios from "axios";
import { useState, useEffect } from "react";
import CardProduct from "../components/CardProduct";
import SideCart from "../components/SideCart";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

function HomePage() {

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

    useEffect(() => {
        getData();

        const carouselElement = document.getElementById('carouselExampleAutoplaying');
        if (carouselElement) {
            const carousel = bootstrap.Carousel.getInstance(carouselElement)
                || new bootstrap.Carousel(carouselElement, { interval: 5000, ride: 'carousel' });

            carousel.cycle();
        }
    }, []);


    function groupProducts(products, groupNum = 3) {
        const groups = [];
        for (let i = 0; i < products.length; i += groupNum) {
            groups.push(products.slice(i, i + groupNum));
        }

        return groups;
    }

    return (
        <div className="home-container">
            <div className="content-box w-100 carousel-container">
                <div id="carouselExampleAutoplaying" className="carousel carousel-container slide img-fluid m-auto" data-bs-ride="carousel">
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

                <div id="carouselLatest" className="carousel slide" data-bs-ride="false">
                    <div className="carousel-inner">
                        {groupProducts(
                            data.filter(element => new Date(element.created_at) > new Date('2023-01-01'))
                        ).map((group, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <div className="row justify-content-center">
                                    {group.map(product => (
                                        <div key={product.id} className="col-lg-3 col-md-3 mb-3 d-flex">
                                            <CardProduct data={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselLatest" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselLatest" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <h2>In promozione:</h2>

                <div id="carouselPromo" className="carousel slide" data-bs-ride="false">
                    <div className="carousel-inner">
                        {groupProducts(
                            data.filter(element => {
                                const discountAmount = element.discount_amount;

                                return discountAmount >= 15.00 && discountAmount <= 25.00;
                            })
                        ).map((group, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <div className="row justify-content-center">
                                    {group.map(product => (
                                        <div key={product.id} className="col-lg-3 col-md-3 mb-3 d-flex">
                                            <CardProduct data={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselPromo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselPromo" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>



            </div>

            {/* <div className="cart-box">
                <SideCart />
            </div> */}
        </div>)
}

export default HomePage;

//  <div className="card">
//                             <FontAwesomeIcon icon={solidHeart} />
//                             <img src={`${VITE_BE_PATH}/img/${element.image}`} className="card-img-top" alt={element.name} />
//                             <div className="card-body">
//                                 <h5 className="card-title">{element.name}</h5>
//                                 <p className="card-text">{element.description}</p>
//                                 <a href="#" className="btn btn-primary">Acquista ora</a>
//                             </div>
//                         </div>