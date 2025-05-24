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
        let controllTotal = parseInt(total_order);

        const nonConsentitiEmail = ['!', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}', '[', ']', '|', '\\', ';', ':', '\'', '"', ',', '<', '>', '/', '?', '`', '~'];

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
        }
        nonConsentitiEmail.forEach(element => {
            if (user_email.includes(element)) {
                error++;
                errorMessage += `, email must contain an "${element}" symbol`;
            }
        });
        if (user_address === '' || !user_email) {
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
            checkIfAllQueriesDone();
            return;
        } else {
            dbQueriesToComplete = products.length;
        }

        products.forEach(product => {
            const productId = parseInt(product.product_id);

            if (!product.product_id) {
                error++;
                errorMessage += `, not valid ID`;
                dbQueriesCompleted++;
                checkIfAllQueriesDone();
                return;
            } else if (isNaN(productId)) {
                error++;
                errorMessage += `, not valid ID`;
                dbQueriesCompleted++;
                checkIfAllQueriesDone();
                return;
            } else {
                const sql = `SELECT price from products WHERE products.id = ?`;
                conn.query(sql, [productId], (err, result) => {
                    dbQueriesCompleted++;

                    if (err) {
                        error++;
                        errorMessage += `, error on database for ID: ${productId}`;
                    } else {
                        if (result.length === 0) {
                            error++;
                            errorMessage += `, product with ID: ${productId} not found`;
                        } else {
                            let dbProductData = result[0];
                            let unitPriceFromDb = dbProductData.price;

                            let checktotalproduct = unitPriceFromDb * product.quantity;
                            checktotal += checktotalproduct;

                            if (checktotalproduct !== product.tot_price) {
                                error++;
                                errorMessage += `, error on total of product with ID:${productId}`;
                            }
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

                if (total_order !== checktotal) {
                    error++;
                    errorMessage += `, error on total about final products`;
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