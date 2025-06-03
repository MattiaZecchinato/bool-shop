import { NavLink, useNavigate } from "react-router-dom"
import wizard from "../assets/wizard.png"

function NotFoundPage() {

    const navigate = useNavigate()

    return <>
        <h1 className="text-center text-white my-5">Ops, si è verificato un problema: 404!</h1>
        <div className="container d-flex justify-content-center mb-5">
            <img className="not-found-img" src={wizard} alt="not-found" />
        </div>
        <div className="text-white text-center mb-5">
            <p className="fs-5">A quanto pare la pagina che stavi cercando deve essere stata rubata da un goblin, ti consiglio di tornare sulla retta via!</p>
            <button className="btn btn-light" onClick={() => navigate('/')}>Torna alla home</button>
        </div>
    </>
}

export default NotFoundPage