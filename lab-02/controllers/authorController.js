const authors = require('../models/authorModel');
const books = require('../models/bookModel');

exports.getAllAuthors = (req, res) => {
    res.json(authors);
};

exports.getAuthorById = (req, res) => {
    const id = Number(req.params.id);

    const author = authors.find(
        author => author.id === id
    );

    if (!author) {
        return res.status(404).json({
            error: 'Author not found'
        });
    }

    res.json(author);
};

exports.getAuthorBooks = (req, res) => {
    const id = Number(req.params.id);

    const author = authors.find(
        author => author.id === id
    );

    if (!author) {
        return res.status(404).json({
            error: 'Author not found'
        });
    }

    const authorBooks = books.filter(
        book => book.authorId === id
    );

    res.json(authorBooks);
};