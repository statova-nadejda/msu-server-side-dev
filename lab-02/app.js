const express = require('express');

const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');

const logger = require('./middleware/logger');

const app = express();

app.use(logger);

app.use(express.json());

app.use('/api/books', bookRoutes);

app.use('/api/authors', authorRoutes);

app.get('/api/statistics', (req, res) => {
    const books = require('./models/bookModel');
    const authors = require('./models/authorModel');

    const genres = new Set(
        books.map(book => book.genre)
    );

    const newestBook = books.reduce(
        (newest, book) =>
            book.year > newest.year ? book : newest
    );

    const oldestBook = books.reduce(
        (oldest, book) =>
            book.year < oldest.year ? book : oldest
    );

    res.json({
        booksCount: books.length,
        authorsCount: authors.length,
        genresCount: genres.size,
        newestBook,
        oldestBook
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
});

app.listen(3000, () => {
    console.log(
        'Server started on http://localhost:3000'
    );
});