import { NavLink, useNavigate } from "react-router-dom"

function NotFoundPage() {

    const navigate = useNavigate()

    return <>
        <h1 className="text-center text-white mb-4">Houston, abbiamo un problema: 404.</h1>
        <div className="container d-flex justify-content-center mb-3">
            <img src="./src/assets/not-found.gif" alt="not found" />
        </div>
        <div className="text-center">
            <button className="btn btn-light" onClick={() => navigate('/')}>Torna alla home</button>
        </div>
    </>
}

export default NotFoundPage