'use strict';
var mysql = require('mysql');
const Chance = require('chance');

class Database {

    constructor() {

        var userPassword = 'theonlystud';
        this.chance = new Chance();

        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'dan',
            password: userPassword,
            database: 'Danny'
        });

        this.connection.connect(function(err) {
            if (err) {
                console.log('error connecting to server ' + err.stack);
            }
        });
    };


    addRow(cb) {
        this.connection.query('insert into test set name = ?, rank = 1', ['danny' + this.chance.natural()], (err) => {
            if (err) {
                console.log('error inserting into table', err.stack);
            }
            cb(err, rows);
        });
    }

    getNames(cb) {
        this.connection.query('select * from test', (err, rows) => {
            if (err) {
                console.log(err.stack);
            }
            cb(err, rows);
        });
    };

    end() {
        this.connection.end((err) => {
            if (err) {
                console.log('error ending connection' + err.stack);
            }
        });
    };

    processResponse(rows) {
        var objToJson = rows;
        var response = [];
        for (let key in rows) {
            response.push(rows[key]);
        }
        objToJson.response = response;
        var finalRes = JSON.stringify(objToJson);
        return finalRes;
    }

};

module.exports = Database;