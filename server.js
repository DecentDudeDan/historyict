// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const DB = require('./server/database');
const db = new DB();
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


db.connect();

setInterval(function() {
    db.stayAlive((err, results) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log('staying alive');
        }
    });
}, 10000);


/* GET api listing. */
app.get('/markers', (req, res) => {
    db.getMarkers((err, results) => {
        if (results) {
            res.send(results);
        } else {
            res.json(404, { status: err });
        }
    })

});

app.post('/markers', (req, res) => {
    db.addMarker(req.body, (err, results) => {
        if (results) {
            res.send(results);
        } else {
            res.json(404, { status: err });
        }
    })
})

app.put('/markers', (req, res) => {
    db.updateMarker(req.body, (err, results) => {
        if (results) {
            res.send(results);
        } else {
            res.json(404, { status: err });
        }
    })
})

app.delete('/markers', (req, res) => {
    db.deleteMarker(req.body, (err, results) => {
        if (results) {
            res.send(results);
        } else {
            res.json(404, { status: err });
        }
    })
})

app.get('*', (req, res) => {
    res.send('No path');
});


const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));