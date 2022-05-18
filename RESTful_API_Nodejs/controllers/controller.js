import todo_model from '../models/model-todo.js';
import user_model from '../models/model-auth.js';

const todoGET = (req, res) => {
    console.log("GETrequest");
    todo_model.allitem().then((result) => {
        res.send(result); //Θ肚
        console.log("GETresponse");
    }).catch((err) => { return res.send(err); }); //岿粇肚
};

const todoPOST = (req, res) => {
    const insertValues = req.body; //眔穝糤把计
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
    const insertValues = req.body; //眔穝糤把计
    console.log("registerPOST: ");
    console.log(insertValues);
    user_model.register(insertValues).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

export default {
    todoGET,
    todoPOST,
    userGET,
    registerPOST
};