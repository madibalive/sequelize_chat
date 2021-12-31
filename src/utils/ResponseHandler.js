/**
 *
 *
 * @export
 * @class ResponceHandler
 */
export default class ResponceHandler {
  static signupResponse(res, status, message, token) {
    return res.status(status).json({ status, message, token });
  }

  static errorResponse(res, status, error) {
    return res.status(status).json({ status, error });
  }

  static login(res, status, message, token) {
    return res.status(status).json({
      status,
      message,
      data: token
    });
  }

  static success(...[res, status, message, data]) {
    return res.status(status).json({
      status,
      message,
      data
    });
  }
  static emitResponse(status, data, error = null, message = '') {
    return {
      status,
      message,
      data,
      error
    };
  }
}
