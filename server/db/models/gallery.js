const Sequelize = require('sequelize');
const db = require('../db');

const Gallery = db.define('gallery', {
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

module.exports = Gallery;
