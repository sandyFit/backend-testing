import express from 'express';
import pinoHttp from 'pino-http';
import { logger } from './logger.js';

const app = express();
const router = express.Router();

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

const users = [];

// 👇 Register POST /users route
router.post('/users', (req, res) => {
    const { name, address, age } = req.body;

    users.push({ name, address, age });
    logger.info({ users }, 'User saved');

    return res.status(201).send({
        message: 'ok',
    });
});


// Get the users list
router.get('/users', (req, res) => {
    return res.status(200).json({
        message: 'List of users fetched successfully',
        data: users
    });
});


// 👇 Mount the router after middleware
app.use('/', router);

export { app };
