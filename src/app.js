import express from 'express';
import pinoHttp from 'pino-http';
import { logger } from './logger.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// 👇 Parse JSON request bodies
app.use(express.json());

// 👇 Apply logger middleware
app.use(
    pinoHttp({
        logger,
        customLogLevel: (res, err) => {
            if (res.statusCode >= 500 || err) return 'error';
            if (res.statusCode >= 400) return 'warn';
            return 'info';
        },
        serializers: {
            req(req) {
                return {
                    method: req.method,
                    url: req.url,
                };
            },
        },
    })
);

// 👇 Mount the router after middleware
app.use('/api/v1', userRoutes);

export { app };
