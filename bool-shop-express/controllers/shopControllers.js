const conn = require('../data/dbShop')
//Funzione Index per visualizzare tutti i prodotti dentro il db
function index(req, res) {
    //Query per visualizzare i prodotti
    const sql = `SELECT * FROM products`;
    conn.query(sql, (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results)
    });
}
//Funzione indexSearchOrder per filtrare i vari ordini a seconda di cosa si cerca
function indexSearchOrder(req, res) {
    const {search,choice} = req.body
    const sql = `SELECT * FROM products p WHERE p.name LIKE ? ORDER BY ?`;
    const searchParams = `%${search}%`
    conn.query(sql,[searchParams,choice], (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!results || results.length === 0) {
            return res.status(400).json({ error: "Product not found" })
        }
        res.json(results)
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
    //Inserisce l'ordine nella tabella orders del db
    const orderQuery = `
    INSERT INTO orders (total_order, status, user_first_name, user_last_name, user_email, user_address, user_phone, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
    //Creo un array 
    const orderValues = [
        total_order,
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
            //Inserisco dentro product_order l'ordine appena creato
            const productQuery = `INSERT INTO product_order(product_id, order_id,quantity, tot_price) VALUES (?,?,?,?)`;
            conn.query(productQuery, [p.product_id, orderId, p.quantity,
            p.tot_price
            ], (err2) => {
                if (err2) console.error("Error product order:", err2);
                insertCount++;
                if (insertCount === products.length) {
                    res.status(201).json({ message: "Order added", orderId })
                }
            })

        });
    })
}
//Funzione per controllare lo specifico prodotto
function productDetails(req, res) {
    const { slug } = req.params;
    const sql = `SELECT * from products WHERE products.slug = ?`
    conn.query(sql, [slug], (err, result) => {
        if (err) res.status(400).json({ error: "Product not found" })
        res.json(result)
    })
}

module.exports = { index, indexSearchOrder, checkout, productDetails };