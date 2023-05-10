import express from 'express';
import { Login, Register } from '../controllers/User.js';

const router = express.Router()

// User and Mail routes
router.post('/login', Login);              // For logging into the application 
router.post('/register', Register);        // For signing up for the application

export default router;