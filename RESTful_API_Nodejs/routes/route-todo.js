import express from 'express';
import controller from '../controllers/controller.js';

const router = express.Router();

router.route('/')
    .get(controller.todoGET)
    .post(controller.todoPOST);

router.route('/user')
    .get(controller.userGET)
    .post(controller.registerPOST);

export default router;