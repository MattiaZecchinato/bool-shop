function notFound(req, res, next) {

    res.status(404).json({

        status: '404',
        error: 'Not Found',
        message: 'Page not found'
    })
}
module.exports = notFound;