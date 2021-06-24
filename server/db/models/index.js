const User = require('./user');
const Gallery = require('./gallery');

//associations go here
User.hasMany(Gallery);
Gallery.belongsTo(Gallery);

module.exports = { User, Gallery };
