const express = require('express');
const router = express.Router();

const {register, login} = require('../controllers/user');
const {createBookmarks, updateBookmarks, deleteBookmark , getBookmarks} = require('../controllers/bookmarks');
const {authMiddleware} = require('../middlewares/auth')

// Auth routes
router.post('/register', register);
router.post('/login', login);

// Bookmark routes
router.post('/bookmarks', authMiddleware, createBookmarks);
router.get('/bookmarks', authMiddleware, getBookmarks);
router.delete('/bookmarks/:id', authMiddleware, deleteBookmark);
router.put('/reorder', authMiddleware, updateBookmarks);

module.exports = router;
