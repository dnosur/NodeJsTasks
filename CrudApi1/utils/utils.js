const joi = require("joi");

const validate = (scheme, obj) => {
    return !scheme.validate(obj).error;
};

const sendAnswer = (promise, res, message = null) => {
    return promise.then(data => {
        if (message) res.end(JSON.stringify(message));
        else res.end(JSON.stringify(data));
    })
        .catch(err => {
            res.end(JSON.stringify(err));
        })
};

module.exports = { joi, validate, sendAnswer };