// src/routes/authRoutes.ts
import { Router } from 'express';
import { registerUser, findUser } from '../controllers/authController';

const router = Router();

// router.post('/register', registerUser);
router.get('/user/:id', findUser);

export default router;