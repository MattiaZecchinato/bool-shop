import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";
import { useParams } from "react-router-dom";


function SearchPage() {

    const { slug, type } = useParams();
    const { VITE_BE_PATH } = import.meta.env;

    const [found, setFound] = useState({})

    const resetFormSearch = {

        search: slug,
        choice: type
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
    }, [slug, type])

    function callEndPoint() {
        let currentSearch = formSearch.search.trim();
        let currentChoice = formSearch.choice;


        let finalUri;
        if (currentSearch === "") {

            finalUri = `${VITE_BE_PATH}/shop/search?search=%20&choice=${currentChoice}`;
        } else {
            finalUri = `${VITE_BE_PATH}/shop/search?search=${currentSearch}&choice=${currentChoice}`;
        }

        axios.get(finalUri)
            .then(res => {
                let data = res.data;
                if (currentChoice === "created_at") {
                    data.reverse();
                }
                setFound(data);
            })
            .catch(err => {
                setFound([])
                console.log(err.message)
            });
    }


    return <>
        <form className="row g-3" >
            <div className="col-md-6">
                <label htmlFor="inputNameGame" className="form-label">Nome gioco</label>
                <input type="text" className="form-control" id="inputNameGame" name="search" value={formSearch.search} onChange={handleData} />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputOrder" className="form-label">Ordina Per</label>
                <select id="inputOrder" className="form-select" name="choice" value={formSearch.choice} onChange={handleData}>
                    <option value="name">Nome</option>
                    <option value="price">Prezzo</option>
                    <option value="created_at">Recenti</option>
                </select>
            </div>
            <div className="col-12">
                {/* <button type="submit" className="btn btn-primary">Cerca</button> */}

                <Link className="btn btn-primary" to={`/search/${formSearch.search || '%20'}/${formSearch.choice}`} > cerca</Link>
            </div>
        </form>

        <div className="container row">
            {found.length > 0 ? found.map(elem => <CardProduct key={elem.id} data={elem} />) : <h3>Nessun Elemento Trovato</h3>}
        </div>
    </>
}

export default SearchPage;