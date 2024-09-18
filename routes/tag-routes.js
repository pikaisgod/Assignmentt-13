const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../models');

// Get all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{ model: Product, through: ProductTag }],
  })
    .then((tags) => res.json(tags))
    .catch((err) => res.status(500).json(err));
});

// Get a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Product, through: ProductTag }],
  })
    .then((tag) => res.json(tag))
    .catch((err) => res.status(500).json(err));
});

// Create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(400).json(err));
});

// Update a tag by its `id`
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(400).json(err));
});

// Delete a tag by its `id`
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json({ message: 'Tag deleted' }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
