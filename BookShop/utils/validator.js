const joi = require("joi");

const scheme = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    author: joi.string().required(),
    year: joi.number().required(),
    price: joi.number().required()
})

const validateBook = (obj) => {
    if(scheme.validate(obj).error){
        return false;
    }

    return true;
}

module.exports = { validateBook }