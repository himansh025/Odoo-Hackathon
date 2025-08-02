const express = require('express');
const router = express.Router();
const {
  addComment,
  getCommentsByTicketId,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.post('/:ticketId', protect, addComment);
router.get('/:ticketId', protect, getCommentsByTicketId);
router.delete('/:commentId', protect, deleteComment);

module.exports = router;
