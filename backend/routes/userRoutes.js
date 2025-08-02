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
  sendOtpForPasswordReset,
  verifyOtpAndResetPassword,
  loginUser,
  registerUser
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const {upload}= require("../middleware/multer")
// Authenticated routes
router.post('/register',  registerUser);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router.post('/request-role', protect, requestRoleChange);
router.get('/profile', protect, getUserProfile);
router.put('/profileImage', protect, upload.single("image"), updateImage);
router.post('/forgot-password', sendOtpForPasswordReset);
router.post('/reset-password', verifyOtpAndResetPassword);

// Admin-only routes
router.get('/admin/users', protect, getAllUsers);
router.get('/admin/user/:id', protect, getUserById);
router.put('/admin/update-role/:id', protect, updateUserRole);
router.get('/admin/user/allReq', protect, getAllRoleChangeRequests);
module.exports = router;
