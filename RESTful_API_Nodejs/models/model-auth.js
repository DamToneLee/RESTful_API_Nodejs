import mysql from 'mysql';
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

export default {
    users,
    register
};