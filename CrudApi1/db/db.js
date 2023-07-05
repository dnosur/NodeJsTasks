const fs = require("fs");

const PATH = "db/users.json";

let data = fs.readFileSync(PATH, { encoding: "utf-8", flag: fs.constants.O_CREAT });

if (data.length > 0) data = JSON.parse(data);
else data = [];

const Create = (obj) => {
    return new Promise((resolve, reject) => {
        data.push(obj);
        fs.writeFile(PATH, JSON.stringify(data), (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    })
}

const Read = () => {
    return new Promise((resolve, reject) => {
        (data.length > 0) ? resolve(data) : reject([]);
    })
}

const Update = (id, obj) => {
    return new Promise((resolve, reject) => {
        if (id >= 0 && id < data.length) {
            obj.id = id;
            data[id] = obj;

            fs.writeFile(PATH, JSON.stringify(data), (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        }
        else reject("Index is incorrect!");
    })
}

const Delete = (id) => {
    return new Promise((resolve, reject) => {
        if (id >= 0 && id < data.length) {
            data.splice(id);
            fs.writeFile(PATH, JSON.stringify(data), (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        }
        else reject("Index is incorrect!");
    })
}

const GetIndex = () => {
    return data.length;
}

module.exports = { Create, Read, Update, Delete, GetIndex }