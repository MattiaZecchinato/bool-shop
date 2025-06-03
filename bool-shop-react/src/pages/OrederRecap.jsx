import { useLocation, useNavigate } from "react-router-dom";
import magic from "../assets/magic.png";
import staff from "../assets/staff.png";

function OrderRecap() {

    const location = useLocation()
    const dataRecap = location.state?.payload

    const navigate = useNavigate()

    const { user_first_name, user_email, total_order } = dataRecap

    return <>
        <div className="text-white card-detail-width recap-container my-5">
            <h1 className="mb-4"><img className="image-recap me-2" src={staff} alt="staff" /><img className="image-recap position-image-recap" src={magic} alt="magic" />Ordine completato con successo!</h1>
            <p>Grazie, <strong>{user_first_name}</strong>, per il tuo acquisto.</p>
            <p>Una conferma è stata inviata a <strong>{user_email}</strong>.</p>
            <p>Numero ordine: <strong>#</strong></p> {/* questo e da vedere se si implementa */}
            <p>Totale: <strong>€{total_order}</strong></p>

            <p className="mb-5">Riceverai una notifica quando il tuo ordine sarà spedito.</p>

            <button className="btn btn-outline-light" onClick={() => { navigate('/') }}>Torna alla HomePage</button>
        </div>
    </>
}

export default OrderRecap