function checkCheckout(err, req, res, next) {

    const {
        total_order,
        user_first_name,
        user_last_name,
        user_email,
        user_address,
        user_phone,
        products
    } = req.body;

    let error = 0
    let errorMessage = `si sono verificati i seguenti errori`

    if (total_order === '') {
        error++
        errorMessage += `, il totale non puo essere vuoto`
    }
    let controllTotal = parseInt(total_order)
    if (isNaN(controllTotal)) {
        error++
        errorMessage += `, il totale deve essere un numero`
    }
    if (user_first_name === '') {
        error++
        errorMessage += `, il nome non puo essere vuoto`
    }
    if (user_last_name === '') {
        error++
        errorMessage += `, il cognome non puo essere vuoto`
    }
    if (user_email === '') {
        error++
        errorMessage += `, l'email non puo essere vuoto`
    }
    if (!user_email.includes("@")) {
        error++
        errorMessage += `, l'email deve conterenere un @`
    }
    if (user_address === '') {
        error++
        errorMessage += `, l'indirizzo non puo essere vuoto`
    }
    if (user_phone === '') {
        error++
        errorMessage += `, il numero di telefono non puo essere vuoto`
    }

    products.forEach(product => {
        if (product.quantity <= 0) {
            error++
            errorMessage += `, la quantita non puo essere 0 `
        }
        if (product.tot_price <= 0) {
            error++
            errorMessage += `, il prezzo non puo essere 0 `
        }
    });

    if (error > 0) {

        res.status(500).json({

            status: '500',
            error: `${errorMessage}`,
        })
    } else {
        next()
    }



}
module.exports = checkCheckout;