
const Comment = require('../models/commentModel');
const Ticket = require('../models/ticketModel');

// Create a comment for a ticket
const addComment = async (req, res) => {
  const { text } = req.body;
  const ticketId = req.params.ticketId;

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  const comment = await Comment.create({
    text,
    author: req.user._id,
    ticket: ticketId,
  });

  ticket.comments.push(comment._id);
  await ticket.save();

  const populatedComment = await Comment.findById(comment._id).populate('author', 'name email');

  res.status(201).json(populatedComment);
}

// Get all comments for a specific ticket
const getCommentsByTicketId = async (req, res) => {
  const { ticketId } = req.params;

  const comments = await Comment.find({ ticket: ticketId }).populate('author', 'name email');
  res.status(200).json(comments);
}

// Delete a comment (author or admin only)
const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  if (
    comment.author.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(403);
    throw new Error('You are not authorized to delete this comment');
  }

  await Comment.findByIdAndDelete(commentId);

  // Also remove from ticket.comments array
  await Ticket.findByIdAndUpdate(comment.ticket, {
    $pull: { comments: comment._id },
  });

  res.status(200).json({ message: 'Comment deleted successfully' });
}

module.exports = {
  addComment,
  getCommentsByTicketId,
  deleteComment,
};
