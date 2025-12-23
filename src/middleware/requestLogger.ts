import morgan from 'morgan';
import logger from '../utils/logger';

const isProduction = process.env.NODE_ENV === 'production';

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

const morganFormat = isProduction
  ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'
  : ':method :url :status :response-time ms - :res[content-length]';

export const requestLogger = morgan(morganFormat, { stream });
