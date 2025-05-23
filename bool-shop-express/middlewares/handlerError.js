function errorHandler(err, req, res, next) {

    res.status(500).json({

        status: '500',
        error: err.message,
    })
}
module.exports = errorHandler;