const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uploadOnCloudinary= require("../utils/cloudinary")

const crypto = require('crypto');
// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// 🔐 Register (only superadmin can create other users)
exports.registerUser = async (req, res) => {
  try {

    const { name, email, password, role,lang = 'en', categoryInterest = [] } = req.body;
    console.log(email)
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      categoryInterest,
      preferredLanguage: lang
    });

    res.status(201).json({ message: 'User created successfully',newUser });

  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// 🔐 Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email ' });
    }

    const passMatched = await bcrypt.compare(password, user.password);

    if (!passMatched) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};



exports.logoutUser = (req, res) => {
  res.clearCookie('token'); // If using cookies
  res.status(200).json({ message: 'Logged out successfully' });
};

// 2. End-user requests role update
exports.requestRoleChange = async (req, res) => {
  const { requestedRole } = req.body;
  const validRoles = ['user', 'admin', 'support-agent'];

  if (!validRoles.includes(requestedRole)) {
    return res.status(400).json({ message: 'Invalid role requested' });
  }

  try {
    const user = await User.findById(req.user.id); // req.user set by auth middleware
    if (!user) return res.status(404).json({ message: 'User not found' });

    console.log(`${user.email} requested role change to ${requestedRole}`);

    res.status(200).json({ message: 'Role change request sent to admin' });
  } catch (err) {
    res.status(500).json({ message: 'Error requesting role change', error: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { newRole } = req.body;
  const validRoles = ['user', 'admin', 'support-agent'];

  if (!validRoles.includes(newRole)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = newRole;
    if (user.requestedRole) {
      delete user.requestedRole; // remove the request field
    }

    await user.save();

    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user role', error: err.message });
  }
};


exports.getAllRoleChangeRequests = async (req, res) => {
  try {
    const usersWithRequests = await User.find({ requestedRole: { $exists: true } }).select('-password');
    res.status(200).json(usersWithRequests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching role requests', error: err.message });
  }
};


// 4. Get logged-in user’s profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};

// 5. Admin gets all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

exports.requestRoleChange = async (req, res) => {
  const { requestedRole } = req.body;
  const validRoles = ['user', 'admin', 'support-agent'];

  if (!validRoles.includes(requestedRole)) {
    return res.status(400).json({ message: 'Invalid role requested' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.requestedRole === requestedRole) {
      return res.status(400).json({ message: 'Request already pending for this role' });
    }

    user.requestedRole = requestedRole;
    await user.save();

    res.status(200).json({ message: 'Role change request submitted to admin' });
  } catch (err) {
    res.status(500).json({ message: 'Error requesting role change', error: err.message });
  }
};


// 6. Get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

exports.updateImage = async (req, res) => {
  const profileImage = req.file.path;
  if (!profileImage) {
    throw new ApiError(400, " profileImage is not found")
  }
  const uploadedImage = await uploadOnCloudinary(profileImage)
  if (!uploadedImage.url) {
    throw new ApiError(500, " profileImage uploaded url missing")
  }

  const user = await User.findByIdAndUpdate(
    req.user?.id,
    {
      $set:
      {
        image: uploadedImage.url
      }
    },
    {
      new: true
    }).select("-password")
  user.save()
  res
    .status(200)
    .json( user, "avatar image update successfully")
}


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No user with this email' });

    // Generate a secure token
    const token = crypto.randomBytes(32).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15 mins
    await user.save();

    // In production, send token via email instead
    res.status(200).json({
      message: 'Reset token generated. Use this token to reset your password',
      token // For development/testing only — remove in production
    });

  } catch (err) {
    res.status(500).json({ message: 'Error generating reset token', error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};
