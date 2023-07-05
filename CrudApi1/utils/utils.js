const joi = require("joi");

const validate = (scheme, obj) => {
    return !scheme.validate(obj).error;
};

const sendAnswer = (promise, res, next, message = null) => {
    return promise.then(data => {
        if (message) res.end(JSON.stringify(message));
        else res.end(JSON.stringify(data));

        next();
    })
        .catch(err => {
            res.end(JSON.stringify(err));
            next();
        })
};

module.exports = { joi, validate, sendAnswer };