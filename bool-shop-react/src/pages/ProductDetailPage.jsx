import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardDetails from "../components/CardDetails";
// import CardProductList from "../components/CardProductList";
// import CardProduct from "../components/CardProduct";
import CardCorrelates from "../components/CardCorrelates";

function ProductDetailPage() {
    const { slug } = useParams();
    const [data, setData] = useState([]);
    const [dataDettail, setDataDettail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [groupNum, setGroupNum] = useState(3);


    const { VITE_BE_PATH } = import.meta.env;

    const url = `${VITE_BE_PATH}/shop`;

    function getData() {
        setLoading(true);
        axios.get(`${url}/${slug}`)
            .then(res => {
                setData(res.data[0]);
                getDataDettail(res.data[0]);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

    function getDataDettail(cat) {


        const requests = cat.categories.map(element => {
            const sarch = {
                "category_id": element.id
            };
            return axios.post(`${VITE_BE_PATH}/shop/category`, sarch);
        });

        Promise.all(requests)
            .then(responses => {
                const allData = responses.flatMap(res => res.data.products);
                setDataDettail(allData);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
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

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [slug]);


    const arraycheck = []
    dataDettail.forEach(element => {
        const ceck = arraycheck.find(e => e.id === element.id);
        if (!ceck) {
            arraycheck.push(element);
        }
    });

    const finalArray = []

    arraycheck.forEach(element => {
        if (element.id !== data.id && finalArray.length < 6) {
            finalArray.push(element)
        }
    });


    function groupProducts(products) {
        const groups = [];
        for (let i = 0; i < products.length; i += groupNum) {
            groups.push(products.slice(i, i + groupNum));
        }
        return groups;
    }

    return (
        <>
            {loading ? (
                <h3>Caricamento in corso...</h3>
            ) : (
                <>
                    {/* {data ? <CardDetails data={data} /> : <p>Nessun prodotto!</p>}
                    <h3>Prodotti correlati</h3>
                    {dataDettail && dataDettail.length > 0 ? (
                        finalArray.map((e) => <CardProduct key={e.id} data={e} />)
                    ) : (
                        <p>Nessun prodotto correlato!</p>
                    )} */}

                    {data ? <CardDetails data={data} /> : <p>Nessun prodotto!</p>}

                    <h3 className="mt-5 mb-5 text-white">Prodotti correlati</h3>

                    {dataDettail && dataDettail.length > 0 ? (
                        <div id="carouselLatest" className="carousel slide" data-bs-ride="false">
                            <div className="carousel-inner pt-4">
                                {groupProducts(finalArray).map((group, index) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                        <div className="row justify-content-center flex-wrap">
                                            {group.map(product => (
                                                <div key={product.id} className="mb-3 d-flex justify-content-center col-12 col-md-6 col-lg-3">
                                                    <CardCorrelates data={product} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="carousel-control-prev position-arrow"
                                type="button"
                                data-bs-target="#carouselLatest"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>

                            <button
                                className="carousel-control-next position-arrow-next"
                                type="button"
                                data-bs-target="#carouselLatest"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    ) : (
                        <p>Nessun prodotto correlato!</p>
                    )}
                </>
            )}
        </>
    );
}

export default ProductDetailPage;