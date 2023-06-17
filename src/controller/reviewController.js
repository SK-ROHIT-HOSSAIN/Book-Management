const ReviewModel = require('../models/reviewModel');
const BookModel = require('../models/bookModel');

const createReview  = async function (req, res) {
    try {
       const { review, rating, reviewedBy, reviewedAt } = req.body;
        const book = await BookModel.findById({_id:req.params.bookId, isDeleted:false});
        if(!book)
        return res.status(404).send({status: true,message:"no books with such id present"});
        const data = {
            bookId:book._id,
            review:review,
            rating:rating,
            reviewedBy:reviewedBy,
            reviewedAt:reviewedAt
        }
        const createReview = await ReviewModel.create(data);
        // review.book = book;
        res.status(201).send({status:true,message:"success",data:createReview});
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const updateReviewById = async function (req,res) {
    try{
        
       const { review, rating, reviewedBy, reviewedAt } = req.body;
       const book = await BookModel.findById({_id:req.params.bookId, isDeleted:false});
       if(!book)
       return res.status(404).send({status: true,message:"no books with such id present"});
       const data = {
           bookId:book._id,
           review:review,
           rating:rating,
           reviewedBy:reviewedBy,
           reviewedAt:reviewedAt
       }
       const updateReview = await ReviewModel.findByIdAndUpdate({_id:req.params.reviewId,data,isDeleted:false},{$set:{review:req.body.review , rating:req.body.rating,reviewdBy:req.body.reviewdBy,reviewedAt:req.body.reviewedAt}},{new:true});
       res.status(201).send({status:true,message:"success",data:updateReview});
    }catch(err){
        return res.status(500).send({ status: false, message: err.message });
    }
}

const deleteReview = async function (req, res) {
    try {
        const book = await BookModel.findById({_id:req.params.bookId, isDeleted:false});
        if(!book)
        return res.status(404).send({status: true,message:"no books with such id present"});

        const review = await ReviewModel.findById({_id:req.params.reviewId, isDeleted:false});
        if(!review)
        return res.status(404).send({status: true,message:"no review with such id present"});

        const deleteReview = await ReviewModel.findByIdAndUpdate({_id:req.params.reviewId},{$set:{isDeleted:true}},{new:true});

        res.status(201).send({status:true,message:"success",data:deleteReview});
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = {createReview,updateReviewById,deleteReview};