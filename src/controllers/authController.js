import uuid from 'uuid/v4';
import dotenv from 'dotenv';
import localStorage from 'localStorage';
import db from '../database/models';
import { provideToken } from '../utils/tokenHandler';
import Response from '../utils/ResponseHandler';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import initMock from '../tests/mock';

// import Queue from '../utils/queue';
// import ConfirmationMail from '../jobs/ConfirmationMail';

dotenv.config();
const env = process.env.NODE_ENV || 'WalletTopup';
initMock(Axios);

export default class AuthController {
  static async oAuthLogin(req, res) {
    let t;

    try {
      t = await db.sequelize.transaction();
      const oAuthId = req.user.id;
      const email = req.body.email;
      const firstName = req.user.first_name;
      const lastName = req.user.last_name;
      const password = req.user.access_token;
      let token;
      const existingUser = await db.User.findOne({
        where: { email: email }
        // where: { email: email, oauthid: oAuthId }
      });
      if (existingUser) {
        token = provideToken(existingUser.id, true);
        return Response.login(res, 200, 'User is successfully logged in', token);
      }
      let user = await db.User.create(
        {
          email,
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
          password,
          role: 'requester',
          oauthid: oAuthId,
          isVerified: true
        },
        { t }
      );
      await t.commit();
      token = provideToken(user.id, true);

      return Response.signupResponse(res, 200, 'User is successfully registered', token);
    } catch (error) {
      await t.rollback();
      return Response.errorResponse(res, 500, error.message);
    }
  }

  static async registerUser(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const payload = await Axios.post(
        'http://localhost:3000/api/v1/auth/register',
        {
          firstName: 'bienaime',
          lastName: 'jeanb',
          email: 'aime@andela.com',
          password: 'Aime12&*'
        },
        {
          // headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }
      );
      if (!payload.data.access_token) throw new Error('OAUTH Error');
      // localStorage.setItem('token', token);

      const { data } = await Axios.get('http://localhost:3000/api/v1/users/view-profile', {
        headers: {
          token: payload.data.access_token
        }
      });
      //
      data.id = email;
      data.email = email;
      data.password = password;
      //
      req.payload = payload;
      req.user = data.data;
      next();
    } catch (error) {
      return Response.errorResponse(res, 500, res.__(`${error.message}`));
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const payload = await Axios.post(
        'http://localhost:3000/api/v1/auth/login',
        {
          email,
          password
        },
        {
          // headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }
      );
      if (!payload.data.access_token) throw new Error('OAUTH Error');

      const { data } = await Axios.get('http://localhost:3000/api/v1/users/view-profile', {
        headers: {
          token: payload.data.access_token
        }
      });
      //
      data.id = email;
      data.email = email;
      data.password = password;
      //
      req.payload = payload;
      req.user = data.data;
      next();
    } catch (error) {
      return Response.errorResponse(res, 500, res.__(error.message));
    }
  }

  static async logout(req, res) {
    localStorage.removeItem('token');
    return Response.login(res, 200, res.__('User is successfully logged out'));
  }
}
