import db from './database/models';
const bcrypt = require('bcrypt');

// HyperTrack will complete your trip automatically after 72 hours if your trip is still active

const playGround = async () => {};
const resetDB = async () => {
  try {
    let users = await db.User.bulkCreate([
      {
        firstName: 'Bienjee',
        lastName: 'Bieio',
        email: 'aime2@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: false,
        role: 'super administrator'
      },
      {
        firstName: 'Bienjee',
        lastName: 'Bieio',
        email: 'jean@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: false,
        role: 'super administrator'
      },
      {
        firstName: 'devrepubli',
        lastName: 'devrpo',
        email: 'jdev@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: true,
        role: 'requester'
      },
      {
        firstName: 'devrepubli',
        lastName: 'devrpo',
        email: 'jeanne@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: true,
        role: 'requester'
      }
    ]);
    console.log('object');
  } catch (error) {
    console.debug(error);
  }
};

db.sequelize
  .authenticate()
  .then(() => {
    return db.sequelize.sync({ force: true });
  })
  .then(() => {
    return resetDB();
  })
  // .then(data => {
  //   console.log('update Complete');
  //   return playGround();
  // })
  .then(data => {
    console.log('update Complete');
  })
  .catch(err => {
    console.debug(err);
  });
