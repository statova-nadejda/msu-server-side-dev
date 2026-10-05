const books = require('../models/bookModel');
const authors = require('../models/authorModel');

exports.getAllBooks = (req, res) => {
    const { genre, year } = req.query;

    let result = books;

    if (genre) {
        result = result.filter(
            book => book.genre.toLowerCase() === genre.toLowerCase()
        );
    }

    if (year) {
        result = result.filter(
            book => book.year === Number(year)
        );
    }

    res.json(result);
};

exports.getBookById = (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    res.json(book);
};

exports.createBook = (req, res) => {
    const { title, authorId, genre, year } = req.body;

    if (!title || !authorId || !genre || !year) {
        return res.status(400).json({
            error: 'title, authorId, genre and year are required'
        });
    }

    const authorExists = authors.find(
        author => author.id === Number(authorId)
    );

    if (!authorExists) {
        return res.status(400).json({
            error: 'Author not found'
        });
    }

    const newBook = {
        id: books.length > 0
            ? Math.max(...books.map(book => book.id)) + 1
            : 1,
        title,
        authorId: Number(authorId),
        genre,
        year: Number(year)
    };

    books.push(newBook);

    res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    const { title, authorId, genre, year } = req.body;

    if (authorId !== undefined) {
        const authorExists = authors.find(
            author => author.id === Number(authorId)
        );

        if (!authorExists) {
            return res.status(400).json({
                error: 'Author not found'
            });
        }

        book.authorId = Number(authorId);
    }

    if (title !== undefined) {
        book.title = title;
    }

    if (genre !== undefined) {
        book.genre = genre;
    }

    if (year !== undefined) {
        book.year = Number(year);
    }

    res.json(book);
};

exports.deleteBook = (req, res) => {
    const id = Number(req.params.id);

    const index = books.findIndex(
        book => book.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    const deletedBook = books.splice(index, 1);

    res.json(deletedBook[0]);
};

exports.searchBooks = (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.json([]);
    }

    const result = books.filter(book =>
        book.title
            .toLowerCase()
            .includes(title.toLowerCase())
    );

    res.json(result);
};