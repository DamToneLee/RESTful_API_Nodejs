import express from 'express';
import controller from '../controllers/controller.js';

const router = express.Router();
const ensureToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' '); // �r�����
        const bearerToken = bearer[1]; // ���o JWT
        req.token = bearerToken; // �bresponse���إߤ@��token�Ѽ�
        next(); // ���� Middleware �i�J articleCtrl.articlePersonalGet
    } else {
        res.status(403).send(Object.assign({ code: 403 }, { message: '�z�|���n�J�I' })); // Header �d�L Rearer Token
    }
};

router.route('/')
    .get(controller.todoGET)
    .post(controller.todoPOST);

router.route('/user')
    .get(controller.userGET)
    .post(controller.registerPOST);

router.route('/login')
    .post(controller.loginPOST);

router.get('/personal', ensureToken, controller.articlePersonalGet);

export default router;