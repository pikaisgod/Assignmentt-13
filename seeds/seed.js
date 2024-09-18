const sequelize = require('../config/connection');
const { Category, Product, Tag, ProductTag } = require('../models');

const categoryData = [
  { category_name: 'Electronics' },
  { category_name: 'Clothing' },
  { category_name: 'Books' },
];

const productData = [
  { product_name: 'Phone', price: 500, stock: 10, category_id: 1 },
  { product_name: 'Laptop', price: 1000, stock: 5, category_id: 1 },
  { product_name: 'Shirt', price: 20, stock: 30, category_id: 2 },
];

const tagData = [
  { tag_name: 'Sale' },
  { tag_name: 'New' },
];

const productTagData = [
  { product_id: 1, tag_id: 1 },
  { product_id: 2, tag_id: 2 },
  { product_id: 3, tag_id: 1 },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Category.bulkCreate(categoryData);
  await Product.bulkCreate(productData);
  await Tag.bulkCreate(tagData);
  await ProductTag.bulkCreate(productTagData);
  console.log('Database seeded successfully!');
  process.exit(0);
};

seedDatabase();
