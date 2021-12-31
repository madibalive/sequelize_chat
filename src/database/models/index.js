import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import sequelizeJoi from '../../utils/sequelizejoi';
import { development, production, test } from '../config';

const environment = {
  development,
  production,
  test
};

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = environment[env];
const db = {};

const sequelize = new Sequelize('sqlite:memory', {});
// const sequelize = new Sequelize(config.url, config);
sequelizeJoi(sequelize);

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// run migration

export default db;
