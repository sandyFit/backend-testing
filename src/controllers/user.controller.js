import { promises as fs } from 'fs';
import { logger } from '../logger.js';

const USERS_FILE = './src/data/users.json'; 

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
        });

    } catch (error) {
        logger.error(err, 'Failed to save user');
        res.status(500).json({ message: 'Server error' });
    }
}

export async function updateUser(req, res) {
    const { userId } = req.params;
    const { name, address, age } = req.body;

    if (!userId) {
        logger.warn('User ID is required');
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const file = await fs.readFile(USERS_FILE, 'utf-8');
        const users = JSON.parse(file);

        // Find the position (index) of the user in the users array
        // based on the userId provided in the request URL.
        const userIndex = users.findIndex((_, idx) => idx === Number(userId));
        if (userIndex === -1) {
            logger.warn(`User with Id ${userId} not found`);
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const updatedUser = {
            ...users[userIndex],
            ...(name && { name }),
            ...(address && { address }),
            ...(age && {age}),
        }

        users[userIndex] = updatedUser;

        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

        logger.info({ userId, updatedUser }, 'User updated');

        res.status(200).json({
            message: 'User updated',
            data: updatedUser
        })

    } catch (error) {
        logger.error(error, 'Failed to update user');
        res.status(500).json({ message: 'Server error' });
    }
}

export async function deleteUser(req, res) {
    const { userId } = req.params;
    if (!userId) {
        logger.warn('User ID is required');
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const file = await fs.readFile(USERS_FILE, 'utf-8');
        const users = JSON.parse(file);

        const userIndex = users.findIndex((_, idx) => idx === Number(userId));
        if (userIndex === -1) {
            logger.warn(`User with Id ${userId} not found`);
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Remove the user from the array and return it for logging and response
        const deletedUser = users.splice(userIndex, 1)[0];

        // Overwrite the file with the updated array
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

        logger.info({ deletedUser }, "User deleted successfuly");

        return res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser
        })
    } catch (error) {
        logger.error(error, "Failed to delete user");
        return res.status(500).json({
            message: "Server error"
        })
    }
}
