import { check, query } from 'express-validator';

export const signupInputRules = [
  check('firstName')
    .exists()
    .withMessage('The firstname is required')
    .isAlpha()
    .withMessage('First name should be only characters')
    .isLength({ min: 4 })
    .withMessage('Firstname must be atleast 4 characters'),
  check('lastName')
    .trim()
    .exists()
    .withMessage('The lastname is required')
    .isAlpha()
    .withMessage('Last name should be only characters')
    .isLength({ min: 4 })
    .withMessage('Lastname must be atleast 4 characters'),
  check('email').trim().exists().withMessage('The email is required').isEmail().withMessage('The email field must contain a valid email address'),
  check('password')
    .exists()
    .matches(/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}/)
    .withMessage('At least 8 characters include symbols, uppercase, lowercase and number'),
  check('msisdn')
    .exists()
    // .matches(/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}/)
    .withMessage('At least 8 characters include symbols, uppercase, lowercase and number')
];

export const loginInputRules = [
  check('email').trim().exists().withMessage('The email is required').isEmail().withMessage('The email field must contain a valid email address'),
  check('password')
    .exists()
    .matches(/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}/)
    .withMessage('At least 8 characters include symbols, uppercase, lowercase and number')
];

export const checkoutRules = [
  check('reference').notEmpty().trim().withMessage('Gender must either be Male or Female'),
  check('amount').exists().trim().withMessage('Gender must either be Male or Female'),
  check('currency').isIn(['GH']).withMessage('Only USD, EUR or RWF currencies are allowed'),
  check('confirm_callback_url').exists().trim().withMessage('Please choose correct department'),
  check('confirm_callback_url').exists().trim().withMessage('Please choose correct department'),
  check('reject_callback_url').exists().trim().withMessage('Please choose correct department')
];


export const editProfileValidationRules = [
  check('gender').isIn(['Male', 'Female']).withMessage('Gender must either be Male or Female'),
  check('currency').isIn(['USD', 'EUR', 'RWF']).withMessage('Only USD, EUR or RWF currencies are allowed'),
  check('department').isIn(['IT', 'Finance', 'communication']).withMessage('Please choose correct department'),
  check('language').isIn(['English', 'French']),
  check('birthdate')
    .matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/)
    .withMessage('enter vaid date')
];

export const resetPasswordRules = [
  check('password')
    .exists()
    .matches(/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}/)
    .withMessage('At least 8 characters include symbols, uppercase, lowercase and number')
];
export const forgotPasswordRules = [
  check('email')
    .trim()
    .exists()
    .withMessage('The email field must contain a valid email address')
    .isEmail()
    .withMessage('The email field must contain a valid email address')
];
