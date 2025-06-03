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
        let controllTotal = parseFloat(total_order);
        const notAllowedSymbols = ['!', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}', '[', ']', '|', '\\', ';', ':', '\'', '"', ',', '<', '>', '/', '?', '`', '~'];

        if (total_order === '' || !total_order) {
            error++;
            errorMessage += `, total cannot be empty or do not exist`;
        }
        if (isNaN(controllTotal)) {
            error++;
            errorMessage += `, total must be a number`;
        }
        if (user_first_name === '' || !user_first_name) {
            error++;
            errorMessage += `, firstname cannot be empty or not exist`;
        }
        if (user_last_name === '' || !user_last_name) {
            error++;
            errorMessage += `, lastname cannot be empty or not exist`;
        }
        if (user_email === '' || !user_email) {
            error++;
            errorMessage += `, email cannot be empty or not exist`;
        } else if (!user_email.includes("@")) {
            error++;
            errorMessage += `, email must contain an "@" symbol`;
        } else {
            let checkmail = user_email.split('');
            let controlmail = 0;
            checkmail.forEach(element => {
                if (element === '@') {
                    controlmail++;
                }
            });
            if (controlmail > 1) {
                error++;
                errorMessage += `, email cannot contain more than 1 "@" symbol`;
            }
        }

        notAllowedSymbols.forEach(element => {
            if (user_email.includes(element)) {
                error++;
                errorMessage += `, email must not contain "${element}"`;
            }
        });

        if (user_address === '' || !user_address) {
            error++;
            errorMessage += `, address cannot be empty or do not exist`;
        }

        if (user_phone === '' || !user_phone) {
            error++;
            errorMessage += `, phone number cannot be empty or do not exist`;
        }

        let checktotal = 0;
        let dbQueriesToComplete = 0;
        let dbQueriesCompleted = 0;

        if (!products || products.length === 0) {
            error++;
            errorMessage += `, order must contain at least one product`;
            return res.status(400).json({ status: '400', error: errorMessage });
        } else {
            dbQueriesToComplete = products.length;
        }

        products.forEach(product => {
            const productId = parseInt(product.product_id);

            if (!product.product_id || isNaN(productId)) {
                error++;
                errorMessage += `, not valid ID`;
                dbQueriesCompleted++;
                checkIfAllQueriesDone();
                return;
            } else {
                const sql = `SELECT price, discount_type, discount_amount ,discount_start, discount_end FROM products WHERE products.id = ?`;
                conn.query(sql, [productId], (err, result) => {
                    dbQueriesCompleted++;

                    if (err) {
                        error++;
                        errorMessage += `, error on database for ID: ${productId}`;
                    } else if (result.length === 0) {
                        error++;
                        errorMessage += `, product with ID: ${productId} not found`;
                    } else {
                        let dbProductData = result[0];
                        let unitPriceFromDb = parseFloat(dbProductData.price);
                        let getDate = new Date()
                        console.log(getDate)
                        if (getDate >= dbProductData.discount_start && getDate <= dbProductData.discount_end) {
                            unitPriceFromDb -= unitPriceFromDb * (parseFloat(dbProductData.discount_amount) / 100);
                            unitPriceFromDb = parseFloat(unitPriceFromDb.toFixed(2));
                        }

                        let checktotalproduct = unitPriceFromDb * product.quantity;
                        checktotal += checktotalproduct;

                        const priceDifference = Math.abs(checktotalproduct - product.tot_price);
                        if (priceDifference > 0.01) {
                            error++;
                            errorMessage += `, error on total of product with ID:${productId}`;
                        }
                    }

                    checkIfAllQueriesDone();
                });
            }

            if (product.quantity <= 0) {
                error++;
                errorMessage += `, product quantity ${product.product_id || 'unknown'} can't be 0`;
            }

            if (product.tot_price <= 0) {
                error++;
                errorMessage += `, product price ${product.product_id || 'unknown'} can't be 0`;
            }
        });

        function checkIfAllQueriesDone() {
            if (dbQueriesCompleted === dbQueriesToComplete) {
                const orderTotalFloat = parseFloat(total_order);
                const expectedShipping = checktotal < 50 ? 4.99 : 0;
                const expectedTotal = checktotal + expectedShipping;

                const difference = Math.abs(orderTotalFloat - expectedTotal);

                console.log("Totale prodotti:", checktotal.toFixed(2));
                console.log("Spedizione prevista:", expectedShipping.toFixed(2));
                console.log("Totale atteso:", expectedTotal.toFixed(2));
                console.log("Totale ricevuto:", orderTotalFloat.toFixed(2));
                console.log("Differenza:", difference.toFixed(2));

                if (difference > 0.05) {
                    error++;
                    errorMessage += `, total mismatch: expected ${expectedTotal.toFixed(2)}, received ${orderTotalFloat.toFixed(2)}`;
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
