const express = require('express');
const http = require('http');

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello from Home Page');
});

app.get('/about', (req, res) => {
    return res.send('Hello from About Page'+req.query.name);
});

//const myServer = http.createServer(app);

app.listen(3000, () => {
    console.log("Server Started!");
});
