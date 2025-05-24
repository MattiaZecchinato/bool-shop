function checkCheckout(conn) {
    return function (req, res, next) {
        const {
            total_order,
            user_first_name,
            user_last_name,
            user_email,
            user_address,
            user_phone,
            products
        } = req.body;

        let error = 0;
        let errorMessage = `The following errors occurred:`;

        if (total_order === '') {
            error++;
            errorMessage += `, the total cannot be empty`;
        }
        let controllTotal = parseInt(total_order);
        if (isNaN(controllTotal)) {
            error++;
            errorMessage += `, the total must be a number`;
        }
        if (user_first_name === '') {
            error++;
            errorMessage += `, the firstname cannot be empty`;
        }
        if (user_last_name === '') {
            error++;
            errorMessage += `, the lastname cannot be empty`;
        }
        if (user_email === '') {
            error++;
            errorMessage += `, the email cannot be empty`;
        }
        if (!user_email.includes("@")) {
            error++;
            errorMessage += `, the email must contain an "@" symbol`;
        }
        if (user_address === '') {
            error++;
            errorMessage += `, the address cannot be empty`;
        }
        if (user_phone === '') {
            error++;
            errorMessage += `, the phone number cannot be empty`;
        }

        let checktotal = 0;
        let dbQueriesToComplete = 0;
        let dbQueriesCompleted = 0;

        if (!products || products.length === 0) {
            error++;
            errorMessage += `, L'ordine deve contenere almeno un prodotto`;
            checkIfAllQueriesDone();
            return;
        } else {
            dbQueriesToComplete = products.length;
        }

        products.forEach(product => {
            const productId = parseInt(product.product_id);

            if (!product.product_id) {
                error++;
                errorMessage += `, id non valido`;
                dbQueriesCompleted++;
                checkIfAllQueriesDone();
                return;
            } else if (isNaN(productId)) {
                error++;
                errorMessage += `, id non valido`;
                dbQueriesCompleted++;
                checkIfAllQueriesDone();
                return;
            } else {
                const sql = `SELECT price from products WHERE products.id = ?`;
                conn.query(sql, [productId], (err, result) => {
                    dbQueriesCompleted++;

                    if (err) {
                        error++;
                        errorMessage += `, errore sul database per l'ID ${productId}`;
                    } else {
                        if (result.length === 0) {
                            error++;
                            errorMessage += `, prodotto con ID ${productId} non trovato`;
                        } else {
                            let dbProductData = result[0];
                            let unitPriceFromDb = dbProductData.price;

                            let checktotalproduct = unitPriceFromDb * product.quantity;
                            checktotal += checktotalproduct;

                            if (checktotalproduct !== product.tot_price) {
                                error++;
                                errorMessage += `, errore sul totale del prodotto ${productId}`;
                            }
                        }
                    }
                    checkIfAllQueriesDone();
                });
            }

            if (product.quantity <= 0) {
                error++;
                errorMessage += `, la quantità del prodotto ${product.product_id || 'sconosciuto'} non può essere 0`;
            }
            if (product.tot_price <= 0) {
                error++;
                errorMessage += `, il prezzo del prodotto ${product.product_id || 'sconosciuto'} non può essere 0`;
            }
        });

        function checkIfAllQueriesDone() {

            if (dbQueriesCompleted === dbQueriesToComplete) {

                if (total_order !== checktotal) {
                    error++;
                    errorMessage += `, errore nel totale prodotti finale`;
                }

                if (error > 0) {
                    res.status(400).json({
                        status: '400',
                        error: `${errorMessage}`,
                    });
                } else {
                    next();
                }
            }
        }
    };
}

module.exports = checkCheckout;