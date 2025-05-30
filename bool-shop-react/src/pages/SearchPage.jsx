import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faListUl } from "@fortawesome/free-solid-svg-icons";
import CardProductList from "../components/CardProductList";


function SearchPage() {


    const [display, setDisplay] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const { VITE_BE_PATH } = import.meta.env;

    const [found, setFound] = useState({})
    const searchpara = searchParams.get("search") || ""
    console.log(searchpara)
    const choicepara = searchParams.get("choice") || "name"
    console.log(choicepara)
    const orderpara = searchParams.get("order") || "asc"
    console.log(orderpara)

    const resetFormSearch = {
        choice: choicepara,
        search: searchpara,
        order: orderpara

    }

    const [formSearch, setFormSearch] = useState(resetFormSearch)


    function handleData(e) {

        const { name, value } = e.target;

        setFormSearch(prev => ({

            ...prev,
            [name]: value
        }));
    }


    useEffect(() => {

        callEndPoint()
    }, [searchParams])

    function callEndPoint() {

        let finalUri = `${VITE_BE_PATH}/shop/search?`;
        if (searchpara) {
            const currentsearch = searchpara.trim().replace(/ /g, "%20")
            finalUri += `search=${currentsearch}`
        } else {
            finalUri += `search=%20`
        }
        finalUri += `&choice=${choicepara}&order=${orderpara}`


        console.log(finalUri)
        axios.get(finalUri)
            .then(res => {
                let data = res.data;
                setFound(data);
                console.log(data)
            })
            .catch(err => {
                setFound([])
                console.log(err.message)
            });
    }


    return <>

        <div className="d-flex gap-3 align-items-end mb-5" >
            <div className="col-md-4">
                <label htmlFor="inputNameGame" className="form-label">Nome gioco</label>
                <input type="text" className="form-control" id="inputNameGame" name="search" value={formSearch.search} onChange={handleData} />
            </div>
            <div className="col-md-4">
                <label htmlFor="inputOrder" className="form-label">Ordina Per</label>
                <select id="inputOrder" className="form-select" name="choice" value={formSearch.choice} onChange={handleData}>
                    <option value="name">Nome</option>
                    <option value="price">Prezzo</option>
                    <option value="created_at">Recenti</option>
                </select>
            </div>
            <div className="col-md-4">
                <label htmlFor="inputOrder" className="form-label">Ordina Per</label>
                <select id="inputOrder" className="form-select" name="order" value={formSearch.order} onChange={handleData}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
            <div className="col-md-4">
                <Link
                    className="btn btn-primary"
                    to={`/search?search=${formSearch.search.replace(/ /g, "%20")}&choice=${formSearch.choice}&order=${formSearch.order}`}
                >
                    cerca
                </Link>
                {/* <Link className="btn btn-primary" to={`/search?${formSearch.search.replace(/ /g, "%20")`&choice=${choice}&order=asc` || `search=%20&choice=${choice}&order=asc`}`} > cerca</Link> */}
            </div>
        </div>
        <div className="d-flex justify-content-end mb-4 gap-2" role="group" aria-label="btn-group">
            <button type="button" className="btn btn-primary" value="grid" onClick={() => setDisplay(true)}><FontAwesomeIcon icon={faGrip} /></button>
            <button type="button" className="btn btn-primary" value="list" onClick={() => setDisplay(false)}><FontAwesomeIcon icon={faListUl} /></button>
        </div>

        <div className={display ? 'row' : ''}>
            {found.length > 0 ? found.map(elem => display ? <div key={elem.id} className='col-lg-3 col-md-6 col-sm-12 mb-4'> <CardProduct data={elem} /></div> : <div key={elem.id} className="d-flex justify-content-center"><CardProductList data={elem} /></div>) : <h3>Nessun Elemento Trovato</h3>}
        </div>
    </>
}

export default SearchPage;


