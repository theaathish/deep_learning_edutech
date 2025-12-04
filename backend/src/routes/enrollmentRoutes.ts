import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';
import {
  enrollCourse,
  getMyEnrollments,
  updateProgress,
} from '../controllers/enrollmentController';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('STUDENT'),
  [body('courseId').notEmpty().withMessage('Course ID is required'), validate],
  enrollCourse
);

router.get('/my-enrollments', authenticate, authorize('STUDENT'), getMyEnrollments);

router.post(
  '/progress',
  authenticate,
  authorize('STUDENT'),
  [
    body('courseId').notEmpty().withMessage('Course ID is required'),
    body('completedLessonId').notEmpty().withMessage('Lesson ID is required'),
    validate,
  ],
  updateProgress
);

export default router;
