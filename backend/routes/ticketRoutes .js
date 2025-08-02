const express = require('express');
const router = express.Router();
const {
createTicket,getTicketById,getTickets,updateTicketStatus,addTicketComment
} = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const {upload}= require("../middleware/multer")

// Authenticated routes
router.post('/tickets', protect
    ,upload.single("attachment")
    , createTicket);
router.get('/tickets'
    , protect
    , getTickets);
router.get('/tickets/:id', protect, getTicketById);
router.put('/tickets/:id/status', protect, updateTicketStatus);
router.post('/tickets/:id/comments', protect, addTicketComment);


module.exports = router;
