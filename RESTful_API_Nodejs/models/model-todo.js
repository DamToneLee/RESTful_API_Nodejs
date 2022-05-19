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
        db.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
                console.log("POST,connect refuse.");
            } else {
                connection.query('INSERT INTO data SET ?', insertValues, (error, result) => {
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

const selectPersonalArticle = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'lglg4141', (err, payload) => {
            if (err) {
                reject(err); // 驗證失敗回傳錯誤
            } else {
                /* ...撈取資料庫該用戶的所有文章
                   ...
                   ...
                   ...
                */
                resolve(payload); // 驗證成功回傳 payload data
            }
        });
    });
};

export default {
    allitem,
    additem,
    selectPersonalArticle
};