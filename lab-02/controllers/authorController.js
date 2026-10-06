import authors, { find } from '../models/authorModel';
import { filter } from '../models/bookModel';

export function getAllAuthors(req, res) {
    res.json(authors);
}

export function getAuthorById(req, res) {
    const id = Number(req.params.id);

    const author = find(
        author => author.id === id
    );

    if (!author) {
        return res.status(404).json({
            error: 'Author not found'
        });
    }

    res.json(author);
}

export function getAuthorBooks(req, res) {
    const id = Number(req.params.id);

    const author = find(
        author => author.id === id
    );

    if (!author) {
        return res.status(404).json({
            error: 'Author not found'
        });
    }

    const authorBooks = filter(
        book => book.authorId === id
    );

    res.json(authorBooks);
}