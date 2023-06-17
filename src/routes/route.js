const express = require('express');
const router = express.Router();
const userContrlr = require('../controller/userController');
const BookContrl = require('../controller/bookController');
const ReviewCntrl = require('../controller/reviewController');
//user api
router.post('/register', userContrlr.registerUser);
router.post('/login',userContrlr.login);

//book apis
router.post('/books',BookContrl.createBooks);
router.get('/books',BookContrl.getAllBooks);
router.get('/books/:bookId',BookContrl.getBookById);
router.put('/books/:bookId',BookContrl.updateBookById);
router.delete('/books/:bookId',BookContrl.deleteBookById);

//review apis
 router.post('/books/:bookId/review',ReviewCntrl.createReview);
 router.put('/books/:bookId/review/:reviewId',ReviewCntrl.updateReviewById);
 router.delete('/books/:bookId/review/:reviewId',
 ReviewCntrl.deleteReview);

module.exports = router;

