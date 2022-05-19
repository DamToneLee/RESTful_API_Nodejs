import express from 'express';
import controller from '../controllers/controller.js';

const router = express.Router();
const ensureToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' '); // 字串切割
        const bearerToken = bearer[1]; // 取得 JWT
        req.token = bearerToken; // 在response中建立一個token參數
        next(); // 結束 Middleware 進入 articleCtrl.articlePersonalGet
    } else {
        res.status(403).send(Object.assign({ code: 403 }, { message: '您尚未登入！' })); // Header 查無 Rearer Token
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