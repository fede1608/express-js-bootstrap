
exports.getAll = function (req, res, next) {
    req.models.book.all(function(err, books) {

        if (err) {
            res.status(503);
            res.send({ status: 503, error: err.detail });
        } else {
            res.status(200);
            res.send({ books: books });
        }
    });
};
