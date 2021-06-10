const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');

const User = db.define('sample', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
  get() {
    return () => this.getDataValue('salt')
  },
  googleId: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  }
}
});

module.exports = User;

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
}

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
}

User.encryptPassword = function(plainText, salt) {
  return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex');
}

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})