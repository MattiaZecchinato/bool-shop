import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faListUl } from "@fortawesome/free-solid-svg-icons";
import CardProductList from "../components/CardProductList";

function SearchPage() {
    const [display, setDisplay] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const { VITE_BE_PATH } = import.meta.env;

    const [found, setFound] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const searchpara = searchParams.get("search") || "";
    let choicepara = searchParams.get("choice") || "name";
    let orderpara = searchParams.get("order") || "asc";
    let discountpara = searchParams.get('discount') || false



    const resetFormSearch = {
        choice: choicepara,
        search: searchpara,
        order: orderpara,
        discount: discountpara
    };
    if (choicepara === "created_at") {
        if (orderpara === "asc") {
            orderpara = "desc"
        } else {
            orderpara = "asc"
        }

    }
    // if (choicepara === "discount_amount") {
    //     if (orderpara === "asc") {
    //         orderpara = "desc"
    //     } else {
    //         orderpara = "asc"
    //     }

    // }

    const [formSearch, setFormSearch] = useState(resetFormSearch);

    function handleData(e) {
        const { name, value } = e.target;
        setFormSearch(prev => ({
            ...prev,
            [name]: value
        }));
    }

    useEffect(() => {
        callEndPoint();
    }, [searchParams, currentPage]);

    function callEndPoint() {
        let finalUri = `${VITE_BE_PATH}/shop/search?`;
        if (searchpara) {
            const currentsearch = searchpara.trim().replace(/ /g, "%20");
            finalUri += `search=${currentsearch}`;
        } else {
            finalUri += `search=%20`;
        }

        finalUri += `&choice=${choicepara}&order=${orderpara}&discount=${discountpara}`;
        finalUri += `&limit=6&page=${currentPage}`;


        axios.get(finalUri)
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
            });
    }

    function goToPage(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }


    return <>
        <div className="d-flex gap-3 align-items-end mb-5">
            <div className="col-md-3">
                <label htmlFor="inputNameGame" className="form-label">Nome gioco</label>
                <input type="text" className="form-control" id="inputNameGame" name="search" value={formSearch.search} onChange={handleData}
                />
            </div>
            <div className="col-md-2">
                <label htmlFor="inputOrder" className="form-label">Ordina Per</label>
                <select id="inputOrder" className="form-select" name="choice" value={formSearch.choice} onChange={handleData}>
                    <option value="name">Nome</option>
                    <option value="price">Prezzo</option>
                    <option value="created_at">Recenti</option>
                </select>
            </div>
            <div className="col-md-2">
                <label htmlFor="inputOrder" className="form-label">Ordina Per</label>
                <select id="inputOrder" className="form-select" name="order" value={formSearch.order} onChange={handleData}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
            <div className="col-md-2">
                <label htmlFor="inputOrder" className="form-label">solo in scontistica </label>
                <select id="inputOrder" className="form-select" name="discount" value={formSearch.discount} onChange={handleData}>
                    <option value="true">si</option>
                    <option value="false">no</option>
                </select>
            </div>

            <Link
                className="btn btn-primary col-lg-1"
                to={`/search?search=${formSearch.search.replace(/ /g, "%20")}&choice=${formSearch.choice}&order=${formSearch.order}&discount=${formSearch.discount}`}
                onClick={() => setCurrentPage(1)}
            >
                Cerca
            </Link>

        </div>

        <div className="d-flex justify-content-end mb-4 gap-2" role="group" aria-label="btn-group">
            <button type="button" className="btn btn-primary" onClick={() => setDisplay(true)}><FontAwesomeIcon icon={faGrip} /></button>
            <button type="button" className="btn btn-primary" onClick={() => setDisplay(false)}><FontAwesomeIcon icon={faListUl} /></button>
        </div>

        <div className={display ? 'row' : ''}>
            {found.length > 0
                ? found.map(elem =>
                    display
                        ? <div key={elem.id} className='col-lg-4 col-md-6 col-sm-12 mb-4'><CardProduct data={elem} /></div>
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

export default SearchPage;
