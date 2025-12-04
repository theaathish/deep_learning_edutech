import { Response } from 'express';
import { AuthRequest } from '../types';
import prisma from '../config/database';
import { sendSuccess, sendError } from '../utils/response';

export const getTeacherProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'User not authenticated', 401);
      return;
    }

    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            profileImage: true,
          },
        },
        courses: {
          include: {
            _count: {
              select: {
                enrollments: true,
              },
            },
          },
        },
        tutorStandSubscription: true,
      },
    });

    if (!teacher) {
      sendError(res, 'Teacher profile not found', 404);
      return;
    }

    sendSuccess(res, teacher, 'Teacher profile retrieved successfully');
  } catch (error) {
    console.error('Get teacher profile error:', error);
    sendError(res, 'Failed to retrieve teacher profile', 500);
  }
};

export const updateTeacherProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'User not authenticated', 401);
      return;
    }

    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id },
    });

    if (!teacher) {
      sendError(res, 'Teacher profile not found', 404);
      return;
    }

    const { bio, specialization, experience, education } = req.body;

    const updatedTeacher = await prisma.teacher.update({
      where: { id: teacher.id },
      data: {
        ...(bio && { bio }),
        ...(specialization && { specialization }),
        ...(experience && { experience: parseInt(experience) }),
        ...(education && { education }),
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    sendSuccess(res, updatedTeacher, 'Teacher profile updated successfully');
  } catch (error) {
    console.error('Update teacher profile error:', error);
    sendError(res, 'Failed to update teacher profile', 500);
  }
};

export const uploadVerificationDocument = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'User not authenticated', 401);
      return;
    }

    if (!req.file) {
      sendError(res, 'No file uploaded', 400);
      return;
    }

    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id },
    });

    if (!teacher) {
      sendError(res, 'Teacher profile not found', 404);
      return;
    }

    const documentUrl = `/uploads/${req.file.filename}`;

    const updatedTeacher = await prisma.teacher.update({
      where: { id: teacher.id },
      data: {
        verificationDocument: documentUrl,
        verificationStatus: 'PENDING',
      },
    });

    sendSuccess(res, updatedTeacher, 'Verification document uploaded successfully');
  } catch (error) {
    console.error('Upload verification document error:', error);
    sendError(res, 'Failed to upload verification document', 500);
  }
};

export const getMyCourses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'User not authenticated', 401);
      return;
    }

    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id },
    });

    if (!teacher) {
      sendError(res, 'Teacher profile not found', 404);
      return;
    }

    const courses = await prisma.course.findMany({
      where: { teacherId: teacher.id },
      include: {
        _count: {
          select: {
            enrollments: true,
            modules: true,
            reviews: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, courses, 'Courses retrieved successfully');
  } catch (error) {
    console.error('Get my courses error:', error);
    sendError(res, 'Failed to retrieve courses', 500);
  }
};

export const getEarnings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'User not authenticated', 401);
      return;
    }

    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id },
    });

    if (!teacher) {
      sendError(res, 'Teacher profile not found', 404);
      return;
    }

    const earnings = await prisma.earning.findMany({
      where: { teacherId: teacher.id },
      orderBy: { createdAt: 'desc' },
    });

    const totalEarnings = earnings.reduce((sum, earning) => sum + earning.amount, 0);

    sendSuccess(
      res,
      { earnings, totalEarnings },
      'Earnings retrieved successfully'
    );
  } catch (error) {
    console.error('Get earnings error:', error);
    sendError(res, 'Failed to retrieve earnings', 500);
  }
};
