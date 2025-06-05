import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faListUl } from "@fortawesome/free-solid-svg-icons";
import CardProductList from "../components/CardProductList";
import arrowRight from "../assets/arrow-right.png";

function Category() {
    const { slug } = useParams()
    const [display, setDisplay] = useState(true);
    const { VITE_BE_PATH } = import.meta.env;
    const [loading, setLoading] = useState(true);

    const [found, setFound] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    console.log(slug)




    useEffect(() => {
        callEndPoint();
    }, [currentPage, slug]);

    function callEndPoint() {
        const slugPar = {
            "category_id": slug
        }
        let finalUri = `${VITE_BE_PATH}/shop/category`;

        setLoading(true);

        axios.post(finalUri, slugPar)
            .then(res => {

                const data = res.data;
                setFound(data.products || []);
                setTotalPages(data.totalPages || 1);
                setCurrentPage(data.currentPage || 1);
            })
            .catch(err => {
                setFound([]);
                setTotalPages(1);
                setCurrentPage(1);
            })
            .finally(() => {
                setLoading(false);
            });
    }


    function goToPage(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    return <>


        <div className="d-flex justify-content-end mb-4 gap-2" role="group" aria-label="btn-group">
            <button type="button" className="btn btn-light" onClick={() => setDisplay(true)}><FontAwesomeIcon icon={faGrip} /></button>
            <button type="button" className="btn btn-light" onClick={() => setDisplay(false)}><FontAwesomeIcon icon={faListUl} /></button>
        </div>

        <div className={display ? 'row justify-content-center' : ''}>
            {loading ?
                <div className="container bg-light fst-italic p-5 rounded rounded-3 d-flex align-items-center gap-2 justify-content-center mb-5" style={{ maxWidth: "600px" }}>
                    <p className="text-dark fst-italic text-center fs-5 my-auto">caricamento in corso</p>
                    {/* <img src={sadUnicorn} alt="sad-unicorn" style={{ width: "50px" }} /> */}
                </div>
                :
                found.length > 0
                    ? found.map(elem =>
                        display
                            ? <div key={elem.id} className='col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center'><CardProduct data={elem} /></div>
                            : <div key={elem.id} className="d-flex justify-content-center"><CardProductList data={elem} /></div>
                    )
                    : <h3>Nessun Elemento Trovato</h3>
            }
        </div>

        <div className="d-flex justify-content-center my-4 gap-3 align-items-center">
            <button className="btn-prev-next" disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>
                <img className="arrow-style reverse-arrow" src={arrowRight} alt="arrow-right" />
            </button>
            <span className="text-white fs-5">Pagina <strong>{currentPage}</strong> di {totalPages}</span>
            <button className="btn-prev-next" disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>
                <img className="arrow-style" src={arrowRight} alt="arrow-right" />
            </button>
        </div>
    </>
}


export default Category;