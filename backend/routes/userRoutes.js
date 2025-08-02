const express = require('express');
const router = express.Router();
const {
  logoutUser,
  requestRoleChange,
  updateUserRole,
  getUserProfile,
  getAllUsers,
  getUserById,
  getAllRoleChangeRequests,
  updateImage,
  resetPassword,
  forgotPassword
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Authenticated routes
router.post('/logout', protect, logoutUser);
router.post('/request-role', protect, requestRoleChange);
router.get('/profile', protect, getUserProfile);
router.put('/profileImage', protect, updateImage);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Admin-only routes
router.get('/admin/users', protect, getAllUsers);
router.get('/admin/user/:id', protect, getUserById);
router.put('/admin/update-role/:id', protect, updateUserRole);
router.get('/admin/user/allReq', protect, getAllRoleChangeRequests);
module.exports = router;
