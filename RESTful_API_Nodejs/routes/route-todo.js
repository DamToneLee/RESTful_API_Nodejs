import express from 'express';
import controller from '../controllers/controller.js';

const router = express.Router();

router.route('/')
    .get(controller.todoGET)
    .post(controller.todoPOST);

export default router;