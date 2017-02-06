'use strict';
var mysql = require('mysql');
const Chance = require('chance');

class Database {

    constructor() {
        this.connection;

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

    addMarker(body, cb) {
        this.connection.query('insert into Markers set ?', body, (err, result) => {
            if (err) {
                console.log('error inserting into table', err.stack);
            }
            cb(err, result);
        });

    }

    deleteMarker(body, cb) {
        var id = body.Id;
        this.connection.query('update Markers set deleted = ? where id = ?' + [true, id], (err, result) => {
            if (err) {
                console.log('error inserting into table', err.stack);
            }
            cb(err, result);
        });
    }

    updateMarker(body, cb) {
        var name = body.Name;
        var id = body.Id;
        this.connection.query('update Markers set name = ? where id = ?', [name, id], (err, result) => {
            if (err) {
                console.log('error inserting into table', err.stack);
            }
            cb(err, result);
        });
    }

    getMarkers(cb) {
        var table = table;
        this.connection.query('select * from Markers', (err, result) => {
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