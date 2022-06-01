import bcrypt from 'bcrypt';
import todo_model from '../models/model-todo.js';
import user_model from '../models/model-auth.js';
import iptable_model from '../models/model-iptable.js';

const todoGET = (req, res) => {
    console.log("GETrequest");
    todo_model.allitem().then((result) => {
        res.send(result); //成功回傳
        console.log("GETresponse");
    }).catch((err) => { return res.send(err); }); //錯誤回傳
};

const todoPOST = (req, res) => {
    const insertValues = {
        id: req.body.id,
        name: req.body.name,
        value: req.body.value,
        token: req.token
    };
    console.log("POSTrequest: ");
    console.log(insertValues);
    todo_model.additem(insertValues).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

const userGET = (req, res) => {
    console.log("user GET request");
    user_model.users().then((result) => {
        res.send(result);
        console.log("user GET response");
    }).catch((err) => { return res.send(err); });
};

const registerPOST = (req, res) => {
    const insertValues = {
        id : req.body.id,
        user : req.body.user,
        password : bcrypt.hashSync(req.body.password, 10)
    };
    console.log("registerPOST: ");
    console.log(insertValues);
    user_model.register(insertValues).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

const loginPOST = (req, res) => {
    const insertValues = req.body;
    console.log('login POST request');
    user_model.login(insertValues).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

const userinfoGET = (req, res) => {
    user_model.userinfo(req.token).then((result) => {
        res.send(result); // 成功回傳result結果
    }).catch((err) => { return res.status(401).send(err); }); // 失敗回傳錯誤訊息
};

const natGET = (req, res) => {
    console.log("NATGETrequest");
    iptable_model.NATtable(req.token).then((result) => {
        res.send(result); //成功回傳
        console.log("NATGETresponse");
    }).catch((err) => { return res.send(err); }); //錯誤回傳
};

const natPOST = (req, res) => {
    const insertValues = {
        protocols : req.body.proto,
        port: req.body.port,
        destination: req.body.dst,
        dport: req.body.dport,
        token: req.token
    };
    console.log('nat POST request');
    iptable_model.addNATrules(insertValues).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

export default {
    todoGET,
    todoPOST,
    userGET,
    registerPOST,
    loginPOST,
    userinfoGET,
    natGET,
    natPOST
};