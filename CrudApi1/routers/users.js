const { createData, readData, updateData, deleteData, GetIndex } = require("../db/db");
const { joi, validate, sendAnswer } = require("../utils/utils");

const GET = (res) => {
    const promise = readData();
    sendAnswer(promise, res);
};

const POST = (data, res) => {
    const scheme = joi.object({
        name: joi.string().required(),
        age: joi.number().required()
    })

    if(!validate(scheme, data)){
        res.writeHead(400);
        return res.end(JSON.stringify({
            error: "[POST ERROR]: Not acceptable object scheme", "message": "Fields [ name*, age* ] are required"
        }));
    }

    data.id = GetIndex() + 1;
    const promise = createData(data);
    
    sendAnswer(promise, res, {message: "User created completly!"});
};

const PUT = (id, data, res) => {
    const scheme = joi.object({
        name: joi.string().optional(),
        age: joi.number().optional()
    })

    if(!validate(scheme, data)){
        res.writeHead(400);
        return res.end(JSON.stringify({
            error: "[PUT ERROR]: Not acceptable object scheme", "message": "Fields [ name, age ] are required"
        }));
    }

    const promise = updateData(+id, data);
    sendAnswer(promise, res, {message: "User has been update completly!"});
};

const DELETE = (id, res) => {
    const promise = deleteData(+id);
    sendAnswer(promise, res, {message: "User has been deleted completly!"});
};

const router = (req, res) => {
    let postData = '';

    req.on('data', data => {
        postData += data;
    })

    req.on('end', ()=> {
        postData = (postData.length > 0) ? JSON.parse(postData) : {};
        console.log(postData);

        if(req.method === "POST"){
            if(req.url === "/users") POST(postData, res);
        }

        if(req.method === "PUT"){
            if(req.url.startsWith("/users/")) {
                PUT(req.url.split("/")[2], postData, res);
            }
        }
    })

    if(req.method === "GET"){
        if(req.url === "/users") GET(res);
    }

    if(req.method === "DELETE"){
        if(req.url.startsWith("/users/")) {
            const id = req.url.split("/")[2];
            DELETE(id, res);
        }
    }
}

module.exports = router;