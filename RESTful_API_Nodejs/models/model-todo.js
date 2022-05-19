import mysql from 'mysql';
import jwt from 'jsonwebtoken';
import conf from '../conf.js';

const db = mysql.createPool(conf.db);

const allitem = () => {
    return new Promise((resolve, reject) => {
        db.getConnection((connectionError, connection) => { // DB�s�u
            if (connectionError) {
                reject(connectionError); // ���~�^��
                console.log("GET,connect refuse.");
            } else {
                connection.query('SELECT * FROM data', (error, result) => { // �qdata����X�Ҧ���
                    if (error) {
                        console.error('SQL error: ', error); // DB�g�J���~�^��
                        reject(error);
                    } else {
                        resolve(result); // �^��SELECT
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
                reject(err); // ���ҥ��Ѧ^�ǿ��~
            } else {
                /* ...������Ʈw�ӥΤ᪺�Ҧ��峹
                   ...
                   ...
                   ...
                */
                resolve(payload); // ���Ҧ��\�^�� payload data
            }
        });
    });
};

export default {
    allitem,
    additem,
    selectPersonalArticle
};