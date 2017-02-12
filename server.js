// server.js
const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});
// Start the app by listening on the default
// Heroku port
const port = process.env.PORT || '4500';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));