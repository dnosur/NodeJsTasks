
const http = require("http");
const url = require("url");

const bodyParser = require("body-parser");

const PORT = 8000;

const userRouter = require("./routers/users");

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader("Content-Type", "application/json");

    bodyParser.urlencoded({extended: false})
    bodyParser.json()

    if(req.url.startsWith("/users")) userRouter(req, res);
})

server.listen(PORT, () => {
    console.log('SERVER host http://localhost:' + PORT + '/');
});


