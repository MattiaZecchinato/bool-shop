function index(req, res) {
    const sql = `SELECT * FROM products`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Errore nella query INDEX:', err);
            return res.status(500).json({ error: 'Errore interno al server' });
        }
        res.json(results)
    });
}

function indexSearchOrder(req, res) {
    const sql = `SELECT * FROM products p WHERE p.name LIKE ? ORDER BY ?`
    console.log('indexSearchOrder path');
    res.send('indexSearchOrder path');
}

function checkout(req, res) {
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
    //Inserisce l'ordine
    const orderQuery = `
    INSERT INTO orders (total_order, status, user_first_name, user_last_name, user_email, user_address, user_phone, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
    
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
    conn.query(orderQuery, orderValues, (err,result)=>{
        if(err) return res.status(500).json({error:"OOOOOOH NOOOOOO LA QUERY è SBAGLIATAAAA"})
        const orderId = result.insertId;
        //Inserisce i prodotti uno a uno
        let insertCount = 0;
        if(!products || products.length === 0){
            return res.status(400).json({error:"OOOOH NOOO NON C'è NESSUN PRODOTOOOOOO"})
        }
        products.forEach((p) => {
            const productQuery = `INSERT INTO product_order(product_id, order_id,quantity, tot_price) VALUES (?,?,?,?)`;
            conn.query(productQuery, [p.product_id,orderId,p.quantity,
            p.tot_price
            ], (err2) =>{
                if(err2) console.error("Errore prodotto ordine:", err2);
                insertCount++;
                if(insertCount === products.length){
                    res.status(201).json({message:"Ordine inserito", orderId})
                }
            })
            
        });
    })
}

function productDetails(req, res) {

    const { slug } = req.params;

    console.log(`productDetails path whit slug: ${slug}`);
    res.send(`productDetails path whit slug: ${slug}`);
}

module.exports = { index, indexSearchOrder, checkout, productDetails };