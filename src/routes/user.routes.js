import express from "express";
import {getUsers, createUser, u} from '../controllers/user.controller.js';

const router = express.Router();

// 👇 Register POST /users route
router.post('/users', getUsers);

// 👇 Fetch GET /users 
router.get('/users', createUser);

// Fetch GET /users/id
router.get('/users', )

export default router;
