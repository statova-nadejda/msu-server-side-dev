import { Router } from 'express';
const router = Router();

import { getAllAuthors, getAuthorBooks, getAuthorById } from '../controllers/authorController';

router.get('/', getAllAuthors);

router.get('/:id/books', getAuthorBooks);

router.get('/:id', getAuthorById);

export default router;