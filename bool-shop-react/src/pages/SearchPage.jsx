import axios from "axios";
import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";

function SearchPage() {

    const { VITE_BE_PATH } = import.meta.env;

    const [found, setFound] = useState({})

    const resetFormSearch = {

        search: '',
        choice: 'name'
    }

    const [formSearch, setFormSearch] = useState(resetFormSearch)

    const uri = `${VITE_BE_PATH}/shop/search?search=${formSearch.search}&choice=${formSearch.choice}`

    function handleData(e) {

        const { name, value } = e.target;

        setFormSearch(prev => ({

            ...prev,
            [name]: value
        }));

        console.log(value)
    }

    function sendForm(e) {

        e.preventDefault();

        console.log(uri)

        console.log(formSearch)

        callEndPoint()
    }

    useEffect(() => {

        callEndPoint()
    }, [])

    function callEndPoint() {

        axios.get(uri)
            .then(res => {
                console.log(res.data)
                setFound(res.data)
            })
            .catch(err => console.log(err.message))
    }

    return <>
        <form className="row g-3" onSubmit={sendForm}>
            <div className="col-md-6">
                <label htmlFor="inputNameGame" className="form-label">Nome gioco</label>
                <input type="text" className="form-control" id="inputNameGame" name="search" value={formSearch.search} onChange={handleData} />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputOrder" className="form-label">Ordina Per</label>
                <select id="inputOrder" className="form-select" name="choice" value={formSearch.choice} onChange={handleData}>
                    <option value="name">Nome</option>
                    <option value="price">Prezzo</option>
                    <option value="recent">Recenti</option>
                </select>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Cerca</button>
            </div>
        </form>

        <div className="container row">
            {found.length > 0 ? found.map(elem => <CardProduct key={elem.id} data={elem} />) : <h3>Nessun Elemento Trovato</h3>}
        </div>
    </>
}

export default SearchPage;