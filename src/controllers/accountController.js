import dotenv from 'dotenv';
import db from '../database/models';
import { provideToken } from '../utils/tokenHandler';
import Response from '../utils/ResponseHandler';

// import Queue from '../utils/queue';
// import ConfirmationMail from '../jobs/ConfirmationMail';

dotenv.config();
const env = process.env.NODE_ENV || 'WalletTopup';

export default class AccountController {
  static async oAuthLogin(req, res) {
    let t;

    try {
      t = await db.sequelize.transaction();
      const profile = { ...req.user };
      const method = profile.provider;
      const { id } = profile;
      const firstName = profile.firstName;
      const lastName = profile.lastName;
      const email = profile.email;

      const oAuthId = req.user.id;
      const isVerified = true;
      const password = 'null';

      const condition = { email: email || null };
      const existingUser = await db.User.findOne({
        where: { condition } && { oAuthId }
      });
      const token = provideToken(id, isVerified);
      if (existingUser) {
        return Response.login(res, 200, 'User is successfully logged in', token);
      }
      let user = await db.User.create(
        {
          email,
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
          password,
          role: 'requester',
          signupMethod: method,
          oAuthId,
          isVerified: true
        },
        { t }
      );

      await t.commit();

      return Response.signupResponse(res, 200, 'User is successfully created', token);
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
      localStorage.setItem('token', token);

      const user = await Axios.get('http://localhost:3000/api/v1/users/view-profile', {
        headers: {
          token: payload.token
        }
      });
      req.payload = payload;
      req.user = user;
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
          email: 'jean@andela.com',
          password: 'Bien@BAR789'
        },
        {
          // headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }
      );
      if (!payload.data.access_token) throw new Error('OAUTH Error');
      localStorage.setItem('token', token);

      const user = await Axios.get('http://localhost:3000/api/v1/users/view-profile', {
        headers: {
          token: payload.token
        }
      });
      req.payload = payload;
      req.user = user;
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
