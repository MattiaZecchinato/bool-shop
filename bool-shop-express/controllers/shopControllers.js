function index(req, res) {

    console.log('index path');
    res.send('index path');
}

function indexSearchOrder(req, res) {

    console.log('indexSearchOrder path');
    res.send('indexSearchOrder path');
}

function checkout(req, res) {

    console.log('checkout path');
    res.send('checkout path');
}

function productDetails(req, res) {

    const { slug } = req.params;

    console.log(`productDetails path whit slug: ${slug}`);
    res.send(`productDetails path whit slug: ${slug}`);
}

module.exports = { index, indexSearchOrder, checkout, productDetails };