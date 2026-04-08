import express from 'express'
import { adminLogin, loginUser, registerUser } from '../controllers/user.controller.js';

const user = express.Router();

user.post('/register', registerUser)
user.post('/login', loginUser)
user.post('/admin', adminLogin)

export default user;