const BookModel = require('../models/bookModel');

//book creation api -

const createBooks = async function (req, res) {
    try {
        data = req.body;
        const { title, excerpt, userId, ISBN, category, subcategory, reviews, deletedAt, isDeleted, releasedAt} = data
        const book = await BookModel.create(data);
        const createdBook = {
            _id: book._id,
            title: book.title,
            excerpt: book.excerpt,
            userId: book.userId,
            ISBN: book.ISBN,
            category: book.category,
            subcategory: book.subcategory,
            isDeleted: book.isDeleted,
            reviews: book.reviews,
            releasedAt: book.releasedAt
        };

        return res.status(201).send({ status: true, message: "succesfully created", data: createdBook });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An error occurred while creating the book' });
    }
}

const getAllBooks = async function(req, res)  {
    try {
        const books = await BookModel.find({isDeleted:false}).select({title:1,excerpt:1,userId:1,category:1,reviews:1,releasedAt:1});
        return res.status(200).send({ status: true, message: "succesfully fetched all books", data: books });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An error occurred while fetching all books' });
    }
}

const getBookById = async function(req, res)  {
    try {
        const book = await BookModel.findOne({_id:req.params.bookId,isDeleted:false}).select({title:1,excerpt:1,userId:1,category:1,reviews:1,releasedAt:1});
        return res.status(200).send({ status: true, message: "success", data: book });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An error occurred while fetching book by id' });
    }
}

const updateBookById = async function(req, res)  {
    try {
        const book = await BookModel.findOneAndUpdate({_id:req.params.bookId,isDeleted:false},{$set:{reviews:req.body.reviews}},{new:true});
        return res.status(200).send({ status: true, message: "success", data: book });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An error occurred while updating book by id' });
    }
}

const deleteBookById = async function(req, res) {
    try {
        const book = await BookModel.findOneAndUpdate({_id:req.params.bookId,isDeleted:false},{$set:{isDeleted:true}},{new:true});
        return res.status(200).send({ status: true, message: "success", data: book });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An error occurred while deleting book by id' });
    }
}
module.exports = {createBooks,getAllBooks,getBookById,updateBookById,deleteBookById};
