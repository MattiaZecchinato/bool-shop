const express = require('express');
const cors = require('cors')
//routers
const routers = require('./routers/shopRouters');

//middlewares
const errorHandler = require('./middlewares/handlerError');
const notFound = require('./middlewares/notFound');

const app = express();

const { PORT, FE_PATH } = process.env;
app.use(cors({
    origin: FE_PATH

}))

const port = PORT || 4000;

//bodyparser
app.use(express.json());

//public folder
app.use(express.static('public'));

//index path
app.get('/', (req, res) => {

    res.send('Welcome to our web app');
});

//routers
app.use('/shop', routers);

//middlewares
//500
app.use(errorHandler);
//404
app.use(notFound);

//port
app.listen(port, () => {

    console.log(`Listen on port: ${PORT}`);
});
