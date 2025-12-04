import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';
import {
  createPaymentIntent,
  confirmPayment,
  createSubscription,
  getPaymentHistory,
} from '../controllers/paymentController';

const router = Router();

router.post(
  '/create-payment-intent',
  authenticate,
  authorize('STUDENT'),
  [
    body('courseId').notEmpty().withMessage('Course ID is required'),
    body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
    validate,
  ],
  createPaymentIntent
);

router.post(
  '/confirm-payment',
  [body('paymentIntentId').notEmpty().withMessage('Payment intent ID is required'), validate],
  confirmPayment
);

router.post(
  '/create-subscription',
  authenticate,
  authorize('TEACHER'),
  [body('priceId').notEmpty().withMessage('Price ID is required'), validate],
  createSubscription
);

router.get('/history', authenticate, authorize('STUDENT'), getPaymentHistory);

export default router;
