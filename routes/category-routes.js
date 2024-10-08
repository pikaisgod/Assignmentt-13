const router = require('express').Router();
const { Category, Product } = require('../models');

// Get all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});

// Get a single category by its `id`
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Product }],
  })
    .then((category) => res.json(category))
    .catch((err) => res.status(500).json(err));
});

// Create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

// Update a category by its `id`
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

// Delete a category by its `id`
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json({ message: 'Category deleted' }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
