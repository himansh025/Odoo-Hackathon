
const Ticket = require('../models/ticketModel');
const Comment = require('../models/commentModel');
// const User = require('../models/userModel');
const  sendStatusUpdateEmail= require('../utils/sendEmail');
const {uploadOnCloudinary} = require("../utils/cloudinary")
// POST /tickets
exports.createTicket = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    console.log("FILE:", req.file);

    const { subject, description, category } = req.body;

    const createdBy = req.user?._id;

    // Log fields being passed to the DB
    console.log("Creating ticket with:");
    console.log({ subject, description, category, createdBy });

    if (!subject || !description || !category || !createdBy) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    let attachmentUrl = null;
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (result?.url) attachmentUrl = result.url;
    }

    await new Ticket({
       subject,
      description,
      category,
      createdBy,
      attachment: attachmentUrl,
    })
    const newTicket = await Ticket.create({
      subject,
      description,
      category,
      createdBy,
      attachment: attachmentUrl,
    });

    return res.status(201).json({ message: "Ticket created", ticket: newTicket });

  } catch (err) {
    console.error("❌ Ticket creation error:", err);
    res.status(500).json({
      error: "Failed to create ticket",
      message: err.message,
    });
  }
};




// GET /tickets (filtered for current user)
exports.getTickets = async (req, res) => {
  try {
    console.log(req.user)
    const query = {
      ...(req.user.role === 'user' ? { createdBy: req.user._id } : {}),
      ...(req.query.status && { status: req.query.status }),
      ...(req.query.category && { category: req.query.category })
    };

    const tickets = await Ticket.find(query)
      .sort(req.query.sortBy === 'recent' ? { updatedAt: -1 } : { replyCount: -1 })
      .populate('createdBy', 'name')
      .populate('category', 'name');

    res.json(tickets,"successfully ticket created  ");
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

// GET /tickets/:id
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'name role' },
      });

    if (!ticket || (req.user.role === 'end_user' && ticket.createdBy._id.toString() !== req.user._id.toString())) {
      return res.status(403).json({ error: 'Unauthorized or ticket not found' });
    }

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
};

// PUT /tickets/:id/status
exports.updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (req.user.role !== 'agent' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    ticket.status = req.body.status;
    await ticket.save();

    let status= ticket.status
    await sendStatusUpdateEmail({email,subject:`Welcome ${fullname}! Verify Your Account`,status}) 



    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update ticket status' });
  }
};

// POST /tickets/:id/comments
exports.addTicketComment = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (req.user.role === 'end_user' && ticket.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const comment = await Comment.create({
      ticket: ticket._id,
      author: req.user._id,
      content: req.body.content
    });

    ticket.comments.push(comment._id);
    ticket.replyCount = (ticket.replyCount || 0) + 1;
    ticket.updatedAt = Date.now();
    await ticket.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};
