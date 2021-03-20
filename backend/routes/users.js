import express from 'express';
import { check } from 'express-validator';

import * as userController from '../controllers/users.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.post(
  '/signup',
  [
    check('name')
      .trim()
      .not()
      .isEmpty(),

    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Please enter a valid email.'),

    check('password')
      .trim()
      .isLength({ min: 6 })
      .isAlphanumeric()
  ],
  userController.postSignup
);

router.post(
  '/login',
  [
    check('email')
      .normalizeEmail()
      .isEmail(),

    check('password')
      .trim()
      .isAlphanumeric()
      .not()
      .isEmpty()
  ],
  userController.postLogin
);

router.use(checkAuth);

router.get(
  '/:userId',
  userController.getUserById
);

export default router;
