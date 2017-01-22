'use strict';
var mysql = require('mysql');
const Chance = require('chance');

class Database {

    constructor() {
        this.connection;
        this.config = {
            host: 'us-cdbr-iron-east-04.cleardb.net',
            user: 'bafccab7834260',
            password: 'dc364a45',
            database: 'heroku_21be83ada68dab8'
        };
        this.chance = new Chance();
    };

    connect() {
        this.connection = mysql.createConnection(this.config);

        this.connection.connect(function(err) {
            if (err) {
                console.log('error when connecting to db:', err);
            }
        });
    }

    addRow(body, cb) {
        var name = body.Name;
        var id = body.Id;
        this.connection.query('insert into dantest set Name = ?, Id = ?', [name, id], (err, rows) => {
            if (err) {
                console.log('error inserting into table', err.stack);
            }
            cb(err, rows);
        });
    }

    getNames(cb) {
        this.connection.query('select * from dantest', (err, rows) => {
            if (err) {
                console.log(err.stack);
            }
            cb(err, rows);
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