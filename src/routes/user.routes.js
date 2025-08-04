import express from "express";
import {getUsers, createUser, updateUser, deleteUser} from '../controllers/user.controller.js';

const router = express.Router();

// 👇 Fetch GET /users
router.get('/users', getUsers);

// 👇 Register POST /users route
router.post('/users', createUser);

// Update UPDATE /users/id
router.patch('/users/:userId', updateUser);

// Delete DELETE /users/id
router.delete('/users/:userId', deleteUser);

export default router;
