import { useLocation, useNavigate } from "react-router-dom";
import magic from "../assets/magic.png";
import staff from "../assets/staff.png";

function OrderRecap() {

    const location = useLocation()
    const dataRecap = location.state?.payload

    const navigate = useNavigate()

    const { user_first_name, user_email, total_order } = dataRecap

    return <>
        <div className="container py-3 text-white row width-whish-container justify-content-center bg-light rounded rounded-3 mt-4 mb-4 border border-dark" style={{ maxWidth: "600px" }}>
            <div className="recap-container d-flex row-reverse align-items-center justify-content-center">
                <div>
                    <img className="image-recap me-2" src={staff} alt="staff" />
                    <img className="image-recap position-image-recap" src={magic} alt="magic" />
                </div>
                <h1 className="mb-4 text-dark text-center font-medieval fw-bold">Ordine completato con successo!</h1>
            </div>

            <div className="text-dark text-center">
                <p className="fs-4">Grazie <strong>{user_first_name}</strong> per il tuo acquisto.</p>
                <p className="fs-5">Una conferma è stata inviata a <strong>{user_email}</strong>.</p>
                <p className="fs-5">Totale: <strong>€{total_order}</strong></p>
                <p className="mb-5 fs-5">Riceverai una notifica quando il tuo ordine sarà spedito.</p>
            </div>
        </div>
        <div className="text-center mb-4">
            <button className="btn-search fs-5" onClick={() => { navigate('/') }}>Torna alla Homepage</button>
        </div>
    </>
}

export default OrderRecap