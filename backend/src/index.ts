import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import enrollmentRoutes from './routes/enrollmentRoutes';
import teacherRoutes from './routes/teacherRoutes';
import paymentRoutes from './routes/paymentRoutes';

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files for uploads
app.use('/uploads', express.static(config.upload.uploadPath));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/payments', paymentRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handler
app.use(errorHandler);

// Start server
const startServer = () => {
  app.listen(config.port, () => {
    console.log(`
╔═══════════════════════════════════════╗
║   EduTech Backend Server Started      ║
╠═══════════════════════════════════════╣
║   Port: ${config.port}                ║
║   Environment: ${config.nodeEnv}      ║
║   Time: ${new Date().toLocaleString()}
╚═══════════════════════════════════════╝
    `);
  });
};

startServer();

export default app;
