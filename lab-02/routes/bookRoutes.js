import { Router } from 'express';
const router = Router();

import { searchBooks, getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController';

router.get('/search', searchBooks);

router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.post('/', createBook);

router.patch('/:id', updateBook);

router.delete('/:id', deleteBook);

export default router;