import db from '../database/models';
import Response from '../utils/ResponseHandler';
import { verifyToken } from '../utils/tokenHandler';

/**
 * @description protect route class
 * @class protectRoutes
 */
export default class protectRoutes {
  /** @description validate if user is signup
   * @static
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} next
   * @memberof protectRoutes
   */
  static async verifyUser(req, res, next) {
    try {
      const { token } = req.headers;

      if (!token) {
        return Response.errorResponse(res, 401, res.__('No token provided'));
      }
      const payload = verifyToken(token);
      const user = await db.User.findOne({
        where: {
          id: payload.id
        }
      });
      if (!user) {
        return Response.errorResponse(res, 401, res.__('you are not authorised for this operation'));
      }
      req.payload = payload;
      req.user = user;
      return next();
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        return Response.errorResponse(res, 400, res.__('token must be provided and valid'));
      }
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
   * @description check if wallet exists
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} user
   */
  static async checkRequestDetails(req, res, next) {
    const { walletId } = req.params;
    const { user } = req;
    const requestExist = await db.CustomerWallet.findOne({
      where: { id: walletId }
    });

    if (!requestExist) {
      return Response.errorResponse(res, 404, res.__('Request not found'));
    }
    const managerDetails = await db.User.findOne({
      where: { id: requestExist.managerId }
    });
    if (user.email !== requestExist.email && user.id !== requestExist.managerId) {
      return Response.success(res, 401, res.__('This request has been a created by another user and belongs to another manager'));
    }
    req.request = requestExist;
    req.managerDetails = managerDetails;
    next();
  }
}
