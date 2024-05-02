import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/validator.js';
import {isAuth} from '../middleware/auth.js'

const router = express.Router();

const validateLogin = [
    body('username').trim().notEmpty().withMessage('username 입력'),
    body('password').trim().isLength({min:4}).withMessage('password는 최소 4자 이상 입력'), validate
]

const validateSignup = [
    ... validateLogin,
    body('name').trim().notEmpty().withMessage('name을 입력'),
    body('email').trim().isEmail().withMessage('이메일 형식 확인'),
    // body('url').isURL().withMessage('URL 형식 확인'),
    validate
]
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);
router.get('/me', isAuth, authController.me)
export default router;