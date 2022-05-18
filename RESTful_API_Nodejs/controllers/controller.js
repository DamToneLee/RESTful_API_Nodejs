import todo_model from '../models/model-todo.js';

const todoGET = (req, res) => {
    console.log("GETrequest");
    todo_model.allitem().then((result) => {
        res.send(result); //���\�^��
        console.log("GETresponse");
    }).catch((err) => { return res.send(err); }); //���~�^��
};

const todoPOST = (req, res) => {
    const insertValues = req.body; //���o�s�W�Ѽ�
    console.log("POSTrequest: ");
    console.log(insertValues);
    todo_model.additem(insertValues).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

export default {
    todoGET,
    todoPOST
};