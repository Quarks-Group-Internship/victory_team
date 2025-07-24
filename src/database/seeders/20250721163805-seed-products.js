'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('products', [
      {
        id: uuidv4(),
        name: 'Wireless Mouse',
        description: 'A high-precision wireless mouse with ergonomic design.',
        price: 29.99,
        quantity: 50,
        imageUrl: 'https://example.com/images/mouse.jpg',
        isAvailable: true,
        category: 'Accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Gaming Keyboard',
        description: 'Mechanical RGB keyboard for gaming enthusiasts.',
        price: 79.99,
        quantity: 30,
        imageUrl: 'https://example.com/images/keyboard.jpg',
        isAvailable: true,
        category: 'Electronics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Noise-Cancelling Headphones',
        description: 'Over-ear headphones with active noise cancellation.',
        price: 199.99,
        quantity: 20,
        imageUrl: 'https://example.com/images/headphones.jpg',
        isAvailable: true,
        category: 'Audio',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
