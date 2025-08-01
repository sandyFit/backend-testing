import { promises as fs } from 'fs';
import { logger } from '../logger';

const USERS_FILE = './data/users.json';

export async function getUsers(req, res) {
    try {
        const file = await fs.readFile(USERS_FILE, 'utf-8');
        const users = JSON.parse(file);

        res.status(200).json({
            message: 'List of users fetched successfully',
            data: users
        });
    } catch (error) {
        logger.error(err, 'Failed to read users');
        res.status(500).json({ message: 'Server error' });
    }
}

export async function createUser(req, res) {
    const { name, address, age } = req.body;
    try {
        const file = fs.readFile(USERS_FILE, 'utf-8');
        const users = JSON.parse(file);

        const newUser = { name, address, age };
        users.push(newUser);

        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

        logger.info({ user: newUser }, 'User saved to file');

        res.status(201).json({
            message: 'User saved'
        })

    } catch (error) {
        logger.error(err, 'Failed to save user');
        res.status(500).json({ message: 'Server error' });
    }
}

export async function updateUser(req, res) {
    const { userId } = req.params;
    if (!userId) {
        logger.warn('User id is required');
    }

    

}
