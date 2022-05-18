import mysql from 'mysql';
import conf from '../conf.js';

//const connection = mysql.createConnection(conf.db);
const db = mysql.createPool(conf.db);

/*module.exports = {
    allitem: function (req, callback) {
        sql = '';
        return connection.query(sql, callback);
    },
    add: function (req, callback) {
        sql = mysql.format('');
        return connection.query(sql, callback);
    }
};*/

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

export default {
    allitem,
    additem
};