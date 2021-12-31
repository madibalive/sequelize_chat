import express from 'express';
import AuthController from '../controllers/authController';
import validationResult from '../validation/validationResult';
// import verificationController from '../controllers/verificationController';
import validateParams from '../validation/validateParams';
import { signupInputRules, resetPasswordRules, forgotPasswordRules, loginInputRules } from '../validation/validationRules';

const authRouter = express.Router();

authRouter.post('/register', signupInputRules, validationResult, AuthController.registerUser, AuthController.oAuthLogin);
authRouter.post('/login', loginInputRules, validationResult, AuthController.login, AuthController.oAuthLogin);
authRouter.get('/logout', AuthController.logout);

// authRouter.get('/verification', validateParams.validateToken, verificationController.verifyAccount);
// authRouter.put('/password/forgot', forgotPasswordRules, validationResult, AuthController.forgotPassword);
// authRouter.put('/password/reset', protectRoute.verifyUser, resetPasswordRules, validationResult, AuthController.resetPassword);

export default authRouter;
