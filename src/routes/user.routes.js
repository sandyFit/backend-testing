import express from "express";
import { logger } from "../logger";

const router = express.Router();


const users = [];
router.post('/users', (req, res) => {
    try {
        const { name, address, age } = req.body;

        users.push({ name, address, age });

        return res.status(201).json({
            message: 'User created successfully',
        })
    } catch (error) {
        logger.error(`Error creating a new user ${error}`)
    }

});

router.get('/users', (req, res) => {
    
})
