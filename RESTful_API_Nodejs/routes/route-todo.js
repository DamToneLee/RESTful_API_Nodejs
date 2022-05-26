import express from 'express';
import controller from '../controllers/controller.js';

const router = express.Router();
const hasToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).send(Object.assign({ code: 403 }, { message: 'you havent login.' }));
    }
};

router.route('/')
    .get(controller.todoGET)
    .post(hasToken, controller.todoPOST);

router.route('/user')
    .get(controller.userGET)
    .post(controller.registerPOST);

router.route('/login')
    .post(controller.loginPOST);

router.route('/nat')
    .get(controller.natGET)
    .post(controller.natPOST);

router.get('/userinfo', hasToken, controller.userinfoGET);

export default router;