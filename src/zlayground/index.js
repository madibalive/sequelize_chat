import Sequelize from 'sequelize';
import db from '../../src/database/models';
const bcrypt = require('bcrypt');

const _ = require('lodash');

const start = async () => {};

// //////////////////////////////////
// //////////////////////////////////
// //////////////////////////////////

// ////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

const playground = async () => {
  try {
    let paymentAmount = [10, 20, 40, 55, 76, 12, 45];

    let users = await db.User.bulkCreate([
      {
        firstName: 'Bienjee',
        lastName: 'Bieio',
        email: 'jean@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: false,
        role: 'super administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'devrepubli',
        lastName: 'devrpo',
        email: 'jdev@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: true,
        role: 'requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'devrepubli',
        lastName: 'devrpo',
        email: 'jeanne@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: true,
        role: 'requester',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    let count = 1;
    for (const user of users) {
      let balance = 0;
      let wallet = await user.createWallet({
        msisdn: '25471999726' + count,
        name: 'ACME Inc',
        balance: 60
      });

      let deposit = await wallet.createTopup({
        amount: 80,
        capturedAmount: 80,
        currency: 'UGX',
        type: 'transfer',
        chargeStatus: 'chargeStatus'
      });

      let credit = await wallet.createPayout({
        amount: '20',
        capturedAmount: '20',
        currency: 'UGX',
        type: 'transfer',
        chargeStatus: 'chargeStatus'
      });
      await deposit.createPaymentTransaction({
        amount: '20',
        currency: 'UGX'
      });

      await credit.createPaymentTransaction({
        amount: '20',
        currency: 'UGX'
      });
      count++;
    }

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
    console.log('Connection has been established successfully.');
    return playground();
  })
  .then(data => {
    console.log('update Complete');
  })
  .catch(err => {
    console.debug(err);
  });
