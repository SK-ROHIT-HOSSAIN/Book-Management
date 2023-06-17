const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    userId: { ObjectId, required: true, ref: 'Users' },
    ISBN: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    reviews: { type: Number, default: 0, comment: { type: Number } },
    deletedAt: { type: Date ,default: null },
    isDeleted: { type: Boolean, default: false },
    releasedAt: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Books', bookSchema);