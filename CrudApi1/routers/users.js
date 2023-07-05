const { Create, Read, Update, Delete, GetIndex } = require("../db/db");
const { joi, validate, sendAnswer } = require("../utils/utils");
const router = require("express").Router();

router.get("/", (req, res, next) => {
    const promise = Read();
    sendAnswer(promise, res, next);
});

router.post("/", (req, res, next) => {
    const scheme = joi.object({
        name: joi.string().required(),
        age: joi.number().required()
    })

    if(!validate(scheme, req.body)){
        res.writeHead(400);
        return res.end(JSON.stringify({
            error: "[POST ERROR]: Not acceptable object scheme", "message": "Fields [ name*, age* ] are required"
        }));
    }

    req.body.id = GetIndex();
    const promise = Create(req.body);
    
    sendAnswer(promise, res, next, {message: "User created completly!"});
});

router.put("/:id", (req, res, next) => {
    const scheme = joi.object({
        name: joi.string().optional(),
        age: joi.number().optional()
    })

    if(!validate(scheme, req.body)){
        res.writeHead(400);
        return res.end(JSON.stringify({
            error: "[PUT ERROR]: Not acceptable object scheme", "message": "Fields [ name, age ] are required"
        }));
    }

    const promise = Update(+req.params.id, req.body);
    sendAnswer(promise, res, next, {message: "User has been update completly!"});
})

router.delete("/:id", (req, res, next) => {
    const promise = Delete(+req.params.id);
    sendAnswer(promise, res, next, {message: "User has been deleted completly!"});
})

module.exports = router;