import express, { Request, Response } from 'express';
import logger from './utils/logger';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

app.get('/api/data', (req: Request, res: Response) => {
  try {
    logger.debug('Processing /api/data request');

    const mockData = {
      message: 'Hello from the API!',
      data: [
        { id: 1, name: 'Item 1', description: 'First mock item' },
        { id: 2, name: 'Item 2', description: 'Second mock item' },
        { id: 3, name: 'Item 3', description: 'Third mock item' }
      ],
      timestamp: new Date().toISOString()
    };

    logger.info('Successfully processed /api/data request', {
      itemCount: mockData.data.length,
    });

    res.json(mockData);
  } catch (error) {
    logger.error('Error processing /api/data request', { error });
    throw error;
  }
});

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log('does this print')
  logger.info('Server started successfully', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
  });
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught exception', {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled rejection', { reason });
  process.exit(1);
});
