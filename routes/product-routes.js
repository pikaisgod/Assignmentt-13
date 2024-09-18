const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../models');

// Get all products
router.get('/', (req, res) => {
  Product.findAll({
    include: [{ model: Category }, { model: Tag }],
  })
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json(err));
});

// Get a single product by its `id`
router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Category }, { model: Tag }],
  })
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json(err));
});

// Create a new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(400).json(err));
});

// Update a product by its `id`
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(400).json(err));
});

// Delete a product by its `id`
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json({ message: 'Product deleted' }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
