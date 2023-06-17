const express = require('express');
const router = express.Router();

//user api
router.post('/register');
router.post('/login');

//book apis
router.post('/books');
router.get('/books');
router.get('/books/:bookId');
router.put('/books/:bookId');
router.delete('/books/:bookId');

//review apis
 router.post('/books/:bookId/review');
 router.put('/books/:bookId/review/:reviewId');
 router.delete('/books/:bookId/review/:reviewId');

module.exports = router;

