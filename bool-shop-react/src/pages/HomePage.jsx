import axios from "axios";
import { useState, useEffect } from "react";
import CardProduct from "../components/CardProduct";
import SideCart from "../components/SideCart";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import checkDiscount from "../utils/checkDiscount";
import elf from "../assets/christmas-elf.png";
import unicorn from "../assets/unicorn.png";
import { Link } from "react-router-dom";

function HomePage() {

    const { VITE_BE_PATH } = import.meta.env;

    const [data, setData] = useState([]);
    const [groupNum, setGroupNum] = useState(3);

    const url = `${VITE_BE_PATH}/shop`;

    function getData() {
        axios.get(url)
            .then(res => {

                setData(res.data);
            })
            .catch(err => console.log(err))
    }

    function handleResize() {
        const width = window.innerWidth;
        if (width < 576) {
            setGroupNum(1);
        } else if (width >= 576 && width < 768) {
            setGroupNum(1);
        } else if (width >= 768 && width < 992) {
            setGroupNum(2);
        } else {
            setGroupNum(3);
        }
    }

    useEffect(() => {
        getData();

        const carouselElement = document.getElementById('carouselExampleAutoplaying');
        if (carouselElement) {
            const carousel = bootstrap.Carousel.getInstance(carouselElement)
                || new bootstrap.Carousel(carouselElement, { interval: 5000, ride: 'carousel' });

            carousel.cycle();
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    function groupProducts(products) {
        const groups = [];
        for (let i = 0; i < products.length; i += groupNum) {
            groups.push(products.slice(i, i + groupNum));
        }

        return groups;
    }



    return (
        <div className="home-container mb-5">
            <div className="content-box w-100">
                <div id="carouselExampleAutoplaying" className="carousel carousel-container slide m-auto" data-bs-ride="carousel">
                    <div className="carousel-inner overflow-hidden">
                        <div className="carousel-item active">
                            <Link to={"/boardgames"} ><img src="./src/assets/img-sho-png.png" className="d-block w-100 carousel-img img-fluid" alt="giochi-da-tavolo" /></Link>
                        </div>
                        <div className="carousel-item">
                            <Link to={"/detail/catan-base"} > <img src="./src/assets/catan-png.png" className="d-block w-100 carousel-img img-fluid" alt="puzzle" /></Link>
                        </div>
                        <div className="carousel-item">
                            <Link to={"/search"} ><img src="./src/assets/spedizione-free-png.png" className="d-block w-100 carousel-img img-fluid" alt="spedizione-gratuita" /></Link>
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

                <div className="d-flex gap-2 align-items-center">
                    <h2 className="mt-5 mb-5 text-white font-medieval">Ultimi arrivi</h2>
                    <img src={elf} alt="elf" style={{ width: "50px" }} />
                </div>

                <div id="carouselLatest" className="carousel slide mb-5" data-bs-ride="false">
                    <div className="carousel-inner">
                        {groupProducts(
                            data.filter(element => new Date(element.created_at) > new Date('2023-01-01'))
                        ).map((group, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <div className="row justify-content-center flex-wrap">
                                    {group.map(product => (
                                        <div key={product.id} className='mb-3 d-flex justify-content-center col-12 col-md-6 col-lg-3' >
                                            <CardProduct data={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-control-prev position-arrow" type="button" data-bs-target="#carouselLatest" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next position-arrow-next" type="button" data-bs-target="#carouselLatest" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <div className="d-flex gap-2 align-items-center">
                    <h2 className="mt-5 mb-5 text-white font-medieval">In promozione</h2>
                    <img src={unicorn} alt="unicorn" style={{ width: "50px" }} />
                </div>


                <div id="carouselPromo" className="carousel slide mb-5" data-bs-ride="false">
                    <div className="carousel-inner">
                        {groupProducts(
                            data.filter(element => {
                                const discountAmount = element.discount_amount;
                                const checkdisc = checkDiscount(element);

                                return discountAmount >= 15.00 && discountAmount <= 40.00 && checkdisc;
                            })
                        ).map((group, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <div className="row justify-content-center">

                                    {group.map(product => (
                                        <div key={product.id} className="mb-3 d-flex justify-content-center col-12 col-md-6 col-lg-3" >
                                            <CardProduct data={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        ))}
                    </div>

                    <button className="carousel-control-prev position-arrow" type="button" data-bs-target="#carouselPromo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next position-arrow-next" type="button" data-bs-target="#carouselPromo" data-bs-slide="next">
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