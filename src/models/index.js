const fs = require('node:fs');
const path = require('node:path');
const Sequelize = require('sequelize');
const sequelize = require('../database/config');

const db = {};

const modelFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js');

for (const file of modelFiles) {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
