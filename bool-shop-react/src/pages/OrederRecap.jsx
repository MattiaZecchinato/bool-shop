import { useLocation, useNavigate } from "react-router-dom"

function OrderRecap() {

    const location = useLocation()
    const dataRecap = location.state?.payload

    const navigate = useNavigate()

    const { user_first_name, user_email, total_order } = dataRecap

    return <>
        <div className="text-white">
            <h1>🎉 Ordine completato con successo!</h1>
            <p>Grazie, <strong>{user_first_name}</strong>, per il tuo acquisto.</p>
            <p>Una conferma è stata inviata a <strong>{user_email}</strong>.</p>
            <p>Numero ordine: <strong>#</strong></p> {/* questo e da vedere se si implementa */}
            <p>Totale: <strong>€{total_order}</strong></p>

            <p>Riceverai una notifica quando il tuo ordine sarà spedito.</p>

            <button onClick={() => { navigate('/') }}>Torna alla HomePage</button>
        </div>
    </>
}

export default OrderRecap