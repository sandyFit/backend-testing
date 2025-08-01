import dotenv from 'dotenv';
import { app } from './app.js';
import { logger } from './logger.js';

dotenv.config();

const port = process.env.PORT || 3000;
const env = process.env.ENVIRONMENT;

app.listen(port, () => {
    logger.info(`Server running on port ${port} in ${env} mode`);
});

