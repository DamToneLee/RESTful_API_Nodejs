import mysql from 'mysql';
import bcrypt from 'bcrypt';
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
                        const dbHashPassword = result[0].password; // 資料庫加密後的密碼
                        const userPassword = insertValues.password; // 使用者登入輸入的密碼
                        bcrypt.compare(userPassword, dbHashPassword).then((res) => { // 使用bcrypt做解密驗證
                            if (res) {
                                resolve('login success'); // 登入成功
                            } else {
                                resolve('password incorrect'); // 登入失敗
                            }
                        });
                    }
                    connection.release();
                })
            }
        });
    });
};

export default {
    users,
    register,
    login
};