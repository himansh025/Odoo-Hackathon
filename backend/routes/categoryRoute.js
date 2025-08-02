const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

// All routes protected (optional: add admin-only middleware if needed)
router.post('/categories', protect, createCategory);
router.get('/categoriesall',  getAllCategories);
router.get('/categories', protect, getAllCategories);
router.delete('/categories/:id', protect, deleteCategory);

module.exports = router;
