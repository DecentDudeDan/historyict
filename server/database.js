'use strict';
var mysql = require('mysql');
const Chance = require('chance');

class Database {

    constructor() {
        this.connection;
        this.config = {
            host: '',
            user: '',
            password: '',
            database: ''
        };

        this.localConfig = {
            host: 'localhost',
            user: 'danlocal',
            password: 'fakepassword',
            database: 'Danny'

        }
        this.chance = new Chance();
    };

    connect() {
        this.connection = mysql.createConnection(this.localConfig);

        this.connection.connect(function(err) {
            if (err) {
                console.log('error when connecting to db:', err);
            }
        });
    }

    addUser(body, cb) {
        var name = body.Name;
        var id = body.Id;
        this.connection.query('insert into dantest set Name = ?, Id = ?', [name, id], (err, result) => {
            if (err) {
                console.log('error inserting into table', err.stack);
            }
            cb(err, result);
        });
    }

    deleteUser(body, cb) {
        var name = body.Name;
        var id = body.Id;
        this.connection.query('delete from dantest where Id = ' + id, (err, result) => {
            if (err) {
                console.log('error inserting into table', err.stack);
            }
            cb(err, result);
        });
    }

    updateUser(body, cb) {
        var name = body.Name;
        var id = body.Id;
        this.connection.query('update dantest set Name = ? where Id = ?', [name, id], (err, result) => {
            if (err) {
                console.log('error inserting into table', err.stack);
            }
            cb(err, result);
        });
    }

    getUsers(cb) {
        this.connection.query('select * from dantest', (err, result) => {
            if (err) {
                console.log(err.stack);
            }
            cb(err, result);
        });
    };

    stayAlive(cb) {
        this.connection.query('Select 1', (err, rows) => {
            if (err) {
                console.log('shit');
            }
            cb(err, rows);
        });
    }

    end() {
        this.connection.end((err) => {
            if (err) {
                console.log('error ending connection' + err.stack);
            }
        });
    };

};

module.exports = Database;