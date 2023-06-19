const express = require('express');
const router = express.Router();
const userContrlr = require('../controller/userController');
const BookContrl = require('../controller/bookController');
const ReviewCntrl = require('../controller/reviewController');
const Mid = require('../middlewares/authMiddleware');
const Validtn = require('../middlewares/validation');
//user api
router.post('/register', Validtn.userValidations,userContrlr.registerUser);
router.post('/login',userContrlr.login);

//book apis
router.post('/books', Mid.authenticationMid,BookContrl.createBooks);
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

