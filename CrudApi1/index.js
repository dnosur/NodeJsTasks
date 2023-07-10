const express = require("express");
const http = require("http");
const url = require("url");

const bodyParser = require("body-parser");

const app = express();

const PORT = 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const userRouter = require("./routers/users");

app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Content-Type", "application/json");
    next();
})

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader("Content-Type", "application/json");

    if(req.url.startsWith("/users")) userRouter(req, res);
})

server.listen(PORT, () => {
    console.log('SERVER host http://localhost:' + PORT + '/');
});


