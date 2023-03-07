// HANDLE ERRORS
exports.errorHandler = (error, req, res, next) => {
    res.status(error.statusCode).json({
        status: 'fail',
        message: error.message
    })
}