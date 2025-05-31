const conn = require('../data/dbShop')
const nodemailer = require('nodemailer');
const path = require('path');
function calculatedProduct(product) {
    const { price, discount_type, discount_amount } = product;
    if (discount_type === 'fixed') {
        return (price - discount_amount)
    }
    else if (discount_type === 'percentage') {
        return price - (price * (discount_amount / 100))
    } else {
        return price
    }
}
//Funzione Index per visualizzare tutti i prodotti dentro il db
function index(req, res) {
    //Query per visualizzare i prodotti
    const sql = ` SELECT 
            p.*, 
            c.id AS category_id,
            c.genre AS category_name
        FROM products p
        LEFT JOIN category_product pc ON p.id = pc.product_id
        LEFT JOIN categories c ON pc.category_id = c.id`;
    conn.query(sql, (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const productMap = {};
        const finalProducts = [];
        results.forEach(p => {
            if (!productMap[p.id]) {
                const product = {
                    ...p,
                    final_price: parseFloat(calculatedProduct(p)).toFixed(2),
                    categories: []
                }
                productMap[p.id] = product
                finalProducts.push(product)
            }
            if (p.category_id) {
                productMap[p.id].categories.push({
                    id: p.category_id,
                    category_name: p.category_name
                })
            }
        })
        res.json(finalProducts)
    });
}
//Funzione indexSearchOrder per filtrare i vari ordini a seconda di cosa si cerca
function indexSearchOrder(req, res) {
    let { search, choice, order, limit, page, type } = req.query;

    const allowedChoices = ["name", "price", "created_at"];
    const sortBy = allowedChoices.includes(choice) ? choice : "name";

    const allowedOrders = ["asc", "desc"];
    const sortOrder = allowedOrders.includes(order?.toLowerCase()) ? order.toUpperCase() : "ASC";

    limit = parseInt(limit) || 6;
    page = parseInt(page) || 1;
    const offset = (page - 1) * limit;

    const searchParam = search ? `%${search}%` : `%`;

    let whereClause = "WHERE p.name LIKE ?";
    const queryParams = [searchParam];

    if (type) {
        whereClause += " AND p.game_type = ?";
        queryParams.push(type);
    }

    const countSql = `
        SELECT COUNT(*) AS total
        FROM products p
        ${whereClause}
    `;

    conn.query(countSql, queryParams, (err, countResult) => {
        if (err) {
            console.error('Errore nella query di conteggio:', err);
            return res.status(500).json({ error: 'Errore interno del server' });
        }

        const totalProducts = countResult[0].total;
        const totalPages = Math.ceil(totalProducts / limit);

        const productSql = `
            SELECT *
            FROM products p
            ${whereClause}
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
        `;

        conn.query(productSql, [...queryParams, limit, offset], (err, products) => {
            if (err) {
                console.error('Errore nella query dei prodotti:', err);
                return res.status(500).json({ error: 'Errore interno del server' });
            }

            if (!products.length) {
                return res.status(404).json({ error: "Nessun prodotto trovato" });
            }

            const productIds = products.map(p => p.id);

            if (productIds.length === 0) {
                return res.json({ products: [], totalProducts, totalPages, currentPage: page });
            }

            const categoriesSql = `
                SELECT pc.product_id, c.id AS category_id, c.genre AS category_name
                FROM category_product pc
                JOIN categories c ON pc.category_id = c.id
                WHERE pc.product_id IN (?)
            `;

            conn.query(categoriesSql, [productIds], (err, categories) => {
                if (err) {
                    console.error('Errore nella query delle categorie:', err);
                    return res.status(500).json({ error: 'Errore interno del server' });
                }

                // Creiamo una mappa per accedere facilmente alle categorie per product_id
                const categoriesMap = {};
                categories.forEach(cat => {
                    if (!categoriesMap[cat.product_id]) {
                        categoriesMap[cat.product_id] = [];
                    }
                    categoriesMap[cat.product_id].push({
                        id: cat.category_id,
                        category_name: cat.category_name
                    });
                });

                // Creiamo l'array finale dei prodotti mantenendo l'ordine originale di `products`
                const finalProducts = products.map(p => ({
                    ...p,
                    final_price: parseFloat(calculatedProduct(p)).toFixed(2),
                    categories: categoriesMap[p.id] || [] // Aggiungi le categorie dal categoriesMap
                }));

                res.json({
                    products: finalProducts,
                    totalProducts,
                    totalPages,
                    currentPage: page
                });
            });
        });
    });
}
//Funzione Checkout per controllare l'ordine della persona specifica
function checkout(req, res) {
    //Prendo i vari dati che mi arrivano dal req.body
    const {
        total_order,
        user_first_name,
        user_last_name,
        user_email,
        user_address,
        user_phone,
        products
    } = req.body;
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const status = "pending";
    const freeshipping = total_order > 50 ? 1 : 0;
    //Inserisce l'ordine nella tabella orders del db
    const orderQuery = `
    INSERT INTO orders (total_order,free_shipping, status, user_first_name, user_last_name, user_email, user_address, user_phone, created_at, updated_at)
    VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
    //Creo un array 
    const orderValues = [
        total_order,
        freeshipping,
        status,
        user_first_name,
        user_last_name,
        user_email,
        user_address,
        user_phone,
        now,
        now
    ];
    conn.query(orderQuery, orderValues, (err, result) => {
        if (err) return res.status(500).json({ error: "Insert Order Failed" })
        //Prendo l'id del ordine appena creato
        const orderId = result.insertId;
        //Inserisce i prodotti uno a uno
        let insertCount = 0;
        if (!products || products.length === 0) {
            return res.status(400).json({ error: "Order not found" })
        }
        products.forEach((p) => {
            console.log(p)
            //Inserisco dentro product_order l'ordine appena creato
            const productQuery = `INSERT INTO product_order(product_id, order_id,quantity, tot_price) VALUES (?,?,?,?)`;
            conn.query(productQuery, [p.product_id, orderId, p.quantity,
            p.tot_price
            ], (err2) => {
                if (err2) console.error("Error product order:", err2);
                insertCount++;
                if (insertCount === products.length) {
                    fetchProductDetailsAndSendEmail(orderId, user_email, user_first_name, user_last_name, user_address, user_phone, total_order);
                    res.status(201).json({ message: "Order added", orderId })
                }
            })

        });
    })
}
function fetchProductDetailsAndSendEmail(orderId, user_email, user_first_name, user_last_name, user_address, user_phone, total_order) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: 'boolshop0@gmail.com',
            pass: 'nvjd ouvu vifv nxse '
        }
    });

    const query = `
      SELECT p.name, p.image, po.quantity, po.tot_price
      FROM product_order po
      JOIN products p ON p.id = po.product_id
      WHERE po.order_id = ?
    `;

    conn.query(query, [orderId], (err, results) => {
        if (err) {
            console.error("Errore durante il recupero dei prodotti:", err);
            return;
        }

        // Costruzione dinamica delle righe della tabella e degli allegati
        const attachments = [];
        const productRows = results.map((p, index) => {
            const cid = `img${index}`; // es: img0, img1, img2...
            attachments.push({
                filename: p.image,
                path: path.join(__dirname, '../public/img', p.image),
                cid: cid
            });

            return `
              <tr>
                <td><img src="cid:${cid}" alt="${p.name}" width="60" height="60"></td>
                <td>${p.name}</td>
                <td>${p.quantity}</td>
                <td>€${p.tot_price}</td>
              </tr>
            `;
        }).join('');

        const mailOptions = {
            from: 'boolshop0@gmail.com',
            to: `${user_email}, boolshop0@gmail.com`,
            subject: `Conferma Ordine BoolShop - Ordine n°${orderId}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #4CAF50;">Grazie per il tuo ordine, ${user_first_name}!</h2>
                <p>Abbiamo ricevuto il tuo ordine n°<strong>${orderId}</strong>.</p>

                <h3 style="margin-top: 30px;">📦 Prodotti acquistati:</h3>
                <table style="width:100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f2f2f2;">
                      <th>Immagine</th>
                      <th>Nome</th>
                      <th>Quantità</th>
                      <th>Totale</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${productRows}
                  </tbody>
                </table>

                <h3 style="margin-top: 30px;">👤 Dati cliente:</h3>
                <p>
                  <strong>Nome:</strong> ${user_first_name} ${user_last_name}<br>
                  <strong>Email:</strong> ${user_email}<br>
                  <strong>Indirizzo:</strong> ${user_address}<br>
                  <strong>Telefono:</strong> ${user_phone}
                </p>

                <h3 style="margin-top: 30px;">💰 Totale Ordine: €${total_order}</h3>
                <p style="font-size: 0.9em; color: #666;">Stato ordine: pending</p>

                <p style="margin-top: 40px;">Riceverai un'altra email quando l’ordine sarà spedito.</p>
                <p style="color: #aaa; font-size: 0.8em;">BoolShop &copy; ${new Date().getFullYear()}</p>
              </div>
            `,
            attachments: attachments
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error("Errore invio email:", error);
            }
            console.log("Email inviata:", info.response);
        });
    });
}
//Funzione per controllare lo specifico prodotto
function productDetails(req, res) {
    const { slug } = req.params;
    const sql = `SELECT  p.*, 
            c.id AS category_id,
            c.genre AS category_name
            FROM products p
            JOIN category_product pc ON p.id = pc.product_id
            JOIN categories c ON pc.category_id = c.id
            WHERE p.slug = ?`
    conn.query(sql, [slug], (err, results) => {
        if (err) res.status(400).json({ error: "Product not found" })
        const productMap = {};
        const finalProducts = [];
        results.forEach(p => {
            if (!productMap[p.id]) {
                const product = {
                    ...p,
                    final_price: parseFloat(calculatedProduct(p)).toFixed(2),
                    categories: []
                }
                productMap[p.id] = product
                finalProducts.push(product)
            }
            if (p.category_id) {
                productMap[p.id].categories.push({
                    id: p.category_id,
                    category_name: p.category_name
                })
            }
        })
        res.json(finalProducts)
    })
}
function categoryProduct(req, res) {
    const { category_id } = req.body;

    if (!category_id) {
        return res.status(400).json({ error: "category_id è obbligatorio nel body" });
    }

    const sql = `
        SELECT p.*
        FROM products p
        JOIN category_product cp ON p.id = cp.product_id
        WHERE cp.category_id = ?
    `;

    conn.query(sql, [category_id], (err, products) => {
        if (err) {
            console.error('Errore nella query dei prodotti per categoria:', err);
            return res.status(500).json({ error: 'Errore interno del server' });
        }

        if (!products.length) {
            return res.status(404).json({ error: "Nessun prodotto trovato per questa categoria" });
        }

        const productIds = products.map(p => p.id);

        const categoriesSql = `
            SELECT pc.product_id, c.id AS category_id, c.genre AS category_name
            FROM category_product pc
            JOIN categories c ON pc.category_id = c.id
            WHERE pc.product_id IN (?)
        `;

        conn.query(categoriesSql, [productIds], (err, categories) => {
            if (err) {
                console.error('Errore nella query delle categorie:', err);
                return res.status(500).json({ error: 'Errore interno del server' });
            }

            const productMap = {};

            products.forEach(p => {
                const price = parseFloat(p.price);
                const discountAmount = parseFloat(p.discount_amount);
                let finalPrice = price;

                if (p.discount_type === 'percentage' && !isNaN(discountAmount)) {
                    finalPrice = price - (price * discountAmount / 100);
                }

                productMap[p.id] = {
                    ...p,
                    final_price: parseFloat(finalPrice.toFixed(2)),
                    categories: []
                };
            });


            categories.forEach(cat => {
                if (productMap[cat.product_id]) {
                    productMap[cat.product_id].categories.push({
                        id: cat.category_id,
                        category_name: cat.category_name
                    });
                }
            });

            const finalProducts = Object.values(productMap);

            res.json({
                products: finalProducts,
                totalProducts: finalProducts.length
            });
        });
    });
}



module.exports = { index, indexSearchOrder, checkout, productDetails, categoryProduct };
