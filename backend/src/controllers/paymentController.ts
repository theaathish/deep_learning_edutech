import { Response } from 'express';
import { AuthRequest } from '../types';
import prisma from '../config/database';
import Stripe from 'stripe';
import { config } from '../config';
import { sendSuccess, sendError } from '../utils/response';

const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: '2024-11-20.acacia',
});

export const createPaymentIntent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'User not authenticated', 401);
      return;
    }

    const student = await prisma.student.findUnique({
      where: { userId: req.user.id },
    });

    if (!student) {
      sendError(res, 'Student profile not found', 404);
      return;
    }

    const { courseId, amount } = req.body;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      sendError(res, 'Course not found', 404);
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        studentId: student.id,
        courseId,
        purpose: 'course_enrollment',
      },
    });

    await prisma.payment.create({
      data: {
        studentId: student.id,
        amount,
        currency: 'usd',
        status: 'pending',
        stripePaymentId: paymentIntent.id,
        purpose: 'course_enrollment',
        metadata: { courseId },
      },
    });

    sendSuccess(res, { clientSecret: paymentIntent.client_secret }, 'Payment intent created');
  } catch (error) {
    console.error('Create payment intent error:', error);
    sendError(res, 'Failed to create payment intent', 500);
  }
};

export const confirmPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const payment = await prisma.payment.findUnique({
      where: { stripePaymentId: paymentIntentId },
    });

    if (!payment) {
      sendError(res, 'Payment not found', 404);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'succeeded' },
      });

      // Create enrollment if payment is for course
      if (payment.purpose === 'course_enrollment') {
        const courseId = (payment.metadata as any)?.courseId;
        if (courseId) {
          await prisma.enrollment.create({
            data: {
              studentId: payment.studentId,
              courseId,
            },
          });

          // Increment enrollment count
          await prisma.course.update({
            where: { id: courseId },
            data: { totalEnrollments: { increment: 1 } },
          });

          // Create earning for teacher
          const course = await prisma.course.findUnique({
            where: { id: courseId },
          });

          if (course) {
            await prisma.earning.create({
              data: {
                teacherId: course.teacherId,
                amount: payment.amount * 0.85, // 85% to teacher, 15% platform fee
                source: 'course_sale',
                description: `Enrollment in ${course.title}`,
              },
            });
          }
        }
      }

      sendSuccess(res, payment, 'Payment confirmed successfully');
    } else {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'failed' },
      });
      sendError(res, 'Payment failed', 400);
    }
  } catch (error) {
    console.error('Confirm payment error:', error);
    sendError(res, 'Failed to confirm payment', 500);
  }
};

export const createSubscription = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const { priceId } = req.body;

    // Create or retrieve Stripe customer
    const customer = await stripe.customers.create({
      email: req.user.email,
      metadata: {
        teacherId: teacher.id,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    await prisma.tutorStandSubscription.upsert({
      where: { teacherId: teacher.id },
      create: {
        teacherId: teacher.id,
        status: 'INACTIVE',
        amount: (subscription.items.data[0].price.unit_amount || 0) / 100,
        stripeSubscriptionId: subscription.id,
      },
      update: {
        stripeSubscriptionId: subscription.id,
      },
    });

    sendSuccess(
      res,
      {
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
      },
      'Subscription created'
    );
  } catch (error) {
    console.error('Create subscription error:', error);
    sendError(res, 'Failed to create subscription', 500);
  }
};

export const getPaymentHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'User not authenticated', 401);
      return;
    }

    const student = await prisma.student.findUnique({
      where: { userId: req.user.id },
    });

    if (!student) {
      sendError(res, 'Student profile not found', 404);
      return;
    }

    const payments = await prisma.payment.findMany({
      where: { studentId: student.id },
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, payments, 'Payment history retrieved successfully');
  } catch (error) {
    console.error('Get payment history error:', error);
    sendError(res, 'Failed to retrieve payment history', 500);
  }
};
