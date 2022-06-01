import mysql from 'mysql';
import jwt from 'jsonwebtoken';
import conf from '../conf.js';

const db = mysql.createPool(conf.db);

const allitem = () => {
    return new Promise((resolve, reject) => {
        db.getConnection((connectionError, connection) => { // DB連線
            if (connectionError) {
                reject(connectionError); // 錯誤回報
                console.log("GET,connect refuse.");
            } else {
                connection.query('SELECT * FROM data', (error, result) => { // 從data表取出所有值
                    if (error) {
                        console.error('SQL error: ', error); // DB寫入錯誤回報
                        reject(error);
                    } else {
                        resolve(result); // 回傳SELECT
                    }
                    connection.release();
                });
            }
        });
    });
};

const additem = (insertValues) => {
    return new Promise((resolve, reject) => {
        console.log("Token verfiy");
        jwt.verify(insertValues.token, 'lglg4141', (err, payload) => {
            if (err) {
                console.log("Token failed");
                reject(err);
            }
            else {
                console.log("Token success");
                db.getConnection((connectionError, connection) => {
                    if (connectionError) {
                        reject(connectionError);
                        console.log("POST,connect refuse.");
                    }
                    else {
                        const loaddata = {
                            id: insertValues.id,
                            name: insertValues.name,
                            value: insertValues.value
                        };
                        connection.query('INSERT INTO data SET ?', loaddata, (error, result) => {
                            if (error) {
                                console.error('SQL error: ', error);
                                reject(error);
                            }
                            else {
                                const res = 'data insert success. id: ' + loaddata.id + ', name: ' + loaddata.name + ', value: ' + loaddata.value;
                                resolve(res);
                            }
                            connection.release();
                        });
                    }
                });
            }
        });
    });
};

export default {
    allitem,
    additem,
};