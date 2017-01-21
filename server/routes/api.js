const express = require('express');
const router = express.Router();
const DB = require('../database');

let db = new DB();

/* GET api listing. */
router.get('/', (req, res) => {
    db.getNames((err, results) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(results);
            res.send(results);
        }
    })

});

router.post('/new', (req, res) => {
    db.addRow((err, results) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(results);
            res.send(results);
        }
    })
})

module.exports = router;