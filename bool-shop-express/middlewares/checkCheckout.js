function checkCheckout(req, res, next) {

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
    let errorMessage = `The following errors occurred:`

    if (total_order === '') {
        error++
        errorMessage += `, the total cannot be empty`
    }
    let controllTotal = parseInt(total_order)
    if (isNaN(controllTotal)) {
        error++
        errorMessage += `, the total must be a number`
    }
    if (user_first_name === '') {
        error++
        errorMessage += `, the firstname cannot be empty`
    }
    if (user_last_name === '') {
        error++
        errorMessage += `, the lastname cannot be empty`
    }
    if (user_email === '') {
        error++
        errorMessage += `, the email cannot be empty`
    }
    if (!user_email.includes("@")) {
        error++
        errorMessage += `, the email must contain an "@" symbol`
    }
    if (user_address === '') {
        error++
        errorMessage += `, the address cannot be empty`
    }
    if (user_phone === '') {
        error++
        errorMessage += `, the phone number cannot be empty`
    }

    products.forEach(product => {
        if (product.quantity <= 0) {
            error++
            errorMessage += `, the quantity cannot be 0 `
        }
        if (product.tot_price <= 0) {
            error++
            errorMessage += `, the price cannot be 0 `
        }
    });

    if (error > 0) {
        console.log(`I'm here`)
        res.status(500).json({

            status: '500',
            error: `${errorMessage}`,
        })
    } else {
        next()
    }

}

module.exports = checkCheckout;