import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faListUl } from "@fortawesome/free-solid-svg-icons";
import CardProductList from "../components/CardProductList";

function BoardgamesPage() {

    const [display, setDisplay] = useState(true);
    const { VITE_BE_PATH } = import.meta.env;

    const [found, setFound] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        callEndPoint();
    }, [currentPage]);

    function callEndPoint() {

        let finalUri = `${VITE_BE_PATH}/shop/search?type=board_game&page=${currentPage}`;

        axios.get(finalUri)
            .then(res => {

                console.log(res.data)
                const data = res.data;
                setFound(data.products || []);
                setTotalPages(data.totalPages || 1);
                setCurrentPage(data.currentPage || 1);
            })
            .catch(err => {
                setFound([]);
                setTotalPages(1);
                setCurrentPage(1);
            });
    }


    function goToPage(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    return <>


        <div className="d-flex justify-content-end mb-4 gap-2" role="group" aria-label="btn-group">
            <button type="button" className="btn btn-primary" onClick={() => setDisplay(true)}><FontAwesomeIcon icon={faGrip} /></button>
            <button type="button" className="btn btn-primary" onClick={() => setDisplay(false)}><FontAwesomeIcon icon={faListUl} /></button>
        </div>

        <div className={display ? 'row' : ''}>
            {found.length > 0
                ? found.map(elem =>
                    display
                        ? <div key={elem.id} className='col-lg-4 mb-4'><CardProduct data={elem} /></div>
                        : <div key={elem.id} className="d-flex justify-content-center"><CardProductList data={elem} /></div>
                )
                : <h3>Nessun Elemento Trovato</h3>
            }
        </div>

        <div className="d-flex justify-content-center my-4 gap-3">
            <button className="btn btn-outline-primary" disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>
                ← Precedente
            </button>
            <span>Pagina {currentPage} di {totalPages}</span>
            <button className="btn btn-outline-primary" disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>
                Successiva →
            </button>
        </div>
    </>
}

export default BoardgamesPage;