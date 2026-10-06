import books, { find, length, map, push, findIndex, splice, filter } from '../models/bookModel';
import { find as _find } from '../models/authorModel';

export function getAllBooks(req, res) {
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
}

export function getBookById(req, res) {
    const id = Number(req.params.id);

    const book = find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    res.json(book);
}

export function createBook(req, res) {
    const { title, authorId, genre, year } = req.body;

    if (!title || !authorId || !genre || !year) {
        return res.status(400).json({
            error: 'title, authorId, genre and year are required'
        });
    }

    const authorExists = _find(
        author => author.id === Number(authorId)
    );

    if (!authorExists) {
        return res.status(400).json({
            error: 'Author not found'
        });
    }

    const newBook = {
        id: length > 0
            ? Math.max(...map(book => book.id)) + 1
            : 1,
        title,
        authorId: Number(authorId),
        genre,
        year: Number(year)
    };

    push(newBook);

    res.status(201).json(newBook);
}

export function updateBook(req, res) {
    const id = Number(req.params.id);

    const book = find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    const { title, authorId, genre, year } = req.body;

    if (authorId !== undefined) {
        const authorExists = _find(
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
}

export function deleteBook(req, res) {
    const id = Number(req.params.id);

    const index = findIndex(
        book => book.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    const deletedBook = splice(index, 1);

    res.json(deletedBook[0]);
}

export function searchBooks(req, res) {
    const { title } = req.query;

    if (!title) {
        return res.json([]);
    }

    const result = filter(book =>
        book.title
            .toLowerCase()
            .includes(title.toLowerCase())
    );

    res.json(result);
}