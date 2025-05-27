const mongoose = require('mongoose');

// defines bookmarks Schema
const BookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    url: {
        type: String,
        required: true
    },
    title: String,
    favicon: String,
    summary: String,
    tags: [String],
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date, default:
            Date.now
    }
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);