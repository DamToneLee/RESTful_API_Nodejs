import mysql from 'mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import conf from '../conf.js';


const db = mysql.createPool(conf.db);

const users = () => {
    return new Promise((resolve, reject) => {
        db.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
                console.log("GET,connect refuse.");
            } else {
                connection.query('SELECT * FROM user', (error, result) => {
                    if (error) {
                        console.error('SQL error: ', error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                    connection.release();
                });
            }
        });
    });
};

const register = (insertValues) => {
    return new Promise((resolve, reject) => {
        db.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
                console.log("POST,connect refuse.");
            } else {
                connection.query('INSERT INTO user SET ?', insertValues, (error, result) => {
                    if (error) {
                        console.error('SQL error: ', error);
                        reject(error);
                    } else if (result.affectedRows === 1) {
                        resolve(`insert success, ID: ${result.insertId}`);
                    }
                    connection.release();
                });
            }
        });
    });
};

const login = (insertValues) => {
    return new Promise((resolve, reject) => {
        db.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
                console.log("LOGIN, connect refuse");
            }
            else {
                connection.query('SELECT * FROM user WHERE user = ?', insertValues.user, (error, result) => {
                    if (error) {
                        console.error('SQL error: ', error);
                        reject(error);
                    }
                    else if (Object.keys(result).length === 0) {
                        resolve('invaild user.');
                    }
                    else {
                        const dbHashPassword = result[0].password; // ��Ʈw�[�K�᪺�K�X
                        const userPassword = insertValues.password; // �ϥΪ̵n�J��J���K�X
                        bcrypt.compare(userPassword, dbHashPassword).then((res) => { // �ϥ�bcrypt���ѱK����
                            if (res) {
                                const payload = {
                                    id: result[0].id,
                                    user: result[0].user,
                                };
                                const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (60 * 15) }, 'lglg4141');
                                resolve(Object.assign({ code: 200 }, { message: 'login success', token }));
                            } else {
                                resolve('password incorrect'); // �n�J����
                            }
                        });
                    }
                    connection.release();
                })
            }
        });
    });
};

const userinfo = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'lglg4141', (err, payload) => {
            if (err) {
                reject(err);
            } else {
                resolve(payload);
            }
        });
    });
};

export default {
    users,
    register,
    login,
    userinfo
};